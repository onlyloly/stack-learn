function PopularCourses() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-8">

      <div className="flex justify-between items-center mb-10">
<h2 className="text-3xl font-bold">
Популярные курсы
</h2>

<button
onClick={() => {
const catalog = document.getElementById('catalog')

if (catalog) {
catalog.scrollIntoView({
behavior: 'smooth'
})
}
}}
className="cursor-pointer text-xl hover:text-purple-600 transition"
>
Все курсы →
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">

<div className="bg-purple-600 text-white p-8 rounded-[40px] min-h-[380px] flex flex-col hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

<div className="mb-5">
<span className="bg-yellow-400 text-black px-4 py-2 rounded-2xl font-bold">
🥇 Самый популярный
</span>
</div>

<div>
<h3 className="text-3xl font-extrabold">
Python для Data Science
</h3>

<p className="text-xl font-bold mt-2">
Data Science
</p>

<p className="text-sm text-white/70 mt-4">
Анализ данных, машинное обучение и построение прогнозных моделей на Python.
</p>
</div>

<div className="mt-auto">
<div className="mb-3 text-white/90">
👥 24 100+ студентов
</div>

<div className="flex justify-between items-end">
<div>★ 4.8</div>

<div className="bg-white/10 px-6 py-3 rounded-2xl font-black text-xl">
9 900 ₽
</div>
</div>
</div>

</div>

<div className="bg-blue-600 text-white p-8 rounded-[40px] min-h-[380px] flex flex-col hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

<div className="mb-5">
<span className="bg-slate-200 text-black px-4 py-2 rounded-2xl font-bold">
🥈 Выбор новичков
</span>
</div>

<div>
<h3 className="text-3xl font-extrabold">
React с нуля
</h3>

<p className="text-xl font-bold mt-2">
Frontend
</p>

<p className="text-sm text-white/70 mt-4">
Освой React, компоненты, хуки и создание современных веб-интерфейсов.
</p>
</div>

<div className="mt-auto">
<div className="mb-3 text-white/90">
👥 18 420+ студентов
</div>

<div className="flex justify-between items-end">
<div>★ 4.9</div>

<div className="bg-white/10 px-6 py-3 rounded-2xl font-black text-xl">
7 900 ₽
</div>
</div>
</div>

</div>

<div className="bg-green-600 text-white p-8 rounded-[40px] min-h-[380px] flex flex-col hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

<div className="mb-5">
<span className="bg-orange-300 text-black px-4 py-2 rounded-2xl font-bold">
🥉 Лидер Backend
</span>
</div>

<div>
<h3 className="text-3xl font-extrabold">
Node.js & Express
</h3>

<p className="text-xl font-bold mt-2">
Backend
</p>

<p className="text-sm text-white/70 mt-4">
Создание серверных приложений, REST API и работа с базами данных.
</p>
</div>

<div className="mt-auto">
<div className="mb-3 text-white/90">
👥 15 670+ студентов
</div>

<div className="flex justify-between items-end">
<div>★ 4.7</div>

<div className="bg-white/10 px-6 py-3 rounded-2xl font-black text-xl">
6 500 ₽
</div>
</div>
</div>

</div>

</div>

</section>
  )
}

export default PopularCourses