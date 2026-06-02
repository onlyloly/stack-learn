function Hero() {
  return (
    <header className="py-20 px-8 md:px-20 flex justify-between items-center bg-purple-100 shadow-[0_20px_50px_rgba(168,85,247,0.2)] pb-12 transition-all duration-300">

      <div className="max-w-xl">
        <h1 className="text-6xl font-extrabold mb-6">
          Найди свой{" "}
          <span className="text-purple-600">
            идеальный IT-курс
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
          <button className="bg-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800">
            Найти курс →
          </button>

          <button className="bg-gray-100 text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-400">
            Спросить ИИ
          </button>
        </div>
      </div>

      
      

    </header>
  )
}

export default Hero