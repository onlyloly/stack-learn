import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
        response = client.responses.create(
            model="gpt-5.5",
            instructions="""
Ты ИИ-ассистент платформы StackLearn.
Отвечай только по теме IT-курсов, выбора направления и обучения.
Если вопрос не по теме, скажи: "Я могу помочь только с выбором IT-курсов на StackLearn."
Отвечай кратко, дружелюбно, на русском языке.
            """,
            input=data.message
        )

        return {
            "success": True,
            "answer": response.output_text
        }

    except Exception as error:
        print("OPENAI ERROR:", error)

        return {
            "success": False,
            "answer": f"Ошибка OpenAI: {error}"
        }