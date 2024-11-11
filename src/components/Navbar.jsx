
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6";

import { FaInstagram } from 'react-icons/fa'


const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">

      
      <div className="flex flex-shrink-0 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40">
          <text x="50%" y="50%" font-family="'Roboto', sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle" alignment-baseline="middle">SK</text>
        </svg>
      </div>

      <div className="m-8 flex items-center justify-center gap-4 text-2xl space-x-4 my-6">
                <a href="https://github.com/YB-Yottabyte" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-2xl md:text-3xl text-gray-600 hover:text-gray-900" />
                </a>
                <a href="https://www.linkedin.com/in/sai-rithwik-kukunuri-b5084527b" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-2xl md:text-3xl text-blue-600 hover:text-blue-800" />
                </a>
                <a href="https://x.com/sairithwik2028" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter className="text-2xl md:text-3xl text-blue-500 hover:text-blue-700" />
                </a>
                <a href="https://www.instagram.com/sairithwikkukunuri/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-2xl md:text-3xl text-pink-500 hover:text-pink-700" />
                </a>
            </div>





    </nav>                
  )
}

export default Navbar
