import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Experience from './components/Experience'
import Project from './components/Project'
import Footer from './components/footer'
import { inject } from '@vercel/analytics';
 
inject();


const App = () => {
  return (

    <div className='overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900'>
      <div className="fixed top-0 -z-10 h-full w-full">
      <div class="relative h-full w-full bg-black"><div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div><div class="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div>
      </div>
    </div>

      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />      
        <About/>
        <Technologies />
        <Experience />
        <Project />
        <Footer />
      </div>
     
    </div>
  )
}


export default App