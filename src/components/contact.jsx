import React from 'react';
import { motion } from 'framer-motion';

import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 py-8 px-4 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        
        {/* Tagline */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          className="text-start md:w-2/3"
        >
          <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
            Building Connections Through Innovation and Collaboration
          </h2>
          <p className="text-sm text-gray-300">
            A passion for creating, learning, and making a difference.
          </p>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className="flex space-x-4 mt-6 md:mt-0 md:justify-end md:w-1/3"
        >
          <a href="https://github.com/YB-Yottabyte" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-2xl md:text-3xl text-gray-400 hover:text-white transition-all duration-200" />
          </a>
          <a href="www.linkedin.com/in/sai-rithwik-kukunuri-b5084527b" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl md:text-3xl text-blue-500 hover:text-blue-300 transition-all duration-200" />
          </a>
          <a href="https://x.com/sairithwik2028" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-2xl md:text-3xl text-blue-400 hover:text-blue-200 transition-all duration-200" />
          </a>
          <a href="https://www.instagram.com/sairithwikkukunuri/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl md:text-3xl text-pink-500 hover:text-pink-300 transition-all duration-200" />
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
