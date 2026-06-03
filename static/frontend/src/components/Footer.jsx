function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-8 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        <div>
          <div className="text-white text-xl font-bold mb-4">
            StackLearn
          </div>

          <p className="text-sm">
            Умный маркетплейс IT-курсов.
            Находите, сравнивайте и выбирайте лучшее обучение.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">
            Платформа
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Каталог курсов
              </a>
            </li>

          <button
  type="button"
  onClick={openChat}
  className="px-4 py-2 rounded-xl hover:bg-gray-100 hover:text-purple-600 transition"
>
  ИИ-ассистент
</button>

            <li>
              <a href="#" className="hover:text-white">
                О платформе
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">
            Категории
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Frontend
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Backend
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                DevOps
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">
            Информация
          </h4>

          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Для провайдеров
              </a>
            </li>

            <li>
              <a href="#" className="hover:text-white">
                Политика конфиденциальности
              </a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  )
}

export default Footer