import { motion } from 'framer-motion';
import { FiAward, FiCheckCircle } from 'react-icons/fi';

const Certifications = ({ darkMode }) => {
  const certifications = [
    {
      name: 'Apna College Sigma & Alpha 5.0',
      issuer: 'Apna College',
      status: 'Completed',
      description: 'Comprehensive full-stack development program covering DSA, web development, and problem-solving',
      skills: ['Data Structures', 'Algorithms', 'Web Development', 'Problem Solving'],
    },
    {
      name: 'Sheryians Coding School Frontend Domination',
      issuer: 'Sheryians Coding School',
      status: 'Completed',
      description: 'Advanced frontend development course focusing on modern JavaScript, React, and animations',
      skills: ['React.js', 'JavaScript', 'GSAP', 'Advanced CSS'],
    },
    {
      name: 'Harkirat Singh Cohort 3.0',
      issuer: 'Harkirat Singh',
      status: 'Currently Learning',
      description: 'Intensive full-stack development cohort with focus on Next.js, TypeScript, and modern web technologies',
      skills: ['Next.js', 'TypeScript', 'Full-Stack', 'Modern Web Dev'],
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="certifications"
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
            Certifications & <span className="gradient-text">Courses</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Continuous learning through structured programs and industry-recognized courses
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`p-6 rounded-xl transition-all ${
                darkMode
                  ? 'glass-effect-dark hover:bg-accent/10'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl'
              }`}
              whileHover={{ y: -5 }}
            >
              {/* Icon & Status */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-accent bg-accent/10 p-3 rounded-lg">
                  <FiAward size={32} />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    cert.status === 'Completed'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-blue-500/20 text-blue-500'
                  }`}
                >
                  {cert.status}
                </span>
              </div>

              {/* Certification Details */}
              <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
              <p className="text-accent font-semibold text-sm mb-3">{cert.issuer}</p>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {cert.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      darkMode
                        ? 'bg-primary text-gray-300'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Philosophy */}
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
          <div className="text-center max-w-3xl mx-auto">
            <FiCheckCircle className="text-accent mx-auto mb-4" size={48} />
            <h4 className="text-2xl font-display font-bold mb-4">
              Commitment to Continuous Growth
            </h4>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I believe in staying ahead of the curve by continuously learning new technologies 
              and best practices. These certifications represent my dedication to mastering modern 
              web development and building industry-standard applications.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
