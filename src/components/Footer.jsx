import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FiGithub size={20} />,
      url: 'https://github.com/Sandeepsharmawagle',
    },
    {
      name: 'LinkedIn',
      icon: <FiLinkedin size={20} />,
      url: 'https://linkedin.com/in/sandipsharmaw',
    },
    {
      name: 'Email',
      icon: <FiMail size={20} />,
      url: 'mailto:sandipsharm4321@gmail.com',
    },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
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
    <footer
      className={`py-12 border-t ${
        darkMode ? 'bg-primary border-gray-800' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-display font-bold gradient-text mb-4">
              Sandeep Sharma
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
              Full-Stack MERN Developer passionate about building scalable web solutions 
              and creating exceptional user experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-gray-800 text-white hover:bg-accent'
                      : 'bg-gray-200 text-gray-800 hover:bg-accent hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`text-sm hover:text-accent transition-colors ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Get In Touch</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>
                <a href="mailto:sandipsharm4321@gmail.com" className="hover:text-accent transition-colors">
                  sandipsharm4321@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919599476483" className="hover:text-accent transition-colors">
                  +91 9599476483
                </a>
              </li>
              <li>Faridabad, Haryana, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} Sandeep Sharma. All rights reserved.
            </p>
            <p className={`text-sm flex items-center space-x-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <span>Built with</span>
              <FiHeart className="text-red-500" />
              <span>using React & Node.js</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
