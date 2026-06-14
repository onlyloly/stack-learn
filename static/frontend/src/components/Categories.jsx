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
          <div className="w-10 h-10 bg-blue-600 rounded-2xl mb-4 shadow-[0_0_25px_rgba(37,99,235,0.5)]"></div>
          <h3 className="font-bold text-gray-900">Frontend</h3>
          <p className="text-gray-400 text-sm">3 курса</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-10 h-10 bg-green-600 rounded-2xl mb-4 shadow-[0_0_25px_rgba(22,163,74,0.5)]"></div>
          <h3 className="font-bold text-gray-900">Backend</h3>
          <p className="text-gray-400 text-sm">3 курса</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-10 h-10 bg-orange-500 rounded-2xl mb-4 shadow-[0_0_25px_rgba(249,115,22,0.5)]"></div>
          <h3 className="font-bold text-gray-900">DevOps</h3>
          <p className="text-gray-400 text-sm">3 курса</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-10 h-10 bg-purple-600 rounded-2xl mb-4 shadow-[0_0_25px_rgba(147,51,234,0.5)]"></div>
          <h3 className="font-bold text-gray-900">Data Science</h3>
          <p className="text-gray-400 text-sm">3 курса</p>
        </div>

          <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
          <div className="w-10 h-10 bg-pink-500 rounded-2xl mb-4 shadow-[0_0_25px_rgba(236,72,153,0.5)]"></div>
          <h3 className="font-bold text-gray-900">Mobile</h3>
          <p className="text-gray-400 text-sm">3 курса</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition"
        >
         <div className="w-10 h-10 bg-slate-800 rounded-2xl mb-4 shadow-[0_0_25px_rgba(30,41,59,0.5)]"></div>
          <h3 className="font-bold text-gray-900">Cybersecurity</h3>
          <p className="text-gray-400 text-sm">3 курса</p>
        </div>
      </div>
    </section>
  )
}
export default Categories