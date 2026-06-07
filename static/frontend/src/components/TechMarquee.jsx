const technologies = [
  'Frontend',
  'Data Science',
  'DevOps',
  'React',
  'Node.js',
  'Python',
  'Flutter',
  'Backend',
  'TypeScript',
  'Docker',
  'ML',
  'Kubernetes',
]

function TechMarquee() {
  return (
    <div className="w-full rounded-[30px] bg-purple-50/80 border border-purple-100 shadow-xl shadow-purple-500/10 py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="px-6 py-3 rounded-2xl bg-white text-gray-700 font-bold shadow-sm border border-purple-100 hover:text-purple-600 hover:shadow-md transition"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TechMarquee