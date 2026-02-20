import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/hero'
import Technologies from './components/Technologies'
import Experience from './components/Experience'
import Education from './components/Education'
import Project from './components/Project'
import Contact from './components/Contact'
import Footer from './components/footer'
import NotFound from './components/NotFound'
import { inject } from '@vercel/analytics';
import { useTheme } from './context/ThemeContext';
 
inject();

const MainLayout = () => {
  const { isLight } = useTheme()
  return (
    <div className={isLight ? 'light-mode' : ''}
      style={{ colorScheme: isLight ? 'light' : 'dark' }}
    >
    <div className='overflow-x-hidden antialiased selection:bg-violet-400 selection:text-white'
      style={{ color: isLight ? '#111827' : '#e2e8f0' }}>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full transition-colors duration-300"
          style={{ background: isLight ? '#f8f9ff' : '#07080f' }}>
          <div className="absolute inset-0"
            style={{
              backgroundImage: isLight
                ? 'linear-gradient(to right,#00000008 1px,transparent 1px),linear-gradient(to bottom,#00000005 1px,transparent 1px)'
                : 'linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff05 1px,transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <div className="absolute left-[-20%] top-[-10%] h-[700px] w-[700px] rounded-full"
            style={{ background: isLight ? 'radial-gradient(circle,#7c3aed18,transparent 70%)' : 'radial-gradient(circle,#7c3aed33,transparent 70%)' }} />
          <div className="absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full"
            style={{ background: isLight ? 'radial-gradient(circle,#0ea5e918,transparent 70%)' : 'radial-gradient(circle,#0ea5e933,transparent 70%)' }} />
          <div className="absolute bottom-[-10%] left-[30%] h-[600px] w-[600px] rounded-full"
            style={{ background: isLight ? 'radial-gradient(circle,#ec489918,transparent 70%)' : 'radial-gradient(circle,#ec489933,transparent 70%)' }} />
        </div>
      </div>
      <div className="container mx-auto px-8">
        <Navbar />
        <div id="about"><Hero /></div>
        <div id="tech"><Technologies /></div>
        <div id="education"><Education /></div>
        <div id="experience"><Experience /></div>
        <div id="projects"><Project /></div>
        <div id="contact"><Contact /></div>
        <Footer />
      </div>
    </div>
    </div>
  )
}

const App = () => (
  <Routes>
    <Route path="/" element={<MainLayout />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)


export default App
