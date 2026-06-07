function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-2xl rounded-[30px] shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-purple-600 text-3xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-black text-gray-900 mb-4">
          О платформе StackLearn
        </h2>

        <p className="text-gray-600 leading-relaxed mb-5">
          <span className="font-bold text-purple-600">StackLearn</span> — это учебная образовательная платформа для поиска и подбора IT-курсов по разным направлениям: Frontend, Backend, Data Science, DevOps, Mobile Development, Cybersecurity.
        </p>

        <div className="bg-purple-50 rounded-2xl p-5 mb-5">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Создатель проекта
          </h3>
          <p className="text-gray-600">
            Проект разработала <span className="font-bold text-purple-600">Дарья Баланина</span> в 2026 году как учебное веб-приложение для демонстрации навыков разработки интерфейса, работы с каталогом курсов, авторизацией и чат-ботом.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-sm text-gray-400">Год</p>
            <p className="font-bold text-gray-900">2026</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-sm text-gray-400">Статус</p>
            <p className="font-bold text-gray-900">Учебный проект</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-sm text-gray-400">Тема</p>
            <p className="font-bold text-gray-900">IT-образование</p>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed">
          Цель проекта — создать удобный сервис, который помогает пользователям быстрее находить подходящее обучение, сравнивать направления и выбирать курс для развития в IT.
        <div className="mt-6">
  <h3 className="text-xl font-bold text-gray-900 mb-3">
    Используемые технологии
  </h3>

  <div className="flex flex-wrap gap-2">
    {[
      'React',
      'TypeScript',
      'JavaScript',
      'Python',
      'FastAPI',
      'HTML5',
      'CSS3',
      'REST API',
      'Framer Motion',
      'GigaChat AI'
    ].map((tech) => (
      <span
        key={tech}
        className="
          px-4 py-2
          rounded-xl
          bg-purple-100
          text-purple-700
          font-semibold
          text-sm
          transition-all
          duration-200
          cursor-default
          hover:bg-purple-600
          hover:text-white
          hover:shadow-lg
          hover:shadow-purple-300
        "
      >
        {tech}
      </span>
    ))}
  </div>
</div>
        </p>
      </div>
    </div>
  )
}

export default AboutModal