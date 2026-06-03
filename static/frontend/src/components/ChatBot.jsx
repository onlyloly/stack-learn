import { useState } from 'react'

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Привет! Я ИИ-ассистент StackLearn. Помогу выбрать курс 😊'
    }
  ])

  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function sendMessage() {
    if (input.trim() === '') return

    const userMessage = {
      role: 'user',
      text: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input
        })
      })

      const data = await response.json()

      const botMessage = {
        role: 'bot',
        text: data.answer
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: 'Ошибка подключения к серверу. Проверь, запущен ли backend.'
        }
      ])
    }

    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[380px] max-w-[90vw] bg-white rounded-[30px] shadow-2xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 flex justify-between items-center">
        <div>
          <h3 className="font-black text-xl">ИИ-ассистент</h3>
          <p className="text-white/80 text-sm">Помощник по выбору курса</p>
        </div>

        <button
          onClick={onClose}
          className="text-2xl font-bold text-white/80 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="h-[320px] overflow-y-auto p-5 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[85%] p-4 rounded-2xl text-sm ${
              message.role === 'user'
                ? 'ml-auto bg-purple-600 text-white'
                : 'bg-white text-gray-700 shadow-sm'
            }`}
          >
            {message.text}
          </div>
        ))}

        {isLoading && (
          <div className="bg-white text-gray-500 shadow-sm max-w-[85%] p-4 rounded-2xl text-sm">
            ИИ думает...
          </div>
        )}
      </div>

      <div className="p-4 bg-white flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage()
            }
          }}
          placeholder="Напишите вопрос..."
          className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="bg-purple-600 text-white px-5 rounded-2xl font-bold hover:bg-purple-700 disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  )
}

export default ChatBot