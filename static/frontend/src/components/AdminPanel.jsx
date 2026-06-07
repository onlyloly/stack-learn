import { useState } from 'react'

const emptyCourse = {
  title: '',
  description: '',
  category: 'Frontend',
  level: 'Новичок',
  price: '',
  rating: '',
  students: ''
}

function AdminPanel({ isOpen, onClose, coursesList, setCoursesList }) {
  const [form, setForm] = useState(emptyCourse)
  const [editIndex, setEditIndex] = useState(null)

  if (!isOpen) return null

  function handleChange(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newCourse = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      students: Number(form.students)
    }

    if (editIndex !== null) {
      const updatedCourses = [...coursesList]
      updatedCourses[editIndex] = newCourse
      setCoursesList(updatedCourses)
      setEditIndex(null)
    } else {
      setCoursesList([...coursesList, newCourse])
    }

    setForm(emptyCourse)
  }

  function handleEdit(course, index) {
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: String(course.price),
      rating: String(course.rating),
      students: String(course.students)
    })

    setEditIndex(index)
  }

  function handleDelete(index) {
    const filteredCourses = coursesList.filter((_, courseIndex) => courseIndex !== index)
    setCoursesList(filteredCourses)
  }

  return (
    <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[30px] shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-gray-400 hover:text-purple-600 text-3xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-black text-gray-900 mb-2">
          Админ-панель
        </h2>

        <p className="text-gray-500 mb-8">
          Здесь можно добавлять, редактировать и удалять курсы.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-purple-50 p-6 rounded-[25px] mb-8"
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Название курса"
            required
            className="p-4 rounded-2xl border border-purple-100 outline-none"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-4 rounded-2xl border border-purple-100 outline-none"
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Data Science">Data Science</option>
            <option value="DevOps">DevOps</option>
            <option value="Mobile">Mobile</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="p-4 rounded-2xl border border-purple-100 outline-none"
          >
            <option value="Новичок">Новичок</option>
            <option value="Middle">Middle</option>
            <option value="PRO">PRO</option>
          </select>

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Цена"
            type="number"
            required
            className="p-4 rounded-2xl border border-purple-100 outline-none"
          />

          <input
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Рейтинг"
            type="number"
            step="0.1"
            required
            className="p-4 rounded-2xl border border-purple-100 outline-none"
          />

          <input
            name="students"
            value={form.students}
            onChange={handleChange}
            placeholder="Количество студентов"
            type="number"
            required
            className="p-4 rounded-2xl border border-purple-100 outline-none"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Описание курса"
            required
            className="md:col-span-2 p-4 rounded-2xl border border-purple-100 outline-none min-h-[100px]"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-purple-600 text-white py-4 rounded-2xl font-bold hover:bg-purple-700 transition"
          >
            {editIndex !== null ? 'Сохранить изменения' : 'Добавить курс'}
          </button>
        </form>

        <div className="space-y-4">
          {coursesList.map((course, index) => (
            <div
              key={`${course.title}-${index}`}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
            >
              <div>
                <h3 className="font-bold text-gray-900">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-500">
                  {course.category} • {course.level} • {course.price.toLocaleString()} ₽
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(course, index)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                >
                  Редактировать
                </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminPanel