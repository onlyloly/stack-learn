import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from gigachat import GigaChat

load_dotenv()
load_dotenv()

gigachat = GigaChat(
    credentials=os.getenv("GIGACHAT_CREDENTIALS"),
    verify_ssl_certs=False
)


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
        "email": "ya@gmail.com",
        "password": "123",
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


class ChatData(BaseModel):
    message: str


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


@app.post("/api/chat")
def chat(data: ChatData):
    try:
        prompt = f"""
Ты ИИ-ассистент платформы StackLearn.

Отвечай только по теме выбора IT-курсов:
Frontend, Backend, Data Science, DevOps, Mobile, Кибербез,
React, JavaScript, Node.js, Python, SQL, Django, Docker, Kubernetes,
Linux, Flutter, Kotlin, Machine Learning, Deep Learning, Cybersecurity.

Если вопрос не по теме, ответь:
"Я могу помочь только с выбором IT-курсов на StackLearn."

Отвечай кратко, дружелюбно, на русском языке.

Вопрос пользователя:
{data.message}
"""

        response = gigachat.chat(prompt)

        return {
            "success": True,
            "answer": response.choices[0].message.content
        }

    except Exception as error:
        print("GIGACHAT ERROR:", error)

        return {
            "success": False,
            "answer": f"Ошибка GigaChat: {error}"
        }