function Stats() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-4xl font-extrabold text-purple-600 mb-2">
            20+
          </div>
          <div className="text-gray-500">
            Курсов в каталоге
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-4xl font-extrabold text-purple-600 mb-2">
            25+
          </div>
          <div className="text-gray-500">
            Партнеров
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-4xl font-extrabold text-purple-600 mb-2">
            15 000+
          </div>
          <div className="text-gray-500">
            Студентов
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
          <div className="text-4xl font-extrabold text-purple-600 mb-2">
            4.9
          </div>
          <div className="text-gray-500">
            Средний рейтинг
          </div>
        </div>

      </div>
    </section>
  )
}

export default Stats