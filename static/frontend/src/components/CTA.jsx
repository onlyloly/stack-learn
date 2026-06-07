function CTA({ openChat }) {
const scrollToCatalog = () => {
const catalog = document.getElementById('catalog')


if (catalog) {
  catalog.scrollIntoView({
    behavior: 'smooth'
  })
}


}

return ( <section className="py-20 px-8 bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-center rounded-t-[15px]"> <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
Готовы начать обучение? </h2>


  <p className="text-lg opacity-90 mb-8 max-w-lg mx-auto">
    Тысячи студентов уже нашли свой идеальный курс.
    Присоединяйтесь!
  </p>

  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button
      onClick={scrollToCatalog}
      className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition shadow-lg"
    >
      Найти курс
    </button>

    <button
      onClick={openChat}
      className="bg-black/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-2xl font-bold hover:bg-black/30 transition"
    >
      Спросить ИИ
    </button>
  </div>
</section>


)
}

export default CTA
