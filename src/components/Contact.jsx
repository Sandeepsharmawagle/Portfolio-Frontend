import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import axios from 'axios';

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: <FiMail size={24} />,
      title: 'Email',
      value: 'sandipsharm4321@gmail.com',
      link: 'mailto:sandipsharm4321@gmail.com',
    },
    {
      icon: <FiPhone size={24} />,
      title: 'Phone',
      value: '+91 9599476483',
      link: 'tel:+919599476483',
    },
    {
      icon: <FiMapPin size={24} />,
      title: 'Location',
      value: 'Faridabad, Haryana, India',
      link: null,
    },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, formData);

      if (response.data.status === 'success') {
        setSubmitStatus({
          type: 'success',
          message: response.data.message,
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Failed to send message. Please try again or contact me directly via email.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Let's build something together! Feel free to reach out for collaborations, opportunities, 
            or just a friendly chat.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-display font-bold mb-8">
              Let's build something together
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-all ${
                    darkMode ? 'glass-effect-dark hover:bg-accent/10' : 'bg-gray-50 hover:bg-accent/10'
                  }`}
                  whileHover={{ x: 10 }}
                >
                  <div className="text-accent bg-accent/10 p-3 rounded-lg flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{info.title}</h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} hover:text-accent transition-colors`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Connect with me:</h4>
              <div className="flex space-x-4">
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
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`p-8 rounded-2xl ${
              darkMode ? 'glass-effect-dark' : 'bg-gradient-to-br from-gray-50 to-gray-100'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-primary-light text-white border border-gray-700 focus:border-accent'
                      : 'bg-white text-gray-900 border border-gray-300 focus:border-accent'
                  } outline-none ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-primary-light text-white border border-gray-700 focus:border-accent'
                      : 'bg-white text-gray-900 border border-gray-300 focus:border-accent'
                  } outline-none ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-primary-light text-white border border-gray-700 focus:border-accent'
                      : 'bg-white text-gray-900 border border-gray-300 focus:border-accent'
                  } outline-none ${errors.subject ? 'border-red-500' : ''}`}
                  placeholder="Project Collaboration"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-lg transition-colors resize-none ${
                    darkMode
                      ? 'bg-primary-light text-white border border-gray-700 focus:border-accent'
                      : 'bg-white text-gray-900 border border-gray-300 focus:border-accent'
                  } outline-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-4 bg-accent text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-dark'
                }`}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <FiSend />
              </motion.button>

              {/* Status Message */}
              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                      : 'bg-red-500/20 text-red-500 border border-red-500/30'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
