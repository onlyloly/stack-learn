"""
StackLearn API — FastAPI Backend
"""
import os
import uuid
import hashlib
import hmac
import secrets
import psycopg2

from datetime import datetime
from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, field_validator
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
GIGACHAT_CREDENTIALS = os.getenv("GIGACHAT_CREDENTIALS")

conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()
def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 260_000)
    return f"{salt}${key.hex()}"
def verify_password(plain: str, hashed: str) -> bool:
    try:
        salt, key_hex = hashed.split("$")
        expected = hashlib.pbkdf2_hmac("sha256", plain.encode(), salt.encode(), 260_000)
        return hmac.compare_digest(expected, bytes.fromhex(key_hex))
    except Exception:
        return False
def create_token(user_id: str) -> str:
    return f"{user_id}:{secrets.token_hex(32)}"
def init_db():
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        avatar TEXT,
        created_at TEXT,
        courses_enrolled TEXT DEFAULT '',
        favorites TEXT DEFAULT ''
    )
    """)

    cursor.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT")
    cursor.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TEXT")
    cursor.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS courses_enrolled TEXT DEFAULT ''")
    cursor.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS favorites TEXT DEFAULT ''")
    conn.commit()
def seed_admin():
    admin_email = "admin111@stacklearn.ru"
    cursor.execute("SELECT id FROM users WHERE email = %s", (admin_email,))
    admin = cursor.fetchone()
    if admin:
        cursor.execute(
            """
            UPDATE users
            SET role = %s, password_hash = %s, name = %s
            WHERE email = %s
            """,
            (
                "admin",
                hash_password("Admin123!"),
                "Администратор",
                admin_email,
            )
        )
    else:
        cursor.execute(
            """
            INSERT INTO users (
                id,
                name,
                email,
                password_hash,
                role,
                avatar,
                created_at,
                courses_enrolled,
                favorites
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                str(uuid.uuid4()),
                "Администратор",
                admin_email,
                hash_password("Admin123!"),
                "admin",
                None,
                datetime.utcnow().isoformat(),
                "",
                ""
            )
        )

    conn.commit()
init_db()
seed_admin()

SESSIONS: dict[str, str] = {}

