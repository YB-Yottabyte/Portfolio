/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DESIGN_FLYER_GROUPS } from '../constants'
import { useTheme } from '../context/ThemeContext'
import gdscLogo from '../assets/Education/GDSC.png'
import sodaLogo from '../assets/Education/SoDA.png'

const logoMap = { gdsc: gdscLogo, soda: sodaLogo }

const panelStyle = (isLight) => ({
  background: isLight ? 'rgba(255,255,255,0.72)' : 'rgba(10,14,24,0.6)',
  border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(14px)',
  boxShadow: isLight ? '0 18px 45px rgba(15,23,42,0.08)' : '0 18px 45px rgba(0,0,0,0.35)',
})

const imageBg = (isLight) => ({
  border: isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.08)',
  background: isLight ? 'linear-gradient(160deg,#f8fafc,#eef2ff)' : 'linear-gradient(160deg,#0f172a,#111827)',
})

const ToolChip = ({ tool, isLight }) => (
  <span
    className="rounded-full px-3 py-1 text-xs font-medium"
    style={{
      color: isLight ? '#0f172a' : '#e2e8f0',
      border: isLight ? '1px solid rgba(0,0,0,0.12)' : '1px solid rgba(255,255,255,0.14)',
      background: isLight ? 'rgba(248,250,252,0.95)' : 'rgba(15,23,42,0.7)',
    }}
  >
    {tool}
  </span>
)

const FeaturedFlyerCard = ({ flyer, isLight }) => (
  <motion.article
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.5 }}
    className="overflow-hidden rounded-3xl p-5 md:p-6"
    style={panelStyle(isLight)}
  >
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
      <div className="aspect-square overflow-hidden rounded-2xl p-4" style={imageBg(isLight)}>
        <img src={flyer.image} alt={flyer.title} className="h-full w-full object-contain" loading="lazy" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: isLight ? '#64748b' : '#94a3b8' }}>
          Featured · {flyer.category}
        </p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
          {flyer.title}
        </h2>
        <p className="mt-4 text-sm leading-7" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>
          {flyer.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {flyer.tools.map((tool) => <ToolChip key={tool} tool={tool} isLight={isLight} />)}
        </div>
      </div>
    </div>
  </motion.article>
)

const FlyerCard = ({ flyer, index, isLight }) => (
  <motion.article
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 28 }}
    transition={{ duration: 0.42, delay: index * 0.07 }}
    className="flex flex-col overflow-hidden rounded-3xl p-4"
    style={panelStyle(isLight)}
  >
    <div className="aspect-square overflow-hidden rounded-2xl p-3" style={imageBg(isLight)}>
      <img src={flyer.image} alt={flyer.title} className="h-full w-full object-contain" loading="lazy" />
    </div>
    <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: isLight ? '#64748b' : '#94a3b8' }}>
        {flyer.category}
      </p>
      <h3 className="text-lg font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
        {flyer.title}
      </h3>
      <p className="text-sm leading-6" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>
        {flyer.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-3">
        {flyer.tools.map((tool) => <ToolChip key={tool} tool={tool} isLight={isLight} />)}
      </div>
    </div>
  </motion.article>
)

const OrgSection = ({ group, groupIndex, isLight }) => {
  const logo = logoMap[group.logoKey]
  const [featured, ...rest] = group.flyers
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: groupIndex * 0.08 }}
      className="space-y-6"
    >
      {/* Org header */}
      <div
        className="flex items-center gap-4 rounded-2xl px-5 py-4"
        style={{
          background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.55)',
          border: isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-xl bg-white p-1.5 flex items-center justify-center"
          style={{ border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.1)' }}>
          <img src={logo} alt={group.org} className="h-full w-full object-contain" />
        </div>
        <div>
          <a
            href={group.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`font-bold text-sm bg-gradient-to-r ${group.color} bg-clip-text text-transparent hover:opacity-75 transition-opacity`}
          >
            {group.org} ↗
          </a>
          <p className="text-xs mt-0.5" style={{ color: isLight ? '#64748b' : '#94a3b8' }}>
            {group.flyers.length} flyer{group.flyers.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Featured flyer */}
      <FeaturedFlyerCard flyer={featured} isLight={isLight} />

      {/* Secondary flyers grid */}
      {rest.length > 0 && (
        <div className={`grid gap-6 ${rest.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
          {rest.map((flyer, i) => (
            <FlyerCard key={flyer.title} flyer={flyer} index={i} isLight={isLight} />
          ))}
        </div>
      )}
    </motion.div>
  )
}

const Flyers = () => {
  const { isLight } = useTheme()

  return (
    <section className="pb-20 pt-10">
      {/* Page header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.26em]" style={{ color: isLight ? '#64748b' : '#94a3b8' }}>
          Design Portfolio
        </p>
        <h1 className="mt-4 text-2xl font-bold md:text-3xl" style={{ color: isLight ? '#111827' : '#fff' }}>
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Visual Work
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7" style={{ color: isLight ? '#6b7280' : '#94a3b8' }}>
            A growing collection of visual work grounded in structure and clarity, where design decisions focus on usability and user experience.
        </p>
        <div className="mt-4 flex justify-center">
          <span
            className="rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{
              color: isLight ? '#d97706' : '#fbbf24',
              background: isLight ? 'rgba(217,119,6,0.08)' : 'rgba(251,191,36,0.12)',
              border: isLight ? '1px solid rgba(217,119,6,0.2)' : '1px solid rgba(251,191,36,0.2)',
            }}
          >
            Work in Progress
          </span>
        </div>
      </motion.div>

      {/* Org sections */}
      <div className="mx-auto mt-12 max-w-6xl space-y-14">
        {DESIGN_FLYER_GROUPS.map((group, i) => (
          <OrgSection key={group.short} group={group} groupIndex={i} isLight={isLight} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link
          to="/"
          className="rounded-2xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}
        >
          ← Back to Main Portfolio
        </Link>
      </div>
    </section>
  )
}

export default Flyers
