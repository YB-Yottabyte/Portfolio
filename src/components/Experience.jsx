import { EXPERIENCE_GROUPS } from "../constants"
import { motion, AnimatePresence } from 'framer-motion'
import { FaBriefcase, FaChevronDown } from 'react-icons/fa'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import gdscLogo from '../assets/Education/GDSC.png'
import sodaLogo from '../assets/Education/SoDA.png'
import excelerateLogo from '../assets/Education/excelerate.png'
import schoolhouseLogo from '../assets/Education/schoolhouse.world.png'
import epicsLogo from '../assets/Education/asu.png'

const logoMap = {
  gdsc: gdscLogo,
  soda: sodaLogo,
  excelerate: excelerateLogo,
  schoolhouse: schoolhouseLogo,
  epics: epicsLogo,
}

const Experience = () => {
  const [openGroups, setOpenGroups] = useState(() => new Set(EXPERIENCE_GROUPS.map((_, i) => i)))
  const { isLight } = useTheme()

  const toggle = (i) => setOpenGroups(prev => {
    const next = new Set(prev)
    next.has(i) ? next.delete(i) : next.add(i)
    return next
  })

  return (
      <div className="border-b pb-16" style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.6 }}
        className="my-20 text-center"
      >
        <h2 className="text-3xl font-bold" style={{ color: isLight ? '#111827' : '#fff' }}>Work <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Experience</span></h2>
        <p className="mt-2 text-sm" style={{ color: isLight ? '#6b7280' : '#64748b' }}>Roles, internships &amp; community work</p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {EXPERIENCE_GROUPS.map((group, gi) => (
          <motion.div
            key={gi}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
            className="rounded-2xl overflow-hidden" style={{ border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.05)' }}
          >
            {/* Company header — clickable */}
            <button
              onClick={() => toggle(gi)}
              className="w-full flex items-center justify-between p-5 transition-colors duration-200"
              style={{ background: isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)' }}
              onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.03)'}              
            >
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0 p-2">
                  <img src={logoMap[group.logoKey]} alt={group.company} className="w-full h-full object-contain" />
                </div>
                <div className="text-left">
                  <a
                    href={group.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={e => e.stopPropagation()}
                    className={`font-bold text-sm bg-gradient-to-r ${group.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                  >
                    {group.company} ↗
                  </a>
                  <p className="text-xs mt-0.5" style={{ color: isLight ? '#6b7280' : '#64748b' }}>{group.roles.length} role{group.roles.length > 1 ? 's' : ''}</p>
                </div>
              </div>
              <motion.div animate={{ rotate: openGroups.has(gi) ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <FaChevronDown className="text-sm" style={{ color: isLight ? '#9ca3af' : '#64748b' }} />
              </motion.div>
            </button>

            {/* Roles list */}
            <AnimatePresence initial={false}>
              {openGroups.has(gi) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="divide-y" style={{ borderColor: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)' }}>
                    {group.roles.map((role, ri) => (
                      <div key={ri} className="p-5 pl-8 transition-colors duration-200"
                        style={{ background: isLight ? 'transparent' : 'rgba(255,255,255,0.01)' }}
                        onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = isLight ? 'transparent' : 'rgba(255,255,255,0.01)'}>
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <FaBriefcase className="text-xs flex-shrink-0" style={{ color: isLight ? '#9ca3af' : '#64748b' }} />
                      <span className="font-semibold text-sm" style={{ color: isLight ? '#111827' : '#fff' }}>{role.role}</span>
                          </div>
                          <span className="text-xs px-3 py-1 rounded-full whitespace-nowrap"
                            style={{ color: isLight ? '#6b7280' : '#64748b', background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.05)' }}>
                            {role.year}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed mb-3" style={{ color: isLight ? '#4b5563' : '#94a3b8' }}>{role.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {role.technologies.map((tech, ti) => (
                            <span key={ti} className={`text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${group.color} bg-clip-text text-transparent font-medium`}
                              style={{ border: isLight ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Experience
