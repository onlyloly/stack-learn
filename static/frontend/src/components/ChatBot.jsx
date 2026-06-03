import { useState } from 'react'

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Привет! Я ИИ-ассистент StackLearn. Помогу выбрать курс 😊'
    }
  ])

  const [input, setInput] = useState('')

  function getBotAnswer(text) {
    const question = text.toLowerCase()

    if (question.includes('frontend') || question.includes('react')) {
      return 'Для frontend рекомендую курс "React с нуля до PRO". Он подойдёт для старта в современной веб-разработке.'
    }

    if (question.includes('backend') || question.includes('node')) {
      return 'Для backend подойдёт курс "Node.js Backend". Там изучается REST API и работа с Express.'
    }

    if (question.includes('python') || question.includes('data')) {
      return 'Если интересны данные и аналитика, советую "Python для аналитики" или "Machine Learning".'
    }

    if (question.includes('дешев') || question.includes('цена')) {
      return 'Самые доступные курсы можно найти через сортировку "Сначала дешёвые" в каталоге.'
    }

    return 'Я могу помочь выбрать курс по направлению: Frontend, Backend, Data Science, DevOps, Mobile или Кибербез.'
  }

  function sendMessage() {
    if (input.trim() === '') return

    const userMessage = {
      role: 'user',
      text: input
    }

    const botMessage = {
      role: 'bot',
      text: getBotAnswer(input)
    }

    setMessages([...messages, userMessage, botMessage])
    setInput('')
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
          className="bg-purple-600 text-white px-5 rounded-2xl font-bold hover:bg-purple-700"
        >
          →
        </button>
      </div>
    </div>
  )
}

export default ChatBot