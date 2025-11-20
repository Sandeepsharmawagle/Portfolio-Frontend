import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';

const Skills = ({ darkMode }) => {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: [
        { name: 'React.js', icon: <FiCode />, level: 90, color: '#61DAFB' },
        { name: 'Next.js', icon: <FiCode />, level: 70, color: '#06B6D4' },
        { name: 'JavaScript', icon: <FiCode />, level: 85, color: '#F7DF1E' },
        { name: 'TypeScript', icon: <FiCode />, level: 65, color: '#3178C6' },
        { name: 'HTML5', icon: <FiCode />, level: 95, color: '#E34F26' },
        { name: 'CSS3', icon: <FiCode />, level: 90, color: '#1572B6' },
        { name: 'Tailwind CSS', icon: <FiCode />, level: 88, color: '#06B6D4' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js', icon: <FiCode />, level: 85, color: '#339933' },
        { name: 'Express.js', icon: <FiCode />, level: 85, color: '#06B6D4' },
        { name: 'MongoDB', icon: <FiCode />, level: 80, color: '#47A248' },
      ],
    },
    {
      category: 'Other',
      skills: [
        { name: 'Java', icon: <FiCode />, level: 75, color: '#007396' },
        { name: 'Git', icon: <FiCode />, level: 85, color: '#F05032' },
        { name: 'GitHub', icon: <FiCode />, level: 85, color: '#06B6D4' },
        { name: 'Postman', icon: <FiCode />, level: 80, color: '#FF6C37' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="skills"
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
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A comprehensive toolkit of modern technologies I use to build scalable web applications
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-display font-bold mb-6 gradient-text">
                {category.category}
              </h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    className={`p-6 rounded-xl transition-all ${
                      darkMode
                        ? 'glass-effect-dark hover:bg-accent/10'
                        : 'bg-white hover:shadow-xl'
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="text-4xl"
                          style={{ color: darkMode ? skill.color : skill.color }}
                        >
                          {skill.icon}
                        </div>
                        <span className="font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className="text-accent font-bold">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-accent to-accent-light"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mt-16 p-8 rounded-2xl ${
            darkMode
              ? 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20'
              : 'bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/30'
          }`}
        >
          <h4 className="text-2xl font-display font-bold mb-6 text-center">
            Tools & Platforms
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'JWT Authentication',
              'RESTful APIs',
              'Axios & Fetch',
              'Bcrypt',
              'Multer',
              'Cookie-parser',
              'Mongoose',
              'EJS',
              'MongoDB Atlas',
              'Netlify',
              'Render',
              'Vercel',
              'VS Code',
              'Linux (Kali, Ubuntu)',
              'Windows',
              'GSAP',
            ].map((tool, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg text-center font-medium transition-all ${
                  darkMode
                    ? 'bg-primary-light hover:bg-accent/20'
                    : 'bg-white hover:bg-accent/20'
                }`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
