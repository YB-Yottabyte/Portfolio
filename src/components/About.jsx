import React from 'react'
import aboutImg from '../assets/about.jpg'
import { ABOUT_TEXT } from '../constants/index'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'



const About = () => {
  const { isLight } = useTheme()
  return (
    <div className='border-b pb-4' style={{ borderColor: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.05)' }}>
        <h2 className='my-14 text-center text-3xl font-bold' style={{ color: isLight ? '#111827' : '#fff' }}>
            About
            <span className='bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent'> Me</span>        
        </h2>

        <div className="flex flex-wrap"> 
            <div className="w-full lg:w-1/2 lg:p-8">
                <motion.div 
                whileInView={{opacity: 1, x: -30}}
                initial={{opacity: 0, x: -100}}
                transition={{duration: 0.7,  ease: "easeInOut"}}
                className="flex items-center justify-center will-change: transform;">
                    <img className='rounded-2xl '  src={aboutImg} alt="about" />
                </motion.div>
            </div>

            <motion.div 
            whileInView={{opacity: 1, x: 0}}
            initial={{opacity: 0, x: 100}}
            transition={{duration: 0.7,  ease: "easeInOut"}}
            className="w-full lg:w-1/2">
                <div className="flex justify-center lg:justify-start">
                    <p className='my-2 max-w-xl py-4 text-sm leading-relaxed' style={{ color: isLight ? '#4b5563' : '#94a3b8' }}>
                        {ABOUT_TEXT}
                        <br />
                        <br />
                        I&apos;m eager to connect with students, industry leaders, and potential employers to learn, grow, and contribute to innovative projects that have a lasting impact.   
                        </p>
                </div>
            </motion.div>


        </div>


    </div>
  )
}

export default About