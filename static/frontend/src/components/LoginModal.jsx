function LoginModal({ isOpen, onClose, mode, setMode, onLogin, onRegister }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-[40px] shadow-2xl w-full max-w-md border border-gray-100 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-black text-2xl font-bold"
        >
          ×
        </button>

        {mode === 'login' ? (
          <div>
            <h2 className="text-3xl font-black mb-2">
              С возвращением!
            </h2>

            <p className="text-gray-500 mb-8">
              Введите свои данные для входа
            </p>

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault()

                onLogin(
                  event.target.email.value,
                  event.target.password.value
                )
              }}
            >
              <input
                name="email"
                type="email"
                placeholder="Почта"
                required
                className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 outline-none"
              />

              <input
                name="password"
                type="password"
                placeholder="Пароль"
                required
                className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-4 rounded-2xl font-bold hover:bg-purple-700 transition"
              >
                Войти
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-500">
                Нет аккаунта?
              </p>

              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-purple-600 font-bold mt-1 hover:underline"
              >
                Регистрация
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-black mb-2">
              Создать аккаунт
            </h2>

            <p className="text-gray-500 mb-8">
              Заполните данные для регистрации
            </p>

            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault()

                onRegister(
                  event.target.name.value,
                  event.target.email.value,
                  event.target.password.value
                )
              }}
            >
              <input
                name="name"
                type="text"
                placeholder="Имя"
                required
                className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 outline-none"
              />

              <input
                name="email"
                type="email"
                placeholder="Почта"
                required
                className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 outline-none"
              />

              <input
                name="password"
                type="password"
                placeholder="Пароль"
                required
                className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-purple-600 text-white p-4 rounded-2xl font-bold hover:bg-purple-700 transition"
              >
                Зарегистрироваться
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-500">
                Уже есть аккаунт?
              </p>

              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-purple-600 font-bold mt-1 hover:underline"
              >
                Войти
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginModal