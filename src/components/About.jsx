import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiCoffee, FiTrendingUp, FiAward, FiDownload } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ darkMode }) => {
  const sectionRef = useRef(null);

  const highlights = [
    {
      icon: <FiCode size={32} />,
      title: 'Full-Stack Developer',
      description: 'Expertise in MERN stack development',
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: 'Continuous Learner',
      description: 'Currently mastering Next.js & TypeScript',
    },
    {
      icon: <FiCoffee size={32} />,
      title: 'Problem Solver',
      description: 'Building scalable, secure solutions',
    },
    {
      icon: <FiAward size={32} />,
      title: 'BCA Student',
      description: '2023-2026 | CGPA: 7.1',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-heading', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.about-text-block p', {
        opacity: 0,
        x: -30,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-text-block',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.about-card', {
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.16,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.about-card',
          start: 'top 87%',
          toggleActions: 'play none none none',
        },
      });
      gsap.from('.about-edu-card', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-edu-card',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`py-20 ${darkMode ? 'bg-primary-light' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-heading text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Description */}
          <div>
            <h3 className="text-3xl font-display font-bold mb-6">
              Passionate Full-Stack Developer
            </h3>

            <div
              className={`about-text-block space-y-4 text-lg ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              <p>
                I'm a passionate full-stack web developer with expertise in the{' '}
                <span className="text-accent font-semibold">MERN stack</span>, specializing in
                building scalable and secure applications. My focus is on crafting clean, efficient
                code and delivering exceptional user experiences.
              </p>

              <p>
                Currently pursuing my{' '}
                <span className="text-accent font-semibold">
                  Bachelor of Computer Applications (BCA)
                </span>{' '}
                at DAV Centenary College, Faridabad (MDU Rohtak), graduating in 2026 with a CGPA of 7.1.
              </p>

              <p>
                I'm constantly expanding my skill set, currently diving deep into{' '}
                <span className="text-accent font-semibold">Next.js</span> and{' '}
                <span className="text-accent font-semibold">TypeScript</span>, with plans to master
                Data Structures & Algorithms using Java.
              </p>

              <p>
                With hands-on experience in API design, deployment, and version control, I'm eager
                to contribute to innovative projects and grow in challenging roles.
              </p>
            </div>

            {/* Education Card */}
            <motion.div
              className={`about-edu-card mt-8 p-6 rounded-xl ${
                darkMode
                  ? 'glass-effect-dark'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="text-xl font-bold mb-2 gradient-text">Education</h4>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Bachelor of Computer Applications (BCA)
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                DAV Centenary College (DAVCC), Faridabad
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Maharshi Dayanand University (MDU), Rohtak
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  2023 - 2026 (Expected)
                </span>
                <span className="text-accent font-bold">CGPA: 7.1</span>
              </div>
            </motion.div>

            {/* Download Resume Button */}
            <motion.a
              href="/assets/resume.pdf"
              download="Sandeep_Sharma_Resume.pdf"
              className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(6,182,212,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiDownload size={20} />
              Download Resume
            </motion.a>
          </div>

          {/* Right: Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className={`about-card p-6 rounded-xl transition-all cursor-default ${
                  darkMode
                    ? 'glass-effect-dark hover:bg-accent/10'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl'
                }`}
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(6,182,212,0.15)',
                  borderColor: 'rgba(6,182,212,0.4)',
                }}
              >
                <div className="text-accent mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Journey */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mt-16 p-8 rounded-2xl ${
            darkMode
              ? 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20'
              : 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30'
          }`}
        >
          <h4 className="text-2xl font-display font-bold mb-4">Current Learning Journey</h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="text-accent font-semibold mb-2">Mastering Now</h5>
              <ul
                className={`space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                <li>• Next.js Framework</li>
                <li>• TypeScript</li>
                <li>• Advanced React Patterns</li>
              </ul>
            </div>
            <div>
              <h5 className="text-accent font-semibold mb-2">Next on Roadmap</h5>
              <ul
                className={`space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                <li>• DSA with Java</li>
                <li>• System Design</li>
                <li>• GraphQL</li>
              </ul>
            </div>
            <div>
              <h5 className="text-accent font-semibold mb-2">Certifications</h5>
              <ul
                className={`space-y-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                <li>• Apna College Sigma</li>
                <li>• Sheryians Frontend</li>
                <li>• Harkirat Cohort 3.0</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
