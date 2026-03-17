import React from 'react'
import { PROJECTS } from '../constants/index'
import { motion } from 'framer-motion'
import { FaArrowRight, FaCodeBranch, FaExternalLinkAlt, FaGithub, FaLayerGroup } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const fallbackAccents = [
  'from-violet-500 via-fuchsia-500 to-cyan-400',
  'from-cyan-500 via-blue-500 to-indigo-500',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-amber-400 via-orange-500 to-rose-500',
]

const surfaceStyle = (isLight) => ({
  border: isLight ? '1px solid rgba(15, 23, 42, 0.09)' : '1px solid rgba(255,255,255,0.06)',
  background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(9, 14, 29, 0.7)',
  boxShadow: isLight ? '0 20px 60px rgba(15, 23, 42, 0.09)' : '0 18px 50px rgba(2, 6, 23, 0.38)',
  backdropFilter: 'blur(14px)',
})

const subtlePanelStyle = (isLight) => ({
  background: isLight ? 'rgba(248, 250, 252, 0.88)' : 'rgba(15, 23, 42, 0.72)',
  border: isLight ? '1px solid rgba(15, 23, 42, 0.07)' : '1px solid rgba(255,255,255,0.06)',
})

const PreviewPanel = ({ project, accent, isLight, featured = false }) => {
  if (project.mediaType === 'video' && project.image) {
    return (
      <div className={`relative overflow-hidden rounded-[1.75rem] ${featured ? 'min-h-[280px] lg:min-h-[360px]' : 'aspect-[16/10]'}`} style={subtlePanelStyle(isLight)}>
        <video
          src={project.image}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/5 via-transparent to-slate-950/45" />
        <div className={`absolute inset-x-4 top-4 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${featured ? 'max-w-fit' : 'max-w-max'}`} style={{ borderColor: isLight ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)', background: 'rgba(15, 23, 42, 0.38)', color: '#f8fafc' }}>
          {project.category}
        </div>
      </div>
    )
  }

  if (project.mediaType === 'image' && project.image) {
    return (
      <div className={`relative overflow-hidden rounded-[1.75rem] ${featured ? 'min-h-[280px] lg:min-h-[360px]' : 'aspect-[16/10]'}`} style={subtlePanelStyle(isLight)}>
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-transparent" />
        <div className={`absolute inset-x-4 top-4 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${featured ? 'max-w-fit' : 'max-w-max'}`} style={{ borderColor: isLight ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.18)', background: 'rgba(15, 23, 42, 0.38)', color: '#f8fafc' }}>
          {project.category}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] p-6 ${featured ? 'min-h-[280px] lg:min-h-[360px]' : 'min-h-[220px]'}`} style={subtlePanelStyle(isLight)}>
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} style={{ opacity: featured ? 0.15 : 0.1 }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_30%)]" />
      <div className="relative flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>
            <FaLayerGroup className="text-[10px]" />
            {project.category}
          </div>
          <div className="max-w-[14rem] text-xl font-semibold leading-tight md:text-2xl" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
            {project.title}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl px-4 py-3 text-sm leading-relaxed" style={{ background: isLight ? 'rgba(255,255,255,0.75)' : 'rgba(15,23,42,0.72)', color: isLight ? '#334155' : '#dbeafe', border: isLight ? '1px solid rgba(148, 163, 184, 0.18)' : '1px solid rgba(255,255,255,0.05)' }}>
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ProjectActions = ({ project, accent, isLight, featured = false }) => (
  <div className={`flex ${featured ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'} gap-3`}>
    <motion.a
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={project.codeUrl}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${featured ? 'sm:min-w-[180px]' : ''} bg-gradient-to-r ${accent}`}
    >
      <FaGithub className="text-base" />
      {project.ctaLabel || 'View Repository'}
    </motion.a>

    {project.demoUrl ? (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={project.demoUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold"
        style={{ border: isLight ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255,255,255,0.12)', color: isLight ? '#334155' : '#dbeafe', background: isLight ? 'rgba(255,255,255,0.86)' : 'rgba(15,23,42,0.66)' }}
      >
        <FaExternalLinkAlt className="text-xs" />
        Live Demo
      </motion.a>
    ) : (
      <div className="inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium" style={{ border: isLight ? '1px dashed rgba(15, 23, 42, 0.14)' : '1px dashed rgba(255,255,255,0.12)', color: isLight ? '#475569' : '#94a3b8' }}>
        <FaCodeBranch className="text-xs" />
        Code-first build with details in the repository
      </div>
    )}
  </div>
)

const FeaturedProjectCard = ({ project, index, isLight }) => {
  const accent = project.accent || fallbackAccents[index % fallbackAccents.length]

  return (
    <motion.article
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 36 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-[2rem] p-5 md:p-7"
      style={surfaceStyle(isLight)}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: isLight ? '#475569' : '#94a3b8' }}>
              <span className="rounded-full px-3 py-1" style={{ background: isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)' }}>
                Featured Project
              </span>
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>

            <div>
              <h3 className="max-w-2xl text-2xl font-semibold tracking-tight md:text-3xl" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                {project.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 md:text-base" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>
                {project.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {project.highlights.map((highlight) => (
                <div key={highlight} className="rounded-2xl px-4 py-4 text-sm font-medium leading-relaxed" style={{ background: isLight ? 'rgba(248, 250, 252, 0.96)' : 'rgba(15, 23, 42, 0.72)', color: isLight ? '#334155' : '#e2e8f0', border: isLight ? '1px solid rgba(15, 23, 42, 0.06)' : '1px solid rgba(255,255,255,0.05)' }}>
                  {highlight}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ border: isLight ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255,255,255,0.08)', color: isLight ? '#0f172a' : '#f8fafc', background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(15,23,42,0.58)' }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <ProjectActions project={project} accent={accent} isLight={isLight} featured />
          </div>
        </div>

        <PreviewPanel project={project} accent={accent} isLight={isLight} featured />
      </div>
    </motion.article>
  )
}

const ProjectCard = ({ project, index, isLight }) => {
  const accent = project.accent || fallbackAccents[index % fallbackAccents.length]

  return (
    <motion.article
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 32 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[1.75rem] p-5"
      style={surfaceStyle(isLight)}
    >
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: isLight ? '#64748b' : '#94a3b8' }}>
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <PreviewPanel project={project} accent={accent} isLight={isLight} />

        <div>
          <h3 className="text-lg font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>{project.title}</h3>
          <p className="mt-3 text-sm leading-7" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
              style={{ border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255,255,255,0.08)', color: isLight ? '#334155' : '#e2e8f0', background: isLight ? 'rgba(248, 250, 252, 0.96)' : 'rgba(15,23,42,0.6)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid gap-2">
          {project.highlights.map((highlight) => (
            <div key={highlight} className="flex items-start gap-2 text-sm" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>
              <FaArrowRight className="mt-1 text-[10px]" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>

        <ProjectActions project={project} accent={accent} isLight={isLight} />
      </div>
    </motion.article>
  )
}

const Project = () => {
  const { isLight } = useTheme()
  const featuredProject = PROJECTS.find((project) => project.featured) || PROJECTS[0]
  const supportingProjects = PROJECTS.filter((project) => project !== featuredProject)

  return (
    <section className="border-b pb-20" style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="my-20"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: isLight ? '#64748b' : '#94a3b8' }}>
            Selected Work
          </p>
          <h2 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: isLight ? '#111827' : '#fff' }}>
            Projects that show <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">product thinking, engineering depth, and range</span>
          </h2>
          <p className="mt-4 text-sm leading-7 md:text-base" style={{ color: isLight ? '#6b7280' : '#94a3b8' }}>
            A curated set of builds across desktop software, Python tooling, data analysis, and frontend development. Each project is selected to show a different side of how I design, build, and reason through technical work.
          </p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl space-y-8">
        <FeaturedProjectCard project={featuredProject} index={0} isLight={isLight} />

        <div className="grid gap-6 xl:grid-cols-3 md:grid-cols-2">
          {supportingProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index + 1} isLight={isLight} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default Project