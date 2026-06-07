import TechMarquee from './TechMarquee'
import { motion } from 'framer-motion'
function Hero({ openChat }) {
  return (
    <header className="py-20 px-8 md:px-20 flex flex-col lg:flex-row justify-between items-center gap-16 bg-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.2)] pb-12 transition-all duration-300">

      <div className="max-w-xl">
        <h1 className="text-6xl font-extrabold mb-6">
          Стань востребованным{" "}
          <span className="text-purple-600">
            IT-специалистом
          </span>
        </h1>

        <p className="text-lg text-gray-500 mb-8">
          <button className="text-black px-3 py-2 rounded-xl font-bold hover:bg-purple-100 transition">
            StackLearn
          </button>
          — умный каталог курсов программирования. Больше не нужно
          перебирать сотни сайтов. Ваш персональный навигатор в мире
          IT-образования.
        </p>

        <div className="flex gap-4">
      <button
  type="button"
  onClick={() => {
    const catalog = document.getElementById('catalog')

    if (catalog) {
      catalog.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }}
  className="btn-primary bg-purple-500 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-400 transition"
>
  Найти курс →
</button>

   <button
  onClick={openChat}
  className="btn-secondary bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-400 transition"
>
  Спросить ИИ
</button>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <TechMarquee />
      </div>

    </header>
  )
}

export default Hero