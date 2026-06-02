from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
users = [
    {
        "name": "Админ",
        "email": "stackadminlearn@gmail.com",
        "password": "12345",
        "role": "admin"
    }
]


class RegisterData(BaseModel):
    name: str
    email: str
    password: str


class LoginData(BaseModel):
    email: str
    password: str


@app.get("/")
def root():
    return {"message": "StackLearn API работает"}


@app.post("/api/register")
def register(data: RegisterData):
    for user in users:
        if user["email"] == data.email:
            return {
                "success": False,
                "message": "Пользователь с такой почтой уже существует"
            }

    new_user = {
        "name": data.name,
        "email": data.email,
        "password": data.password,
        "role": "user"
    }

    users.append(new_user)

    return {
        "success": True,
        "message": "Аккаунт создан. Теперь войдите."
    }


@app.post("/api/login")
def login(data: LoginData):
    for user in users:
        if user["email"] == data.email and user["password"] == data.password:
            return {
                "success": True,
                "message": "Вход выполнен успешно",
                "user": {
                    "name": user["name"],
                    "email": user["email"],
                    "role": user["role"]
                }
            }

    return {
        "success": False,
        "message": "Неверная почта или пароль"
    }