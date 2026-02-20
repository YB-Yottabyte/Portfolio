import { FaReact, FaPython, FaJava, FaNodeJs, FaGitAlt, FaDocker, FaAws } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiCss3, SiHtml5, SiPostgresql, SiTypescript,
  SiMongodb, SiFirebase, SiFigma, SiFlask, SiPandas, SiNumpy, SiScikitlearn,
  SiGnubash, SiTensorflow, SiMysql, SiMicrosoftazure, SiTableau, SiPytorch, SiCplusplus} from "react-icons/si";
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const CATEGORIES = [
  { label: 'Languages', items: [
    { Icon: FaPython,     color: '#3b82f6', label: 'Python' },
    { Icon: FaJava,       color: '#ef4444', label: 'Java' },
    { Icon: SiCplusplus,  color: '#2563eb', label: 'C++' },
    { Icon: SiJavascript, color: '#facc15', label: 'JavaScript' },
    { Icon: SiTypescript, color: '#3b82f6', label: 'TypeScript' },
    { Icon: SiGnubash,    color: '#4ade80', label: 'Bash' },
  ]},
  { label: 'Frontend', items: [
    { Icon: FaReact,       color: '#38bdf8', label: 'React' },
    { Icon: SiHtml5,       color: '#f97316', label: 'HTML5' },
    { Icon: SiCss3,        color: '#60a5fa', label: 'CSS3' },
    { Icon: SiTailwindcss, color: '#22d3ee', label: 'Tailwind' },
  ]},
  { label: 'Backend & Databases', items: [
    { Icon: FaNodeJs,     color: '#4ade80', label: 'Node.js' },
    { Icon: SiFlask,      color: '#94a3b8', label: 'Flask' },
    { Icon: SiPostgresql, color: '#34d399', label: 'PostgreSQL' },
    { Icon: SiMysql,      color: '#f97316', label: 'MySQL' },
    { Icon: SiMongodb,    color: '#4ade80', label: 'MongoDB' },
  ]},
  { label: 'AI / Data Science', items: [
    { Icon: SiTensorflow,  color: '#f97316', label: 'TensorFlow' },
    { Icon: SiPytorch,     color: '#ef4444', label: 'PyTorch' },
    { Icon: SiScikitlearn, color: '#f97316', label: 'Scikit-learn' },
    { Icon: SiPandas,      color: '#a78bfa', label: 'Pandas' },
    { Icon: SiNumpy,       color: '#60a5fa', label: 'NumPy' },
  ]},
  { label: 'Cloud & Tools', items: [
    { Icon: FaAws,            color: '#fb923c', label: 'AWS' },
    { Icon: SiMicrosoftazure, color: '#38bdf8', label: 'Azure' },
    { Icon: SiTableau,        color: '#60a5fa', label: 'Tableau' },
    { Icon: FaGitAlt,         color: '#f97316', label: 'Git' },
    { Icon: FaDocker,         color: '#38bdf8', label: 'Docker' },
    { Icon: SiFigma,          color: '#a78bfa', label: 'Figma' },
    { Icon: SiFirebase,       color: '#fb923c', label: 'Firebase' },
  ]},
]

const BUBBLES = [
  { Icon: FaPython,         color: '#3b82f6', size: 28 },
  { Icon: FaReact,          color: '#38bdf8', size: 32 },
  { Icon: SiJavascript,     color: '#facc15', size: 26 },
  { Icon: SiTensorflow,     color: '#f97316', size: 30 },
  { Icon: SiPytorch,        color: '#ef4444', size: 26 },
  { Icon: FaAws,            color: '#fb923c', size: 28 },
  { Icon: SiMicrosoftazure, color: '#38bdf8', size: 24 },
  { Icon: SiTypescript,     color: '#3b82f6', size: 26 },
  { Icon: SiPostgresql,     color: '#34d399', size: 24 },
  { Icon: SiMysql,          color: '#f97316', size: 26 },
  { Icon: SiTableau,        color: '#60a5fa', size: 24 },
  { Icon: SiScikitlearn,    color: '#f97316', size: 22 },
  { Icon: SiPandas,         color: '#a78bfa', size: 24 },
  { Icon: FaDocker,         color: '#38bdf8', size: 26 },
  { Icon: SiFigma,          color: '#a78bfa', size: 24 },
  { Icon: SiGnubash,        color: '#4ade80', size: 22 },
  { Icon: SiCplusplus,      color: '#2563eb', size: 20 },
]

