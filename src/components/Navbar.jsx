import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { SiAdobecreativecloud } from "react-icons/si"
import { HiMoon, HiSun } from "react-icons/hi"
import { useTheme } from "../context/ThemeContext"

const NAV_LINKS = [
  { label: 'Tech',      href: '#tech' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
]

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 64
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

const SOCIALS = [
  { href: 'https://github.com/YB-Yottabyte',                              icon: <FaGithub />,            color: '#6e5494', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sai-rithwik-kukunuri-b5084527b',  icon: <FaLinkedin />,          color: '#0a66c2', label: 'LinkedIn' },
  { href: 'https://x.com/sairithwik2028',                                icon: <FaXTwitter />,          color: '#000000', darkColor: '#e7e9ea', label: 'X' },
  { href: 'https://www.instagram.com/sairithwikkukunuri/',               icon: <FaInstagram />,         color: '#e1306c', label: 'Instagram' },
  { href: '/404',                                                         icon: <SiAdobecreativecloud />, color: '#da1f26', label: 'Behance' },
]

const Navbar = () => {
  const { isLight, toggle } = useTheme()
  return (
    <nav
      className="sticky top-0 z-50 -mx-8 mb-0 px-8 py-3 flex items-center justify-between backdrop-blur-xl border-b transition-colors duration-300"
      style={{
        background: isLight ? 'rgba(248,249,255,0.9)' : 'rgba(6,6,16,0.85)',
        borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)',
      }}
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-2.5 group flex-shrink-0">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>
          SK
        </div>
        <span className="hidden sm:block text-sm font-bold tracking-tight transition-colors"
          style={{ color: isLight ? '#111827' : '#fff' }}>
          Sai Rithwik K
        </span>
      </a>

      {/* Nav links - hidden on mobile */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(({ label, href }) => (
          <button key={label}
            onClick={() => scrollTo(href.slice(1))}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
            style={{ color: isLight ? '#6b7280' : '#94a3b8', background: 'transparent' }}
            onMouseEnter={e => {
              e.currentTarget.style.color = isLight ? '#111827' : '#fff'
              e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.07)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = isLight ? '#6b7280' : '#94a3b8'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Right: socials + toggle */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ href, icon, color, darkColor, label }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" title={label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-base transition-all duration-200 hover:scale-110"
              style={{
                color: isLight ? color : (darkColor || color),
                background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.09)' : 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)'}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-px h-5" style={{ background: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)' }} />

        {/* Theme toggle */}
        <button onClick={toggle} title="Toggle theme"
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 text-lg hover:scale-105"
          style={{ background: isLight ? 'rgba(124,58,237,0.08)' : 'rgba(167,139,250,0.1)', color: isLight ? '#7c3aed' : '#a78bfa' }}>
          {isLight ? <HiMoon /> : <HiSun />}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
