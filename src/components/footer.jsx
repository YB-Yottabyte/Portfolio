import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';

const FOOTER_SOCIALS = [
  { href: 'https://github.com/YB-Yottabyte',                             icon: <FaGithub />,    color: '#6e5494', darkColor: '#a78bfa', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sai-rithwik-kukunuri-b5084527b', icon: <FaLinkedin />,  color: '#0a66c2', darkColor: '#38bdf8', label: 'LinkedIn' },
  { href: 'https://x.com/sairithwik2028',                               icon: <FaXTwitter />,  color: '#111827', darkColor: '#e7e9ea', label: 'X' },
  { href: 'https://www.instagram.com/sairithwikkukunuri/',              icon: <FaInstagram />, color: '#e1306c', darkColor: '#f472b6', label: 'Instagram' },
]

const Footer = () => {
  const { isLight } = useTheme()
  return (
  <footer className="relative py-14 px-8 overflow-hidden" style={{ borderTop: isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.05)' }}>
    <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

      {/* Left */}
      <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)' }}>SK</div>
          <span className="text-xl font-bold" style={{ color: isLight ? '#111827' : '#fff' }}>Sai Rithwik Kukunuri</span>
        </div>
        <p className="text-base mb-1" style={{ color: isLight ? '#6b7280' : '#64748b' }}>Building things that matter</p>
        <p className="text-sm" style={{ color: isLight ? '#9ca3af' : '#475569' }}>&copy; {new Date().getFullYear()} Sai Rithwik Kukunuri. All rights reserved.</p>
      </motion.div>

      {/* Right */}
      <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-4">
        {FOOTER_SOCIALS.map(({ href, icon, color, darkColor, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl transition-all duration-200 hover:scale-110"
            style={{
              color: isLight ? color : darkColor,
              background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
              border: isLight ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
            }}>
            {icon}
          </a>
        ))}
      </motion.div>
    </div>
  </footer>
  )
}

export default Footer;
