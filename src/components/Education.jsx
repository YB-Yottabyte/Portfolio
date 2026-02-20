import { EDUCATION } from "../constants";
import { motion } from "framer-motion";
import asuLogo from "../assets/Education/asu.png";
import acpLogo from "../assets/Education/acp.svg";
import { useTheme } from "../context/ThemeContext";

const logos = [asuLogo, acpLogo];
const gradients = [
  { border: 'linear-gradient(145deg,#7c3aed,#e879f9,#06b6d4)', glow: 'rgba(124,58,237,0.2)', link: '#a78bfa' },
  { border: 'linear-gradient(145deg,#0ea5e9,#06b6d4,#34d399)', glow: 'rgba(6,182,212,0.2)', link: '#38bdf8' },
]

const Education = () => {
  const { isLight } = useTheme()
  return (
      <div className="border-b pb-20" style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}>
      <motion.div
        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }}
        className="my-20 text-center"
      >
        <h2 className="text-3xl font-bold" style={{ color: isLight ? '#111827' : '#fff' }}>
          My{' '}
          <span style={{ background: 'linear-gradient(135deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Education</span>
        </h2>
        <p className="mt-2 text-sm" style={{ color: isLight ? '#6b7280' : '#64748b' }}>Academic background &amp; achievements</p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-0 bottom-0 w-px" style={{ background: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)' }} />

        <div className="space-y-6">
          {EDUCATION.map((edu, index) => {
            const g = gradients[index % gradients.length]
            return (
              <motion.div
                key={index}
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex gap-6 pl-14"
              >
                {/* Timeline dot */}
                <div className="absolute left-[13px] top-5 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{ background: isLight ? '#f8f9ff' : '#0d1022', borderColor: isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.2)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: g.border }} />
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl overflow-hidden"
                  style={{ background: isLight ? '#ffffff' : '#0d1022', border: isLight ? '1.5px solid rgba(0,0,0,0.08)' : '1.5px solid rgba(255,255,255,0.07)', boxShadow: isLight ? '0 2px 12px rgba(0,0,0,0.06)' : 'none' }}>
                  {/* Left accent bar */}
                  <div className="flex">
                    <div className="w-1 flex-shrink-0" style={{ background: g.border }} />
                    <div className="flex-1 p-5">
                      {/* Logo + Year */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex items-center justify-center flex-shrink-0 p-2">
                          <img src={logos[index]} alt={edu.school} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xs bg-black/5 px-3 py-1 rounded-full whitespace-nowrap" style={{ color: isLight ? '#6b7280' : '#64748b', background: isLight ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)', border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.08)' }}>
                          {edu.year}
                        </span>
                      </div>

                      {/* Degree */}
                      <h3 className="font-semibold text-sm leading-snug mb-1" style={{ color: isLight ? '#111827' : '#fff' }}>{edu.degree}</h3>

                      {/* School */}
                      <a href={edu.schoolUrl} target="_blank" rel="noopener noreferrer"
                        className="text-sm font-medium hover:opacity-70 transition-opacity"
                        style={{ color: g.link }}>
                        {edu.school} ↗
                      </a>

                      {/* Details */}
                      <p className="mt-2 text-xs leading-relaxed" style={{ color: isLight ? '#6b7280' : '#64748b' }}>{edu.details}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Education;
