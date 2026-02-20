import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useTheme } from '../context/ThemeContext'

const CONTACTS = [
  {
    icon: <FaGithub />,
    color: '#7c3aed',
    label: 'GitHub',
    handle: 'YB-Yottabyte',
    sub: 'Check out my work',
    href: 'https://github.com/YB-Yottabyte',
  },
  {
    icon: <FaLinkedin />,
    color: '#0a66c2',
    label: 'LinkedIn',
    handle: 'Sai Rithwik Kukunuri',
    sub: "Let's connect professionally",
    href: 'https://www.linkedin.com/in/sai-rithwik-kukunuri-b5084527b',
  },
  {
    icon: <MdEmail />,
    color: '#e11d48',
    label: 'Email',
    handle: 'sairithwik0108@gmail.com',
    sub: 'Drop me a message',
    href: 'mailto:sairithwik0108@gmail.com',
  },
]

const Contact = () => {
  const { isLight } = useTheme()

  return (
    <section
      className="border-b py-24 px-6"
      style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}
    >
      {/* Heading */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -24 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl font-bold mb-3" style={{ color: isLight ? '#111827' : '#fff' }}>
          Get in{' '}
          <span className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        <p className="text-base font-medium mb-2" style={{ color: isLight ? '#374151' : '#e2e8f0' }}>
          Connect with me
        </p>
        <p className="text-sm max-w-lg mx-auto leading-relaxed" style={{ color: isLight ? '#6b7280' : '#94a3b8' }}>
          Feel free to reach out for collaborations or just a friendly hello. I'm always open to
          discussing new projects, creative ideas, or opportunities.
        </p>
      </motion.div>

      {/* Contact cards */}
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        {CONTACTS.map(({ icon, color, label, handle, sub, href }, i) => {
          const r = parseInt(color.slice(1,3),16)
          const g = parseInt(color.slice(3,5),16)
          const b = parseInt(color.slice(5,7),16)
          return (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="flex items-center gap-5 px-6 py-5 rounded-2xl no-underline group transition-all duration-200"
              style={{
                background: isLight ? '#fff' : 'rgba(255,255,255,0.03)',
                border: isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: isLight ? '0 2px 12px rgba(0,0,0,0.05)' : 'none',
              }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                  background: `rgba(${r},${g},${b},${isLight ? 0.1 : 0.15})`,
                  border: `1px solid rgba(${r},${g},${b},0.25)`,
                  color,
                }}
              >
                {icon}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                  style={{ color: isLight ? '#9ca3af' : '#475569' }}>{label}</p>
                <p className="text-sm font-semibold truncate"
                  style={{ color: isLight ? '#111827' : '#fff' }}>{handle}</p>
                <p className="text-xs" style={{ color: isLight ? '#6b7280' : '#64748b' }}>{sub}</p>
              </div>

              {/* Arrow */}
              <div
                className="text-sm font-bold flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
                style={{ color }}
              >
                →
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}

export default Contact
