import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ darkMode }) => {
  const sectionRef = useRef(null);

  // ── Exact data from updated resume ──────────────────────────────────────────
  const skillCategories = [
    {
      category: 'Programming Languages',
      skills: [
        { name: 'JavaScript', level: 88, color: '#F7DF1E' },
        { name: 'TypeScript', level: 72, color: '#3178C6' },
        { name: 'Python', level: 70, color: '#3776AB' },
        { name: 'Java', level: 70, color: '#007396' },
        { name: 'SQL', level: 68, color: '#4479A1' },
        { name: 'C', level: 60, color: '#A8B9CC' },
        { name: 'C++', level: 58, color: '#00599C' },
      ],
    },
    {
      category: 'Frameworks & Libraries',
      skills: [
        { name: 'React.js', level: 90, color: '#61DAFB' },
        { name: 'Node.js', level: 85, color: '#339933' },
        { name: 'Express.js', level: 85, color: '#06B6D4' },
        { name: 'Tailwind CSS', level: 88, color: '#06B6D4' },
        { name: 'Mongoose', level: 80, color: '#880000' },
        { name: 'FastAPI', level: 65, color: '#009688' },
        { name: 'Flask', level: 62, color: '#000000' },
        { name: 'LangChain', level: 60, color: '#818CF8' },
        { name: 'LangGraph', level: 55, color: '#6366F1' },
        { name: 'EJS', level: 72, color: '#90a93a' },
      ],
    },
    {
      category: 'Databases, Validation & Tools',
      skills: [
        { name: 'MongoDB', level: 82, color: '#47A248' },
        { name: 'MongoDB Atlas', level: 78, color: '#47A248' },
        { name: 'MySQL', level: 68, color: '#4479A1' },
        { name: 'JWT', level: 82, color: '#FBB040' },
        { name: 'Bcrypt', level: 78, color: '#06B6D4' },
        { name: 'Zod', level: 65, color: '#3178C6' },
        { name: 'Pydantic', level: 60, color: '#E92063' },
        { name: 'RAG', level: 55, color: '#818CF8' },
      ],
    },
    {
      category: 'API & HTTP',
      skills: [
        { name: 'RESTful API', level: 88, color: '#06B6D4' },
        { name: 'Axios', level: 84, color: '#5A29E4' },
        { name: 'Fetch', level: 84, color: '#F7DF1E' },
        { name: 'Web-Sockets', level: 65, color: '#47A248' },
      ],
    },
    {
      category: 'Version Control & Deployment',
      skills: [
        { name: 'Git', level: 85, color: '#F05032' },
        { name: 'GitHub', level: 85, color: '#818CF8' },
        { name: 'Netlify', level: 80, color: '#00C7B7' },
        { name: 'Render', level: 75, color: '#46E3B7' },
        { name: 'Vercel', level: 75, color: '#06B6D4' },
      ],
    },
  ];

  const devTools = [
    'Linux (Kali, Ubuntu)', 'Windows',
    'Figma', 'Postman',
    'Hoppscotch', 'VS Code',
    'Multer', 'Cookie-parser',
    'GSAP Animations', 'Next.js (Learning)',
    'DSA with Java', 'System Design',
  ];

  const softSkills = [
    'Strategic Leadership',
    'Executive Communication',
    'Public Speaking & Advocacy',
    'Team Orchestration',
    'Stakeholder Influence',
  ];

  useEffect(() => {
    // Small delay to allow layout to paint before GSAP registers scroll positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      const ctx = gsap.context(() => {
        gsap.fromTo('.skills-heading',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: '.skills-heading', start: 'top 95%', toggleActions: 'play none none none' } }
        );
        gsap.fromTo('.skill-card',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.55, ease: 'power2.out',
            scrollTrigger: { trigger: '#skills', start: 'top 80%', toggleActions: 'play none none none' } }
        );
        gsap.fromTo('.tool-badge',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, stagger: 0.03, duration: 0.4, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.tool-badge', start: 'top 95%', toggleActions: 'play none none none' } }
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 ${darkMode ? 'bg-primary' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="skills-heading text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A comprehensive toolkit spanning full-stack web, AI/ML integrations, and modern DevOps
          </p>
        </div>

        {/* Skill Categories */}
        <div className="space-y-10">
          {skillCategories.map((cat, ci) => (
            <div key={ci}>
              <h3 className="text-lg font-display font-bold mb-4 gradient-text">{cat.category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.skills.map((skill, si) => (
                  <motion.div
                    key={si}
                    className={`skill-card p-4 rounded-xl transition-all cursor-default ${
                      darkMode ? 'glass-effect-dark hover:bg-accent/10' : 'bg-white hover:shadow-xl'
                    }`}
                    whileHover={{ y: -5, boxShadow: `0 14px 30px ${skill.color}25` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: skill.color }} />
                        <span className="font-semibold text-sm">{skill.name}</span>
                      </div>
                      <span className="text-accent font-bold text-xs">{skill.level}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${skill.color}, #06B6D4)` }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: si * 0.04 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Development Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-12 p-7 rounded-2xl ${
            darkMode
              ? 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20'
              : 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30'
          }`}
        >
          <h4 className="text-lg font-display font-bold mb-5 text-center">Development Tools & Platforms</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {devTools.map((tool, i) => (
              <motion.div
                key={i}
                className={`tool-badge p-3 rounded-lg text-center text-sm font-medium transition-all cursor-default ${
                  darkMode ? 'bg-primary-light hover:bg-accent/20' : 'bg-white hover:bg-accent/20'
                }`}
                whileHover={{ scale: 1.06 }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Non-Technical Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-6 p-7 rounded-2xl ${
            darkMode
              ? 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20'
              : 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30'
          }`}
        >
          <h4 className="text-lg font-display font-bold mb-4 text-center">Non-Technical Skills</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {softSkills.map((s, i) => (
              <motion.span
                key={i}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  darkMode ? 'bg-accent/20 text-accent' : 'bg-accent/10 text-accent-dark'
                }`}
                whileHover={{ scale: 1.08 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
