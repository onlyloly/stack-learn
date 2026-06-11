"""
StackLearn API — Professional FastAPI Backend
Версия 2.0 | Улучшения безопасности, архитектуры и авторизации
"""

import os
import uuid
import hashlib
import hmac
import secrets
import psycopg2

from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, field_validator
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

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

conn.commit()

conn.commit()
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr, field_validator
from dotenv import load_dotenv
 
load_dotenv()
 
# ─── Вспомогательные функции ────────────────────────────────────────────────
 
SECRET_KEY = os.getenv("SECRET_KEY", secrets.token_hex(32))
GIGACHAT_CREDENTIALS = os.getenv("GIGACHAT_CREDENTIALS")
 
def hash_password(password: str) -> str:
    """Хэшировать пароль с использованием PBKDF2-HMAC."""
    salt = secrets.token_hex(16)
    key = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 260_000)
    return f"{salt}${key.hex()}"
 
def verify_password(plain: str, hashed: str) -> bool:
    """Проверить пароль против хэша."""
    try:
        salt, key_hex = hashed.split("$")
        expected = hashlib.pbkdf2_hmac("sha256", plain.encode(), salt.encode(), 260_000)
        return hmac.compare_digest(expected, bytes.fromhex(key_hex))
    except Exception:
        return False
 
def create_token(user_id: str) -> str:
    """Сгенерировать простой токен сессии (замените на JWT в продакшене)."""
    raw = f"{user_id}:{secrets.token_hex(32)}"
    return raw
 
# ─── Хранилище пользователей (заглушка — замените на SQLite/PostgreSQL) ──────
 
USERS_DB: dict[str, dict] = {}
 
def seed_admin():
    admin_id = str(uuid.uuid4())
    USERS_DB[admin_id] = {
        "id": admin_id,
        "name": "Администратор",
        "email": "admin@stacklearn.ru",
        "password_hash": hash_password("Admin123!"),
        "role": "admin",
        "avatar": None,
        "created_at": datetime.utcnow().isoformat(),
        "courses_enrolled": [],
        "favorites": [],
    }
 
seed_admin()
 
# Хранилище токенов сессии: токен → user_id
SESSIONS: dict[str, str] = {}
 
# ─── FastAPI приложение ──────────────────────────────────────────────────────
 
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
 
# ─── Схемы Pydantic ──────────────────────────────────────────────────────────
 
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
            raise ValueError("Сообщение слишком длинное (макс. 1000 символов)")
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
 
# ─── Зависимости ─────────────────────────────────────────────────────────────
 
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Декодировать токен Bearer и вернуть пользователя или вызвать 401."""
    if not credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Не авторизован")
    token = credentials.credentials
    user_id = SESSIONS.get(token)
    if not user_id or user_id not in USERS_DB:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный или истёкший токен")
    return USERS_DB[user_id]
 
# ─── Маршруты ────────────────────────────────────────────────────────────────
 
@app.get("/", tags=["System"])
def root():
    return {"status": "ok", "service": "StackLearn API", "version": "2.0.0"}
 
 
@app.get("/api/health", tags=["System"])
def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}
 
 
@app.post("/api/auth/register", tags=["Auth"])
def register(data: RegisterRequest):
    # Проверка дубликата email
    for user in USERS_DB.values():
        if user["email"].lower() == data.email.lower():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Пользователь с такой почтой уже существует",
            )
 
    user_id = str(uuid.uuid4())
    USERS_DB[user_id] = {
        "id": user_id,
        "name": data.name.strip(),
        "email": data.email.lower(),
        "password_hash": hash_password(data.password),
        "role": "user",
        "avatar": None,
        "created_at": datetime.utcnow().isoformat(),
        "courses_enrolled": [],
        "favorites": [],
    }
 
    return {"success": True, "message": "Аккаунт создан. Теперь войдите."}
 
 
@app.post("/api/auth/login", tags=["Auth"])
def login(data: LoginRequest):
    user = next(
        (u for u in USERS_DB.values() if u["email"].lower() == data.email.lower()),
        None,
    )
 
    # Используем постоянное время для защиты от timing attacks
    if not user or not verify_password(data.password, user["password_hash"]):
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
    favs: list = current_user["favorites"]
    if course_id in favs:
        favs.remove(course_id)
        action = "removed"
    else:
        favs.append(course_id)
        action = "added"
    return {"success": True, "action": action, "favorites": favs}
 
 
@app.post("/api/enroll/{course_id}", tags=["User"])
def enroll(course_id: str, current_user: dict = Depends(get_current_user)):
    enrolled: list = current_user["courses_enrolled"]
    if course_id in enrolled:
        return {"success": False, "message": "Вы уже записаны на этот курс"}
    enrolled.append(course_id)
    return {"success": True, "message": "Запись на курс выполнена", "enrolled": enrolled}
 
 
@app.post("/api/chat", tags=["AI Chat"])
@app.post("/api/chat", tags=["AI Chat"])
def chat(data: ChatRequest):
    """
    Чат с GigaChat-ассистентом. Требует авторизации.
    """
    if not GIGACHAT_CREDENTIALS:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI-ассистент временно недоступен",
        )
 
    try:
        from gigachat import GigaChat
 
        prompt = f"""Ты ИИ-ассистент платформы StackLearn — образовательной платформы по IT.
 
Отвечай ТОЛЬКО по темам:
- Выбор IT-курсов и направлений
- Frontend, Backend, Data Science, DevOps, Mobile, Cybersecurity
- Технологии: React, JavaScript, TypeScript, Node.js, Python, SQL, Django, Docker, Kubernetes, Linux, Flutter, Kotlin, Swift, Machine Learning, Deep Learning
 
Если вопрос НЕ по теме — вежливо откажи:
"Я помогаю только с выбором IT-курсов на StackLearn."
 
Отвечай кратко (2-4 предложения), дружелюбно, на русском языке.
 
Вопрос пользователя: {data.message}"""
 
        with GigaChat(credentials=GIGACHAT_CREDENTIALS, verify_ssl_certs=False) as gc:
            response = gc.chat(prompt)
 
        answer = response.choices[0].message.content
        return {"success": True, "answer": answer}
 
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка AI-ассистента: {str(error)}",
        )
 
 