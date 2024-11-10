import React from 'react'
import aboutImg from '../assets/about.jpg'
import { ABOUT_TEXT } from '../constants/index'
import { motion } from 'framer-motion'



const About = () => {
  return (
    <div className='border-b border-neutral-900 pb-4'>
        <h2 className='my-20 text-center text-4xl'>
            About
            <span className='text-neutral-500'> Me</span>        
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
                    <p className='my-2 max-w-xl py-6 text-pretty italic'>
                        {ABOUT_TEXT}
                        <br />
                        <br />
                        I’m eager to connect with other students, industry leaders, and potential employers to learn, grow, and contribute to innovative projects that have a lasting impact.   
                        </p>
                </div>
            </motion.div>


        </div>


    </div>
  )
}

export default About