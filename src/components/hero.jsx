import React from 'react'
import { HERO_CONTENT } from '../constants/index'
import profilePic from '../assets/Rithwik_circle (1).png'
import { animate, motion } from "framer-motion"
import resume from '../assets/Sai Rithwik K Resume.pdf'



const container = (delay) => ({
    hidden: {x: -100, opacity: 0},
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: delay,
            duration: 0.5
        }
    }
})

const Hero = () => {
  return (
    <div className='border-b border-neutral-900 pb-4 lg:mb-35'>
        <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
                <div className="flex flex-col items-center lg:items-start">
                    <motion.h1 variants={container(0)} 
                    initial='hidden' 
                    animate='visible'  
                    className='pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl'>Sai Rithwik Kukunuri</motion.h1>
                <motion.span
                variants={container(0.5)} 
                initial='hidden' 
                animate='visible'
                className='bg-gradient-to-r from-pink-300 via-purple-500 to-indigo-500 bg-clip-text text-3xl tracking-tight text-transparent'>
                    Student Developer
                </motion.span>
                <motion.p 
                variants={container(1)} 
                initial='hidden' 
                animate='visible'
                className='my-2 max-w-xl py-6 font-light tracking-tighter text-pretty text-xl italic '>
                    {HERO_CONTENT}
                </motion.p> 
                <motion.button
                variants={container(1.5)}
                initial='hidden' 
                animate='visible'
                className='my-7 mt-6 rounded-full bg-gradient-to-r from-teal-400 to-blue-600 px-6 py-3 text-white font-semibold text-lg shadow-lg '
                onClick={() => window.open(resume, '_blank')}> 
                    Download Resume 
                </motion.button>
            </div>

   
        </div>


        <div className="w-full lg:w-1/2 lg:p-8">
            <div className="flex justify-center">
                <motion.img initial={{x:100, opacity: 0}}
                animate={{x:0, opacity: 1}}
                transition={{duration: 1, delay: 1.2}}
            src= {profilePic} alt="Sai Rithwik Kukunuri "
            className='rounded-full w-50 h-50 object-cover' />
                </div>
            </div>  
        </div>
    </div>
  )
}

export default Hero