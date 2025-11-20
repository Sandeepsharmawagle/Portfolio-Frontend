import { motion } from 'framer-motion';
import { FiCheckCircle, FiCode, FiServer, FiGitBranch } from 'react-icons/fi';

const Experience = ({ darkMode }) => {
  const experiences = [
    {
      icon: <FiCode size={24} />,
      title: 'Full-Stack MERN Development',
      description: 'Developed full-stack job portal with secure JWT authentication and RESTful APIs using MERN stack',
    },
    {
      icon: <FiServer size={24} />,
      title: 'API Design & Deployment',
      description: 'Gained hands-on experience in API design, deployment on Render and Netlify, and version control',
    },
    {
      icon: <FiGitBranch size={24} />,
      title: 'Responsive Web Design',
      description: 'Created responsive educational consultancy site with React, Tailwind CSS, and GSAP animations',
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: 'Continuous Learning',
      description: 'Actively learning Next.js and TypeScript through personal projects and structured programs',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="experience"
      className={`py-20 ${darkMode ? 'bg-primary' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Experience & <span className="gradient-text">Journey</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Project-Based & Self-Driven Work
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-2xl ${
              darkMode
                ? 'glass-effect-dark'
                : 'bg-white shadow-xl'
            }`}
          >
            <h3 className="text-2xl font-display font-bold mb-8 gradient-text">
              Professional Timeline
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2 mr-4" />
                <div>
                  <p className="text-accent font-semibold">Nov 2025 - Present</p>
                  <h4 className="text-xl font-bold mb-2">SS Job Application Portal</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Full-Stack MERN Application with JWT authentication, role-based dashboards, and RESTful APIs
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2 mr-4" />
                <div>
                  <p className="text-accent font-semibold">Aug 2025 - Present</p>
                  <h4 className="text-xl font-bold mb-2">Daimanzoku Education Center</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Frontend Web Application with Tailwind CSS and GSAP animations for study abroad services
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2 mr-4" />
                <div>
                  <p className="text-accent font-semibold">2023 - Present</p>
                  <h4 className="text-xl font-bold mb-2">BCA Student & Developer</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Continuous learning through academic coursework and professional development programs
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`p-6 rounded-xl transition-all ${
                  darkMode
                    ? 'glass-effect-dark hover:bg-accent/10'
                    : 'bg-white hover:shadow-xl'
                }`}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 text-accent bg-accent/10 p-3 rounded-lg">
                    {exp.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">{exp.title}</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Skills Gained */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`p-8 rounded-2xl ${
            darkMode
              ? 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20'
              : 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30'
          }`}
        >
          <h4 className="text-2xl font-display font-bold mb-6 text-center">
            Core Competencies Developed
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="text-accent font-semibold mb-3">Backend Development</h5>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>✓ RESTful API Design</li>
                <li>✓ JWT Authentication</li>
                <li>✓ Database Management</li>
                <li>✓ Server Deployment</li>
              </ul>
            </div>
            <div>
              <h5 className="text-accent font-semibold mb-3">Frontend Development</h5>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>✓ React.js Components</li>
                <li>✓ Responsive Design</li>
                <li>✓ Animation Libraries</li>
                <li>✓ State Management</li>
              </ul>
            </div>
            <div>
              <h5 className="text-accent font-semibold mb-3">DevOps & Tools</h5>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <li>✓ Git Version Control</li>
                <li>✓ Cloud Deployment</li>
                <li>✓ API Testing (Postman)</li>
                <li>✓ Performance Optimization</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
