import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';

const Projects = ({ darkMode }) => {
  const projects = [
    {
      title: 'SS Job Application Portal',
      description:
        'Full-stack job portal with role-based dashboards and secure JWT authentication. Features include job posting, application management, and user authentication with separate frontend and backend deployment.',
      techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bcrypt'],
      features: [
        'JWT Authentication & Authorization',
        'Role-based dashboards (Admin & User)',
        'RESTful API architecture',
        'Secure password hashing with Bcrypt',
        'Responsive design',
        'Separate deployment strategy',
      ],
      liveDemo: 'https://ssjobportal.netlify.app',
      github: 'https://github.com/Sandeepsharmawagle/FindJob-Frontend',
      image: '/assets/SS JOB PORTAl.png',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Daimanzoku Education Center',
      description:
        'Responsive educational consultancy website for Japan study abroad programs. Features modern UI/UX with smooth GSAP animations and a focus on user engagement and information accessibility.',
      techStack: ['React.js', 'Tailwind CSS', 'GSAP', 'JavaScript'],
      features: [
        'GSAP scroll animations',
        'Fully responsive design',
        'Modern glassmorphism effects',
        'Interactive UI components',
        'Optimized performance',
        'SEO friendly structure',
      ],
      liveDemo: 'https://daimanzoku.netlify.app',
      github: 'https://github.com/Sandeepsharmawagle/Daimanzoku-Education-Center',
      image: '/assets/Daimanzoku.png',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="projects"
      className={`py-20 ${darkMode ? 'bg-primary-light' : 'bg-white'}`}
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Real-world applications showcasing my expertise in full-stack development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Project Image */}
              <motion.div
                className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} relative group`}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`relative rounded-xl overflow-hidden shadow-2xl ${
                    darkMode ? 'glass-effect-dark' : 'bg-gray-100'
                  }`}
                >
                  {/* Project Screenshot */}
                  <div className="aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className={`aspect-video bg-gradient-to-br ${project.gradient} items-center justify-center hidden`}
                    >
                      <div className="text-center text-white">
                        <FiCode size={64} className="mx-auto mb-4 opacity-50" />
                        <p className="text-xl font-semibold opacity-75">{project.title}</p>
                        <p className="text-sm opacity-50 mt-2">Project Screenshot</p>
                      </div>
                    </div>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-accent/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white text-accent rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiExternalLink size={24} />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white text-accent rounded-full"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiGithub size={24} />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Project Details */}
              <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <motion.div
                  className={`p-8 rounded-xl ${
                    darkMode ? 'glass-effect-dark' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                  }`}
                >
                  <h3 className="text-3xl font-display font-bold mb-4">{project.title}</h3>

                  <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-accent font-semibold mb-3">Key Features:</h4>
                    <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent mr-2">▹</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-accent font-semibold mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            darkMode
                              ? 'bg-accent/20 text-accent'
                              : 'bg-accent/10 text-accent-dark'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink />
                      <span>Live Demo</span>
                    </motion.a>

                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-2 px-6 py-3 font-semibold rounded-lg border-2 transition-colors ${
                        darkMode
                          ? 'border-accent text-accent hover:bg-accent hover:text-white'
                          : 'border-accent text-accent hover:bg-accent hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub />
                      <span>View Code</span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Want to see more? Check out my GitHub for additional projects and contributions.
          </p>
          <motion.a
            href="https://github.com/Sandeepsharmawagle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub size={20} />
            <span>Visit GitHub Profile</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
