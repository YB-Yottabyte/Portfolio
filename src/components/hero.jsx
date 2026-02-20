import React, { useEffect, useState } from 'react'
import { HERO_CONTENT } from '../constants/index'
import profilePic from '../assets/Rithwik_circle (1).png'
import { motion } from 'framer-motion'
import resume from '../assets/Sai Rithwik K Resume.pdf'
import { FaDownload, FaLinkedin, FaGithub } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const roles = ['Software Engineer', 'UI/UX Designer', 'Data Scientist', 'Creative Thinker']

const Hero = () => {
  const { isLight } = useTheme()
  const muted  = isLight ? '#6b7280' : '#64748b'
  const txt    = isLight ? '#111827' : '#fff'
  const sub    = isLight ? '#4b5563' : '#94a3b8'
  const btnTxt = isLight ? '#374151' : '#cbd5e1'
  const borderCol = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)'

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let t
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 2200)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 38)
    else { setDeleting(false); setRoleIndex(i => (i + 1) % roles.length) }
    return () => clearTimeout(t)
  }, [displayed, deleting, roleIndex])

  return (
    <section className="relative -mx-8 flex items-center overflow-hidden">

      {/* ── CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 lg:px-16 grid lg:grid-cols-2 gap-10 items-center py-16 pt-24">

        {/* ── LEFT: TEXT ── */}
        <div className="flex flex-col items-start">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-sm"
            style={{ border: isLight ? '1px solid rgba(124,58,237,0.15)' : '1px solid rgba(124,58,237,0.2)', background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.04)' }}
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-slate-300 text-sm font-medium" style={{ color: isLight ? '#374151' : '#cbd5e1' }}>Open to opportunities &nbsp;·&nbsp; ASU Class of 2027</span>
          </motion.div>

          {/* Name block */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
            className="mb-5">
            <p className="text-slate-500 text-sm font-light tracking-[0.25em] uppercase mb-2" style={{ color: isLight ? '#9ca3af' : '#64748b' }}>Hi, I&apos;m</p>
            <h1 className="font-black tracking-tight leading-[0.9]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: isLight ? '#111827' : '#fff' }}>
              Sai Rithwik
            </h1>
            <h1 className="font-black tracking-tight leading-[0.9]"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                background: 'linear-gradient(110deg, #c084fc 0%, #e879f9 35%, #38bdf8 75%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              Kukunuri
            </h1>
          </motion.div>

          {/* Thin divider */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="w-24 h-px mb-6 origin-left"
            style={{ background: 'linear-gradient(to right, #7c3aed, #06b6d4, transparent)' }} />

          {/* Typewriter */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-2 mb-4 text-lg lg:text-xl">
            <span className="text-lg lg:text-xl" style={{ color: isLight ? '#6b7280' : '#64748b' }}>I&apos;m a</span>
            <span className="font-bold text-cyan-400">
              {displayed}
              <span className="inline-block w-[3px] h-[1em] align-middle ml-0.5 rounded-sm animate-pulse"
                style={{ background: 'linear-gradient(to bottom, #a78bfa, #22d3ee)' }} />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.45 }}
            className="text-sm lg:text-base leading-relaxed mb-7 max-w-lg" style={{ color: isLight ? '#4b5563' : '#94a3b8' }}>
            Junior at{' '}
            <span className="font-semibold" style={{ color: isLight ? '#111827' : '#fff' }}>Arizona State University</span>
            {' '}· Computer Science
          </motion.p>

          {/* CTA row */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.55 }}
            className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => window.open(resume, '_blank')}
              className="group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-white font-semibold text-sm transition-all duration-300 hover:scale-[1.03] hover:brightness-110"
              style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', boxShadow: '0 0 28px rgba(124,58,237,0.3)' }}
            >
              <FaDownload className="text-xs" />
              Download Resume
            </button>
            <              a href="https://github.com/YB-Yottabyte" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm border transition-all duration-300"
              style={{ color: isLight ? '#374151' : '#cbd5e1', borderColor: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)', background: 'transparent' }}>
              <FaGithub className="text-xs" /> GitHub
            </a>
            <              a href="https://www.linkedin.com/in/sai-rithwik-kukunuri-b5084527b" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm border transition-all duration-300"
              style={{ color: isLight ? '#374151' : '#cbd5e1', borderColor: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)', background: 'transparent' }}>
              <FaLinkedin className="text-xs" /> LinkedIn
            </a>
          </motion.div>

        </div>

        {/* ── RIGHT: PHOTO ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative">
            {/* Glow halo */}
            <div className="absolute inset-0 rounded-3xl blur-3xl scale-110"
              style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.4) 0%, rgba(6,182,212,0.2) 55%, transparent 75%)' }} />

            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full border border-dashed border-violet-500/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-8 rounded-full border border-dashed border-cyan-500/10"
            />

            {/* Image card - circle */}
            <div className="relative w-[260px] h-[260px] xl:w-[300px] xl:h-[300px] rounded-full overflow-hidden"
              style={{
                background: isLight
                  ? 'linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(145deg,#7c3aed,#e879f9 45%,#06b6d4) border-box'
                  : 'linear-gradient(#080b18,#080b18) padding-box, linear-gradient(145deg,#7c3aed,#e879f9 45%,#06b6d4) border-box',
                border: '3px solid transparent',
              }}
            >
              <img src={profilePic} alt="Sai Rithwik Kukunuri"
                className="w-full h-full object-cover object-top" />
            </div>

            {/* Floating tag top-right - removed */}

            {/* Floating tag bottom-left - removed */}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-sm tracking-[0.2em] uppercase" style={{ color: muted }}>Scroll</p>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-slate-700/60 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full" style={{ background: 'linear-gradient(to bottom,#a78bfa,#22d3ee)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
