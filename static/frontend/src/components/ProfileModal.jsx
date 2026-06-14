function ProfileModal({ isOpen, onClose, user, onLogout, favoriteCourses }) {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden relative">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-6 text-white/80 hover:text-white text-3xl font-bold z-10"
        >
          ×
        </button>

        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-8">
          <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center text-4xl font-black mb-4">
            {user.name[0]}
          </div>

          <h2 className="text-3xl font-black">
            {user.name}
          </h2>

          <p className="text-white/80 mt-1">
            {user.email}
          </p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-gray-50 p-5 rounded-3xl">
            <p className="text-gray-400 text-sm font-bold mb-1">
              Роль
            </p>
            <p className="text-xl font-bold text-gray-900">
              {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-3xl">
            <p className="text-gray-400 text-sm font-bold mb-1">
              Статус аккаунта
            </p>
            <p className="text-xl font-bold text-green-600">
              Активен
            </p>
          </div>

          <div className="bg-gray-50 p-5 rounded-3xl">
            <p className="text-gray-400 text-sm font-bold mb-1">
              Избранные курсы
            </p>
            <p className="text-xl font-bold text-gray-900">
            {favoriteCourses.length} курсов
            </p>
          </div>

         {user?.role !== 'admin' && (
          <div className="bg-gray-50 p-5 rounded-3xl">
            <p className="text-gray-400 text-sm font-bold mb-1">
              Уровень обучения
            </p>
            <p className="text-xl font-bold text-purple-600">
              Начинающий
            </p>
          </div>
)}

        </div>

        <div className="px-8 pb-8 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-purple-600 text-white p-4 rounded-2xl font-bold hover:bg-purple-700 transition"
          >
            Вернуться к курсам
          </button>

          <button
            onClick={onLogout}
            className="flex-1 bg-gray-100 text-gray-900 p-4 rounded-2xl font-bold hover:bg-red-100 hover:text-red-600 transition"
          >
            Выйти
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProfileModal