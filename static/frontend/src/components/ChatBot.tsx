import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'bot'
  text: string
  ts: Date
}

interface ChatBotProps {
  isOpen?: boolean
  onClose?: () => void
}

const SUGGESTIONS = [
  'Какой курс выбрать новичку?',
  'Что изучать для Frontend?',
  'Хочу изучать Backend',
  'Что выбрать для мобильной разработки?',
]

export default function ChatBot({ isOpen = false, onClose }: ChatBotProps) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'bot',
      text: 'Привет! Я ИИ-ассистент StackLearn. Помогу выбрать подходящий IT-курс 😊',
      ts: new Date(),
    },
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setOpen(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open])

  function closeChat() {
    setOpen(false)

    if (onClose) {
      onClose()
    }
  }

  async function send(text: string = input) {
    const msg = text.trim()

    if (!msg || loading) return

    setInput('')

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: msg,
      ts: new Date(),
    }

    setMessages((currentMessages) => [...currentMessages, userMsg])
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: msg,
        }),
      })

      const data = await response.json()

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: data.answer || 'Я могу помочь с выбором IT-курсов на StackLearn.',
          ts: new Date(),
        },
      ])
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: (Date.now() + 1).toString(),
          role: 'bot',
          text: 'Не получилось подключиться к серверу. Проверь, что backend запущен.',
          ts: new Date(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-2xl
              bg-gradient-to-br from-purple-600 to-indigo-600 text-white
              flex items-center justify-center shadow-2xl shadow-purple-500/40"
            aria-label="Открыть ИИ-ассистента"
          >
            <MessageCircle size={26} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[390px] max-w-[calc(100vw-2rem)]
              h-[560px] max-h-[calc(100vh-6rem)] flex flex-col
              bg-white rounded-[30px] shadow-2xl border border-purple-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center">
                <Bot size={22} />
              </div>

              <div className="flex-1">
                <div className="font-black text-lg leading-tight">
                  ИИ-ассистент
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <span className="w-2 h-2 bg-emerald-300 rounded-full" />
                  Онлайн
                </div>
              </div>

              <button
                type="button"
                onClick={closeChat}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition"
                aria-label="Закрыть чат"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                      msg.role === 'bot'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white'
                    }`}
                  >
                    {msg.role === 'bot' ? <Bot size={16} /> : <User size={15} />}
                  </div>

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'bot'
                        ? 'bg-white text-gray-700 rounded-tl-md border border-gray-100'
                        : 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Bot size={16} />
                  </div>

                  <div className="bg-white text-gray-500 border border-gray-100 shadow-sm rounded-2xl rounded-tl-md px-4 py-3 text-sm flex items-center gap-2">
                    <Loader2 size={15} className="animate-spin" />
                    ИИ думает...
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {messages.length <= 1 && (
              <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="flex-shrink-0 px-3 py-2 rounded-xl bg-purple-50 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition whitespace-nowrap"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      send()
                    }
                  }}
                  placeholder="Задайте вопрос..."
                  disabled={loading}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                />

                <button
                  type="button"
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}