const Technologies = () => {
  const { isLight } = useTheme()
  const card = {
    background: isLight ? '#ffffff' : 'rgba(255,255,255,0.03)',
    border: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.07)',
    boxShadow: isLight ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
  }

  return (
    <div className="border-b pb-24" style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}>
      <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -30 }} transition={{ duration: 0.6 }}
        className="my-20 text-center">
        <h2 className="text-3xl font-bold" style={{ color: isLight ? '#111827' : '#fff' }}>
          Tech <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Stack</span>
        </h2>
        <p className="mt-2 text-sm" style={{ color: isLight ? '#6b7280' : '#64748b' }}>Tools &amp; technologies I work with</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-10 items-start">

        {/* LEFT */}
        <div className="space-y-7">
          {CATEGORIES.map((cat, ci) => (
            <motion.div key={cat.label} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 ml-1"
                style={{ color: isLight ? '#9ca3af' : '#475569' }}>{cat.label}</p>
              <div className="flex flex-wrap gap-3">
                {cat.items.map(({ Icon, color, label }) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-all duration-200 hover:scale-[1.06] cursor-default" style={card}>
                    <Icon style={{ color, fontSize: '1.2rem', flexShrink: 0 }} />
                    <span className="text-sm font-medium" style={{ color: isLight ? '#374151' : '#cbd5e1' }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT */}
        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-5 lg:sticky lg:top-24">

          {/* Floating bubble cloud */}
          <div className="rounded-2xl p-6 relative overflow-hidden" style={{ ...card, minHeight: '260px' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />
            <p className="text-sm font-bold mb-5 relative z-10" style={{ color: isLight ? '#111827' : '#fff' }}>Technologies</p>
            <div className="relative z-10 flex flex-wrap gap-3 justify-center items-center">
              {BUBBLES.map(({ Icon, color, size }, i) => {
                const r = parseInt(color.slice(1,3),16)
                const g = parseInt(color.slice(3,5),16)
                const b = parseInt(color.slice(5,7),16)
                return (
                  <motion.div key={i}
                    animate={{
                      y: [0, i % 2 === 0 ? -12 : -8, 0],
                      x: [0, i % 3 === 0 ? 5 : i % 3 === 1 ? -4 : 3, 0],
                    }}
                    transition={{ duration: 3 + (i % 4) * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                    className="rounded-2xl flex items-center justify-center cursor-default hover:scale-125 transition-transform duration-200"
                    style={{
                      width: size + 20, height: size + 20,
                      background: isLight ? 'rgba(' + r + ',' + g + ',' + b + ',0.09)' : 'rgba(' + r + ',' + g + ',' + b + ',0.13)',
                      border: '1px solid rgba(' + r + ',' + g + ',' + b + ',0.3)',
                      boxShadow: '0 0 14px rgba(' + r + ',' + g + ',' + b + ',0.2)',
                    }}>
                    <Icon style={{ color, fontSize: size }} />
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Currently exploring */}
          <div className="rounded-2xl p-6" style={card}>
            <p className="text-sm font-bold mb-3" style={{ color: isLight ? '#111827' : '#fff' }}>Currently Exploring</p>
            <div className="flex flex-wrap gap-2">
              {['LangChain', 'RAG Pipelines', 'Next.js', 'Kubernetes'].map(tag => (
                <span key={tag} className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(6,182,212,0.12))', border: '1px solid rgba(124,58,237,0.25)', color: isLight ? '#7c3aed' : '#a78bfa' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Technologies;
