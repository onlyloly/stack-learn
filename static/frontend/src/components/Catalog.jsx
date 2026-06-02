import { useState } from 'react'
import { courses } from '../data/courses'

function Catalog({ favoriteCourses, toggleFavorite, searchQuery, setSearchQuery }) {
  const [category, setCategory] = useState('all')
  const [level, setLevel] = useState('all')
  const [sort, setSort] = useState('default')

  const colors = {
    Frontend: 'bg-blue-600',
    Backend: 'bg-green-600',
    DevOps: 'bg-orange-500',
    'Data Science': 'bg-purple-600',
    Mobile: 'bg-pink-500',
    'Кибербез': 'bg-gray-800'
  }

  const selectClass =
    'w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 outline-none font-medium text-sm'

  let filteredCourses = [...courses]

  if (category !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.category === category)
  }

  if (level !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.level === level)
  }

  if (searchQuery.trim() !== '') {
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  if (sort === 'price-asc') {
    filteredCourses.sort((a, b) => a.price - b.price)
  }

  if (sort === 'price-desc') {
    filteredCourses.sort((a, b) => b.price - a.price)
  }

  return (
    <section id="catalog" className="max-w-7xl mx-auto pt-24 pb-10 px-8 scroll-mt-28">
      <h2 className="text-4xl font-bold mb-8">
        Каталог курсов
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        <aside className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-xl shadow-purple-500/10 h-fit">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-xl">
              Фильтры
            </h3>

            <button
              type="button"
              onClick={() => {
                setCategory('all')
                setLevel('all')
                setSort('default')
                setSearchQuery('')
              }}
              className="text-sm text-purple-600 font-semibold hover:text-purple-800"
            >
              Сбросить
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">
                Поиск
              </label>

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Название курса..."
                className={selectClass}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">
                Категория
              </label>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className={selectClass}
              >
                <option value="all">Все категории</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Data Science">Data Science</option>
                <option value="Mobile">Mobile</option>
                <option value="Кибербез">Кибербез</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">
                Уровень
              </label>

              <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                className={selectClass}
              >
                <option value="all">Любой уровень</option>
                <option value="Новичок">Новичок</option>
                <option value="Middle">Middle</option>
                <option value="PRO">PRO</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1 ml-1">
                Сортировка
              </label>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className={selectClass}
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешёвые</option>
                <option value="price-desc">Сначала дорогие</option>
              </select>
            </div>
          </div>
        </aside>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              data-aos="fade-up"
              key={course.title}
              className={`${colors[course.category]} text-white p-6 rounded-[30px] min-h-[300px] shadow-lg hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col`}
            >
              <div className="flex justify-between mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-xl text-sm">
                  {course.category}
                </span>

                <span className="bg-black/20 px-3 py-1 rounded-xl text-sm">
                  {course.level}
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {course.title}
              </h3>

              <p className="text-sm text-white/80 flex-grow">
                {course.description}
              </p>

              <div className="mt-5 text-2xl font-black">
                {course.price.toLocaleString()} ₽
              </div>
                <div className="mt-3 flex items-center gap-4 text-sm text-white/90">
                <span>⭐ {course.rating}</span>
                <span>👥 {course.students.toLocaleString()}+</span>
                </div>
              <button
                type="button"
                onClick={() => toggleFavorite(course.title)}
                className={`mt-5 px-4 py-3 rounded-2xl font-bold transition w-fit ${
                  favoriteCourses.includes(course.title)
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {favoriteCourses.includes(course.title)
                  ? '♥ В избранном'
                  : '♡ В избранное'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Catalog