app = FastAPI(
    title="StackLearn API",
    description="Бэкенд для образовательной платформы StackLearn",
    version="2.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://stack-learn-beige.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
security = HTTPBearer(auto_error=False)
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Имя слишком короткое")
        return v

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Пароль должен быть не менее 8 символов")
        return v
class LoginRequest(BaseModel):
    email: EmailStr
    password: str
class ChatRequest(BaseModel):
    message: str

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Сообщение не может быть пустым")
        if len(v) > 1000:
            raise ValueError("Сообщение слишком длинное")
        return v
class UserPublic(BaseModel):
    id: str
    name: str
    email: str
    role: str
    avatar: Optional[str]
    created_at: str
    courses_enrolled: list[str]
    favorites: list[str]
def get_user_by_id(user_id: str):
    cursor.execute(
        """
        SELECT id, name, email, password_hash, role, avatar, created_at, courses_enrolled, favorites
        FROM users
        WHERE id = %s
        """,
        (user_id,)
    )

    row = cursor.fetchone()

    if not row:
        return None

    return {
        "id": row[0],
        "name": row[1],
        "email": row[2],
        "password_hash": row[3],
        "role": row[4],
        "avatar": row[5],
        "created_at": row[6],
        "courses_enrolled": row[7].split(",") if row[7] else [],
        "favorites": row[8].split(",") if row[8] else [],
    }

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Не авторизован")

    token = credentials.credentials
    user_id = SESSIONS.get(token)

    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный токен")

    user = get_user_by_id(user_id)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Пользователь не найден")

    return user

@app.get("/", tags=["System"])
def root():
    return {"status": "ok", "service": "StackLearn API", "version": "2.0.0"}


@app.get("/api/health", tags=["System"])
def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.post("/api/auth/register", tags=["Auth"])
def register(data: RegisterRequest):
    email = data.email.lower()

    cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Пользователь с такой почтой уже существует",
        )

    user_id = str(uuid.uuid4())
    created_at = datetime.utcnow().isoformat()
    cursor.execute(
        """
        INSERT INTO users (
            id,
            name,
            email,
            password_hash,
            role,
            avatar,
            created_at,
            courses_enrolled,
            favorites
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            user_id,
            data.name.strip(),
            email,
            hash_password(data.password),
            "user",
            None,
            created_at,
            "",
            ""
        )
    )

    conn.commit()
    return {"success": True, "message": "Аккаунт создан. Теперь войдите."}

@app.post("/api/auth/login", tags=["Auth"])
def login(data: LoginRequest):
    email = data.email.lower()
    cursor.execute(
        """
        SELECT id, name, email, password_hash, role, avatar, created_at, courses_enrolled, favorites
        FROM users
        WHERE email = %s
        """,
        (email,)
    )

    row = cursor.fetchone()

    if not row:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверная почта или пароль",
        )

    user = {
        "id": row[0],
        "name": row[1],
        "email": row[2],
        "password_hash": row[3],
        "role": row[4],
"avatar": row[5],
        "created_at": row[6],
        "courses_enrolled": row[7].split(",") if row[7] else [],
        "favorites": row[8].split(",") if row[8] else [],
    }

    if not verify_password(data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверная почта или пароль",
        )

    token = create_token(user["id"])
    SESSIONS[token] = user["id"]

    return {
        "success": True,
        "token": token,
        "user": UserPublic(**{k: user[k] for k in UserPublic.model_fields}),
    }

@app.post("/api/auth/logout", tags=["Auth"])
def logout(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if credentials:
        SESSIONS.pop(credentials.credentials, None)

    return {"success": True, "message": "Выход выполнен"}

@app.get("/api/me", tags=["User"])
def get_profile(current_user: dict = Depends(get_current_user)):
    return UserPublic(**{k: current_user[k] for k in UserPublic.model_fields})

@app.post("/api/favorites/{course_id}", tags=["User"])
def toggle_favorite(course_id: str, current_user: dict = Depends(get_current_user)):
    favorites = current_user["favorites"]

    if course_id in favorites:
        favorites.remove(course_id)
        action = "removed"
    else:
        favorites.append(course_id)
        action = "added"

    cursor.execute(
        "UPDATE users SET favorites = %s WHERE id = %s",
        (",".join(favorites), current_user["id"])
    )

    conn.commit()
    return {"success": True, "action": action, "favorites": favorites}

@app.post("/api/enroll/{course_id}", tags=["User"])
def enroll(course_id: str, current_user: dict = Depends(get_current_user)):
    enrolled = current_user["courses_enrolled"]

    if course_id in enrolled:
        return {"success": False, "message": "Вы уже записаны на этот курс"}

    enrolled.append(course_id)

    cursor.execute(
        "UPDATE users SET courses_enrolled = %s WHERE id = %s",
        (",".join(enrolled), current_user["id"])
    )

    conn.commit()

    return {"success": True, "message": "Запись на курс выполнена", "enrolled": enrolled}

@app.post("/api/chat", tags=["AI Chat"])
def chat(data: ChatRequest):
    if not GIGACHAT_CREDENTIALS:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI ассистент временно недоступен",
        )

    try:
        from gigachat import GigaChat

        prompt = f"""Ты ИИ ассистент платформы StackLearn.

Отвечай только по темам:
выбор IT курсов, Frontend, Backend, Data Science, DevOps, Mobile, Cybersecurity, React, JavaScript, Python, SQL, Docker, Kubernetes, Linux, Flutter, Machine Learning.

Если вопрос не по теме, ответь:
"Я помогаю только с выбором IT курсов на StackLearn."

Отвечай кратко, дружелюбно и на русском языке.

Вопрос пользователя: {data.message}"""

        with GigaChat(credentials=GIGACHAT_CREDENTIALS, verify_ssl_certs=False) as gc:
            response = gc.chat(prompt)

        answer = response.choices[0].message.content

        return {"success": True, "answer": answer}

    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка AI ассистента: {str(error)}",
        )
@app.get("/api/debug/users")
def debug_users():
    cursor.execute("""
        SELECT id, name, email, role, created_at
        FROM users
        ORDER BY created_at DESC
    """)
    rows = cursor.fetchall()

    return [
        {
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "role": row[3],
            "created_at": row[4],
        }
        for row in rows
    ]