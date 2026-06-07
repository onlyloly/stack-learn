function Footer({ openChat, openAbout }) {
const scrollToCatalog = () => {
const catalog = document.getElementById('catalog')


if (catalog) {
  catalog.scrollIntoView({
    behavior: 'smooth'
  })
}


}

return ( <footer className="bg-gray-900 text-gray-400 py-16 px-8 md:px-20"> <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">


    <div>
      <div className="text-white text-2xl font-bold mb-4">
        StackLearn
      </div>

      <p className="text-sm mb-6 leading-relaxed">
        Умный каталог IT-курсов для поиска и выбора обучения в сфере технологий.
      </p>

      <div className="space-y-2 text-sm">
        <div>📚 18 курсов</div>
        <div>👨‍🎓 160 000+ студентов</div>
        <div>🧭 6 направлений</div>
        <div>🤖 ИИ-ассистент</div>
      </div>
    </div>

    <div>
      <h4 className="text-white font-bold mb-4">
        Платформа
      </h4>

      <ul className="space-y-2 text-sm">
        <li>
         <button
  onClick={() => {
    const catalog = document.getElementById('catalog')

    if (catalog) {
      catalog.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }}
  className="hover:text-white transition text-left"
>
  Каталог курсов
</button>
        </li>
 <li>
      <button
  onClick={openChat}
  className="hover:text-white transition text-left"
>
  ИИ-ассистент
</button>
</li>
<li>
      <button
  onClick={openAbout}
  className="hover:text-white transition text-left"
>
  О платформе
</button>
</li>
      </ul>
    </div>

    <div>
      <h4 className="text-white font-bold mb-4">
        Категории
      </h4>

      <ul className="space-y-2 text-sm">
        <li>Frontend</li>
        <li>Backend</li>
        <li>Data Science</li>
        <li>DevOps</li>
        <li>Mobile</li>
        <li>Cybersecurity</li>
      </ul>
    </div>

    <div>
      <h4 className="text-white font-bold mb-4">
        Технологии
      </h4>

      <ul className="space-y-2 text-sm">
        <li>React</li>
        <li>JavaScript</li>
        <li>FastAPI</li>
        <li>GigaChat</li>
        <li>Tailwind CSS</li>
      </ul>
    </div>

  </div>

  <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
    © 2026 StackLearn. Учебный проект. Создатель: Дарья Баланина
  </div>
</footer>


)
}

export default Footer
