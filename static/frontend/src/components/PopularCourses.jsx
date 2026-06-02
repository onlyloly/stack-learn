function PopularCourses() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-8">

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">
          Популярные курсы
        </h2>

        <button className="cursor-pointer text-xl hover:text-purple-600 transition">
          Все курсы →
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

        <div className="bg-blue-600 text-white p-8 rounded-[40px] min-h-[380px] flex flex-col hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

          <div>
            <h3 className="text-4xl font-extrabold">
              Frontend
            </h3>

            <p className="text-xl font-bold mt-2">
              React: с нуля до PRO
            </p>

            <p className="text-sm text-white/70 mt-4">
              Изучи современные технологии HTML, CSS и React для создания быстрых и красивых интерфейсов.
            </p>
          </div>

          <div className="mt-auto flex justify-between items-end">
            <div>
              ★ 4.9
            </div>

            <div className="bg-white/10 px-6 py-3 rounded-2xl font-black text-xl">
              9 900 ₽
            </div>
          </div>

        </div>

        <div className="bg-purple-600 text-white p-8 rounded-[40px] min-h-[380px] flex flex-col hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

          <div>
            <h3 className="text-4xl font-extrabold">
              Data Science
            </h3>

            <p className="text-xl font-bold mt-2">
              Python для аналитики
            </p>

            <p className="text-sm text-white/70 mt-4">
              Научись анализировать данные и строить прогнозные модели.
            </p>
          </div>

          <div className="mt-auto flex justify-between items-end">
            <div>
              ★ 4.8
            </div>

            <div className="bg-white/10 px-6 py-3 rounded-2xl font-black text-xl">
              12 500 ₽
            </div>
          </div>

        </div>

        <div className="bg-orange-500 text-white p-8 rounded-[40px] min-h-[380px] flex flex-col hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

          <div>
            <h3 className="text-4xl font-extrabold">
              DevOps
            </h3>

            <p className="text-xl font-bold mt-2">
              Docker & Kubernetes
            </p>

            <p className="text-sm text-white/70 mt-4">
              Освой Docker, Kubernetes и современные DevOps-практики.
            </p>
          </div>

          <div className="mt-auto flex justify-between items-end">
            <div>
              ★ 4.9
            </div>
            

            <div className="bg-white/10 px-6 py-3 rounded-2xl font-black text-xl">
              18 900 ₽
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}

export default PopularCourses