import React from 'react'
import { PROJECTS } from '../constants/index'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const cardColors = [
  'from-violet-500 to-fuchsia-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
]

const Project = () => {
  const { isLight } = useTheme()
  return (
    <div className="border-b pb-16" style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="my-20 text-center"
      >
        <h2 className="text-3xl font-bold" style={{ color: isLight ? '#111827' : '#fff' }}>Featured <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Projects</span></h2>
        <p className="mt-2 text-sm" style={{ color: isLight ? '#6b7280' : '#64748b' }}>Things I&apos;ve built</p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
            className="group relative rounded-2xl overflow-hidden transition-all duration-300 flex flex-col"
            style={{ border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.05)', background: isLight ? '#ffffff' : 'rgba(255,255,255,0.02)', boxShadow: isLight ? '0 2px 16px rgba(0,0,0,0.07)' : 'none' }}
          >
            {/* Video thumbnail */}
            <div className="relative overflow-hidden aspect-video" style={{ background: isLight ? '#e5e7eb' : '#0f172a' }}>
              <video
                src={project.image}
                autoPlay loop muted playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              {/* gradient overlay on video */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" style={{ opacity: isLight ? 0.15 : 1 }} />
              {/* Top color stripe */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${cardColors[index % cardColors.length]}`} />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
              <h3 className="font-bold text-lg mb-2" style={{ color: isLight ? '#111827' : '#fff' }}>{project.title}</h3>
              <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: isLight ? '#4b5563' : '#94a3b8' }}>{project.description}</p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.technologies.map((tech, ti) => (
                  <span key={ti} className={`text-xs px-2.5 py-1 rounded-full font-medium bg-gradient-to-r ${cardColors[index % cardColors.length]} bg-clip-text text-transparent`}
                    style={{ border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)' }}>
                    {tech}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(project.codeUrl, '_blank')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${cardColors[index % cardColors.length]} shadow-lg transition-all duration-200 hover:opacity-90`}
                >
                  <FaGithub className="text-base" /> Code
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => window.open(project.demoUrl, '_blank')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{ border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.1)', color: isLight ? '#374151' : '#cbd5e1' }}
                >
                  <FaExternalLinkAlt className="text-xs" /> Demo
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Project