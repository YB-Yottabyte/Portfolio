import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import pikachuImg from '../assets/404.png'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col justify-end" style={{ background: '#f0f4ff' }}>

      {/* Centered Pikachu image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <img
          src={pikachuImg}
          alt="Pikachu using Iron Tail"
          className="w-auto h-auto max-h-screen object-contain"
        />
        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: 'linear-gradient(to top, rgba(240,244,255,0.97) 60%, transparent 100%)' }} />
      </div>

      {/* Pokeball top-left */}
      <motion.div
        className="absolute top-10 left-10 w-12 h-12 rounded-full pointer-events-none opacity-20 z-10"
        style={{ background: 'linear-gradient(180deg,#ef4444 50%,#fff 50%)', border: '3px solid #d1d5db' }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      {/* Pokeball bottom-right */}
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 rounded-full pointer-events-none opacity-20 z-10"
        style={{ background: 'linear-gradient(180deg,#ef4444 50%,#fff 50%)', border: '4px solid #d1d5db' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content box — pinned to bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full px-6 pb-10 pt-8"
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center sm:items-end gap-6 px-8 py-7 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 -4px 40px rgba(0,0,0,0.08), 0 2px 20px rgba(124,58,237,0.08)',
          }}
        >
          <div className="flex-1 text-left">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-7xl font-black leading-none bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent block"
            >
              404
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl font-bold mt-1 mb-1" style={{ color: '#111827' }}
            >
              Oops! Page not found
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm leading-relaxed"
              style={{ color: '#4b5563' }}
            >
              ⚡ Pikachu's Iron Tail knocked this page away.
              <br />
              <span className="text-xs" style={{ color: '#9ca3af' }}>It's super effective — the page is gone!</span>
            </motion.p>
          </div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => navigate('/')}
            className="flex-shrink-0 px-8 py-3 rounded-2xl font-semibold text-white text-sm transition-all duration-300 hover:scale-105 hover:brightness-110 whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', boxShadow: '0 0 28px rgba(124,58,237,0.45)' }}
          >
            ← Back to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound
