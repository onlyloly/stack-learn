import { useState } from 'react'

function Catalog({ coursesList, favoriteCourses, toggleFavorite, searchQuery, setSearchQuery }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [sort, setSort] = useState('default')

  const categories = [
    'Frontend',
    'Backend',
    'DevOps',
    'Data Science',
    'Mobile',
    'Cybersecurity'
  ]

  const levels = [
    'Новичок',
    'Middle',
    'PRO'
  ]

  const colors = {
    Frontend: 'bg-blue-600',
    Backend: 'bg-green-600',
    DevOps: 'bg-orange-500',
    'Data Science': 'bg-purple-600',
    Mobile: 'bg-pink-500',
    Cybersecurity: 'bg-gray-800'
  }

  const inputClass =
    'w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 outline-none font-medium text-sm'

  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category)
      )
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  function toggleLevel(level) {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(
        selectedLevels.filter(item => item !== level)
      )
    } else {
      setSelectedLevels([...selectedLevels, level])
    }
  }

  let filteredCourses = [...coursesList]

  if (selectedCategories.length > 0) {
    filteredCourses = filteredCourses.filter(course =>
      selectedCategories.includes(course.category)
    )
  }

  if (selectedLevels.length > 0) {
    filteredCourses = filteredCourses.filter(course =>
      selectedLevels.includes(course.level)
    )
  }

  if (searchQuery.trim() !== '') {
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.level.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">
            Каталог курсов
          </h2>

          <p className="text-gray-500">
            Выберите одну или несколько категорий и уровней подготовки
          </p>
        </div>

        <div className="bg-purple-50 text-purple-700 px-5 py-3 rounded-2xl font-bold text-sm w-fit">
          Найдено курсов: {filteredCourses.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
        <aside className="bg-white p-6 rounded-[30px] border border-gray-100 shadow-xl shadow-purple-500/10 h-fit">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold text-xl">
              Фильтры
            </h3>

            <button
              type="button"
              onClick={() => {
                setSelectedCategories([])
                setSelectedLevels([])
                setSort('default')
                setSearchQuery('')
              }}
              className="text-sm text-purple-600 font-semibold hover:text-purple-800"
            >
              Сбросить
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 ml-1">
                Поиск
              </label>

              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Название курса..."
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3 ml-1">
                Категории
              </label>

              <div className="space-y-2">
                {categories.map(category => (
                  <label
                    key={category}
                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border transition ${
                      selectedCategories.includes(category)
                        ? 'bg-purple-50 border-purple-300 text-purple-700'
                        : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <span className="font-semibold text-sm">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-3 ml-1">
                Уровни
              </label>

              <div className="space-y-2">
                {levels.map(level => (
                  <label
                    key={level}
                    className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border transition ${
                      selectedLevels.includes(level)
                        ? 'bg-purple-50 border-purple-300 text-purple-700'
                        : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-purple-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleLevel(level)}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <span className="font-semibold text-sm">
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2 ml-1">
                Сортировка
              </label>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className={inputClass}
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешёвые</option>
                <option value="price-desc">Сначала дорогие</option>
              </select>
            </div>
          </div>
        </aside>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start auto-rows-max">
            {filteredCourses.map(course => (
              <div
                data-aos="fade-up"
                key={course.title}
                className={`${colors[course.category] || 'bg-gray-800'} text-white p-6 rounded-[30px] h-[360px] shadow-lg hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col self-start overflow-hidden`}
              >
                <div className="flex justify-between mb-4 gap-2">
                  <span className="bg-white/20 px-3 py-1 rounded-xl text-sm truncate max-w-[60%]">
                    {course.category}
                  </span>

                  <span className="bg-black/20 px-3 py-1 rounded-xl text-sm shrink-0">
                    {course.level}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-white/80 flex-grow line-clamp-3">
                  {course.description}
                </p>

                <div className="mt-4 text-2xl font-black">
                  {course.price.toLocaleString()} ₽
                </div>

                <div className="mt-3 flex items-center gap-4 text-sm text-white/90">
                  <span>⭐ {course.rating}</span>
                  <span>👥 {course.students.toLocaleString()}+</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleFavorite(course.title)}
                  className={`mt-4 px-4 py-3 rounded-2xl font-bold transition w-fit ${
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
        ) : (
          <div className="bg-white border border-gray-100 rounded-[30px] shadow-xl shadow-purple-500/10 p-10 text-center h-fit">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Курсы не найдены
            </h3>
            <p className="text-gray-500 mb-6">
              Попробуйте изменить фильтры или очистить поиск.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategories([])
                setSelectedLevels([])
                setSort('default')
                setSearchQuery('')
              }}
              className="bg-purple-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-purple-700 transition"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Catalog