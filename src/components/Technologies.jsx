import { FaReact, FaPython, FaJava } from "react-icons/fa";
import { SiJavascript, SiTailwindcss, SiCss3, SiHtml5, SiPostgresql, SiCplusplus } from "react-icons/si";
import { motion } from 'framer-motion';

// Define container variant to stagger each icon's animation
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.3, // Stagger delay for wave effect
    },
  },
};

// Define icon animation variant with slower, smoother bounce
const iconVariants = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0], // Moves up and back down
    transition: {
      duration: 2, // Slower, smooth bounce duration
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h2 
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h2>
      
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate" // Set container to animate, triggering child animations
        whileInView="animate" // Ensures animation triggers when in view
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {/* Each icon with bounce animation */}
        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiHtml5 className="text-7xl text-red-600" />
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiCss3 className="text-7xl text-blue-600" />     
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiTailwindcss className="text-7xl text-lightBlue-500" />
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiJavascript className="text-7xl text-yellow-500" />
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <FaReact className="text-7xl text-blue-500" />
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiPostgresql className="text-7xl text-green-500" />
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <FaJava className="text-7xl text-red-700" />
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <FaPython className="text-7xl text-blue-400" />
        </motion.div>

        <motion.div variants={iconVariants} className="rounded-2xl border-4 border-neutral-800 p-4">
          <SiCplusplus className="text-7xl text-purple-600" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technologies;
