import { useState } from 'react'
import logo from '../assets/logo.png.png'

function Navbar({
  openModal,
  currentUser,
  openProfile,
  searchQuery,
  setSearchQuery
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  function openSearch() {
    setIsSearchOpen(!isSearchOpen)

    setTimeout(() => {
      const catalog = document.getElementById('catalog')
      if (catalog) {
        catalog.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200/50 flex justify-between items-center py-4 px-8 md:px-20">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-10 object-contain"
        />

        <span className="text-xl font-bold text-gray-900">
          StackLearn
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2 font-medium text-gray-600">
        <a
          href="#catalog"
          className="px-4 py-2 rounded-xl hover:bg-gray-100 hover:text-purple-600 transition"
        >
          Каталог
        </a>

        <button
          type="button"
          onClick={openSearch}
          className="px-4 py-2 rounded-xl hover:bg-gray-100 hover:text-purple-600 transition"
        >
          Поиск
        </button>

        <a
          href="#"
          className="px-4 py-2 rounded-xl hover:bg-gray-100 hover:text-purple-600 transition"
        >
          О платформе
        </a>
      </div>

      <div className="flex items-center gap-3">
        {isSearchOpen && (
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Найти курс..."
            className="hidden md:block w-56 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl outline-none focus:border-purple-500"
          />
        )}

        {currentUser ? (
          <button
            onClick={openProfile}
            className="bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Личный кабинет
          </button>
        ) : (
          <button
            onClick={openModal}
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
          >
            Войти
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar