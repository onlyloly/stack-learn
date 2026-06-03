const technologies = [
  'React',
  'Node.js',
  'Python',
  'FastAPI',
  'Mobile',
  'Web Design',
  'Frontend',
  'Backend',
  'Data Science',
  'DevOps'
]

function TechMarquee() {
  return (
    <div className="w-full overflow-hidden rounded-[30px] bg-white/50 border border-white/70 shadow-xl shadow-purple-500/10 py-5">
      <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-4">
        {[...technologies, ...technologies].map((tech, index) => (
          <span
            key={index}
            className="px-5 py-3 rounded-2xl bg-white text-purple-600 font-bold shadow-sm whitespace-nowrap"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TechMarquee