import React from 'react'
import { PROJECTS } from '../constants/index'
import {motion} from 'framer-motion'

const Project = () => {
  return (
    <div className='border-bottom border-neutral-900 pb-4'>
        <motion.h2 
        whileInView={{opacity: 1, y: 0}}
        initial={{opacity: 0, y: -100}}
        transition={{duration: 0.5}}
        
        className='my-20 text-center text-4xl'>Projects</motion.h2>
        <div>
            {PROJECTS.map((project, index) => (
                <div key={index} className='mb-8 flex flex-wrap lg:justify-center'>
                    <motion.div 
                    whileInView={{opacity: 1, x: 0}}
                    initial={{opacity: 0, x: -100}}
                    transition={{duration: 1}}
                    className="w-full lg:w-1/4 lg:ml-[20px] "
                    >
                        <video src={project.image} width={800} height={400} autoPlay loop muted className='mb-6 rounded sm:transform sm:translate-x-[-75px]' alt={project.title} style={{ marginLeft: '-10px' }}/>
                    </motion.div>
                    <motion.div 
                    whileInView={{opacity: 1, x: 0}}
                    initial={{opacity: 0, x: 100}}
                    transition={{duration: 1}}
                    
                    className="w-full sm:w-1/2 max-w-xl lg:w-3/4">
                        <h6 className='mb-2 font-semibold'>{project.title}</h6>
                        <p className='mb-4 text-neutral-400'>{project.description}</p>
                        {project.technologies.map((tech, index) => (

                            <span key={index} className='mr-2 rounded bg-gray-800 px-2 py-1 text-sm font-medium text-cyan-400'>
                                {tech}
                            </span>
                            ))}
                          <div className="mt-4 flex space-x-4">
                <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='rounded-full bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 text-white font-medium text-sm shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none'
                onClick={() => window.open(project.codeUrl, '_blank')}
                 > View Code
                 </motion.button>
    
    {/* View Demo Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-white font-medium text-sm shadow-md transition-all duration-300 ease-in-out hover:shadow-lg focus:outline-none'
      onClick={() => window.open(project.demoUrl, '_blank')}
    >
      View Demo
    </motion.button>
  </div>
                    </motion.div>
                </div>
            ))}



        </div>



    </div>
  )
}

export default Project