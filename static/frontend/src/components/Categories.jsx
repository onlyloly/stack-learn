function Categories() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">
          Категории курсов
        </h2>

        <p className="text-gray-500 mt-2">
          Выберите направление и начните обучение уже сегодня
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div
          data-aos="fade-up"
          data-aos-delay="0"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-2xl mb-4"></div>
          <h3 className="font-bold text-gray-900">Frontend</h3>
          <p className="text-gray-400 text-sm">12 курсов</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-green-50 rounded-2xl mb-4"></div>
          <h3 className="font-bold text-gray-900">Backend</h3>
          <p className="text-gray-400 text-sm">10 курсов</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-orange-50 rounded-2xl mb-4"></div>
          <h3 className="font-bold text-gray-900">DevOps</h3>
          <p className="text-gray-400 text-sm">7 курсов</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-2xl mb-4"></div>
          <h3 className="font-bold text-gray-900">Data Science</h3>
          <p className="text-gray-400 text-sm">9 курсов</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-red-50 rounded-2xl mb-4"></div>
          <h3 className="font-bold text-gray-900">Mobile</h3>
          <p className="text-gray-400 text-sm">6 курсов</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-2xl mb-4"></div>
          <h3 className="font-bold text-gray-900">Кибербез</h3>
          <p className="text-gray-400 text-sm">6 курсов</p>
        </div>
      </div>
    </section>
  )
}

export default Categories