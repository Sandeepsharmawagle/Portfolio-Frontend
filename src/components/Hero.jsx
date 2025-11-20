import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload } from 'react-icons/fi';

const Hero = ({ darkMode }) => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const skills = ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'Next.js', 'TypeScript'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        darkMode ? 'bg-primary' : 'bg-gradient-to-br from-gray-50 to-gray-100'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-accent text-lg font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl font-display font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Sandeep Sharma
            </motion.h1>

            <motion.h2
              className={`text-2xl md:text-3xl font-semibold mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Full-Stack MERN Developer
              <br />
              <span className="text-lg md:text-xl">Building Scalable Web Solutions</span>
            </motion.h2>

            <motion.div
              className="flex items-center space-x-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Specializing in:
              </span>
              <motion.span
                key={currentSkill}
                className="text-accent font-bold text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {skills[currentSkill]}
              </motion.span>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection('#projects')}
                className="px-8 py-3 bg-accent text-white font-semibold rounded-lg shadow-lg hover:bg-accent-dark transition-colors"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>

              <motion.button
                onClick={() => scrollToSection('#contact')}
                className={`px-8 py-3 font-semibold rounded-lg border-2 transition-colors ${
                  darkMode
                    ? 'border-accent text-accent hover:bg-accent hover:text-white'
                    : 'border-accent text-accent hover:bg-accent hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.button>

              <motion.a
                href="/assets/resume.pdf"
                download="Sandeep_Sharma_Resume.pdf"
                className={`px-8 py-3 font-semibold rounded-lg border-2 transition-colors flex items-center gap-2 ${
                  darkMode
                    ? 'border-gray-600 text-gray-300 hover:border-accent hover:text-accent'
                    : 'border-gray-400 text-gray-700 hover:border-accent hover:text-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.a
                href="https://github.com/Sandeepsharmawagle"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-gray-800 text-white hover:bg-accent'
                    : 'bg-gray-200 text-gray-800 hover:bg-accent hover:text-white'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiGithub size={24} />
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/sandipsharmaw"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-gray-800 text-white hover:bg-accent'
                    : 'bg-gray-200 text-gray-800 hover:bg-accent hover:text-white'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiLinkedin size={24} />
              </motion.a>

              <motion.a
                href="mailto:sandipsharm4321@gmail.com"
                className={`p-3 rounded-full transition-colors ${
                  darkMode
                    ? 'bg-gray-800 text-white hover:bg-accent'
                    : 'bg-gray-200 text-gray-800 hover:bg-accent hover:text-white'
                }`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMail size={24} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Photo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative w-80 h-80 rounded-full overflow-hidden glass-effect-dark p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center overflow-hidden">
                  {/* Try to load profile image, fallback to initials */}
                  <img 
                    src="/assets/profile.jpg" 
                    alt="Sandeep Sharma"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`text-8xl font-bold ${darkMode ? 'text-white' : 'text-white'} hidden items-center justify-center w-full h-full`}>
                    SS
                  </div>
                </div>
              </div>
              
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #06B6D4, #22D3EE, #06B6D4)',
                  padding: '3px',
                  zIndex: -1,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => scrollToSection('#about')}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-accent text-sm font-medium"
          >
            <div className="flex flex-col items-center">
              <span className="mb-2">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-accent rounded-full flex justify-center">
                <motion.div
                  className="w-1.5 h-1.5 bg-accent rounded-full mt-2"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
