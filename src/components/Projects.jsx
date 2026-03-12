import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiCode } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects = ({ darkMode }) => {
  const sectionRef = useRef(null);

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
      accent: '#06B6D4',
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
      accent: '#818CF8',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-heading', {
        opacity: 0, y: 40,
        duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.project-card', {
        opacity: 0, y: 60,
        stagger: 0.25, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.project-card',
          start: 'top 87%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`py-20 ${darkMode ? 'bg-primary-light' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="projects-heading text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Real-world applications showcasing my expertise in full-stack development
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project-card grid lg:grid-cols-2 gap-8 items-center ${
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
                  style={{
                    boxShadow: `0 25px 55px ${project.accent}22`,
                  }}
                >
                  {/* Glow border on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                    style={{ boxShadow: `inset 0 0 0 1.5px ${project.accent}55` }}
                  />
                  <div className="aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className={`aspect-video bg-gradient-to-br ${project.gradient} items-center justify-center hidden w-full h-full`}
                    >
                      <div className="text-center text-white">
                        <FiCode size={64} className="mx-auto mb-4 opacity-50" />
                        <p className="text-xl font-semibold opacity-75">{project.title}</p>
                        <p className="text-sm opacity-50 mt-2">Project Screenshot</p>
                      </div>
                    </div>
                  </div>

                  {/* Overlay on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4"
                    style={{ background: `${project.accent}ee` }}
                  >
                    <motion.a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white rounded-full"
                      style={{ color: project.accent }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiExternalLink size={24} />
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 bg-white rounded-full"
                      style={{ color: project.accent }}
                      whileHover={{ scale: 1.15 }}
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
                    darkMode
                      ? 'glass-effect-dark'
                      : 'bg-gradient-to-br from-gray-50 to-gray-100'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {/* Accent bar */}
                  <div
                    className="h-1 w-16 rounded-full mb-5"
                    style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
                  />

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
                        <motion.span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            darkMode
                              ? 'bg-accent/20 text-accent'
                              : 'bg-accent/10 text-accent-dark'
                          }`}
                          whileHover={{ scale: 1.08 }}
                        >
                          {tech}
                        </motion.span>
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
                      whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(6,182,212,0.35)' }}
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
            </div>
          ))}
        </div>

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
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(6,182,212,0.4)' }}
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
