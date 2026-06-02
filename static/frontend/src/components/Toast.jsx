function Toast({ message, type, onClose }) {
  if (!message) return null

  return (
    <div className="fixed top-6 right-6 z-[100] animate-pulse">
      <div
        className={`px-6 py-4 rounded-2xl shadow-2xl border text-white font-bold ${
          type === 'success'
            ? 'bg-green-600 border-green-400'
            : 'bg-red-500 border-red-300'
        }`}
      >
        <div className="flex items-center gap-4">
          <span className="text-xl">
            {type === 'success' ? '✅' : '⚠️'}
          </span>

          <span>{message}</span>

          <button
            onClick={onClose}
            className="ml-2 text-white/80 hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}

export default Toast