import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogIn, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const AdminLogin = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    email: 'sandipsharm4321@gmail.com',
    password: '12102002'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Store token in localStorage
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('admin', JSON.stringify(data.admin));
        
        // Redirect to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      darkMode ? 'bg-primary' : 'bg-gray-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md rounded-2xl shadow-xl overflow-hidden ${
          darkMode ? 'glass-effect-dark' : 'bg-white'
        }`}
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <FiLogIn className="text-accent" size={32} />
            </div>
            <h2 className="text-3xl font-display font-bold mb-2">Admin Login</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Access portfolio management dashboard
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-primary-light text-white border border-gray-700 focus:border-accent'
                      : 'bg-gray-50 text-gray-900 border border-gray-300 focus:border-accent'
                  } outline-none`}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg transition-colors ${
                    darkMode
                      ? 'bg-primary-light text-white border border-gray-700 focus:border-accent'
                      : 'bg-gray-50 text-gray-900 border border-gray-300 focus:border-accent'
                  } outline-none`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FiEyeOff className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  ) : (
                    <FiEye className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                loading
                  ? 'bg-accent/70 cursor-not-allowed'
                  : 'bg-accent hover:bg-accent-dark'
              } text-white`}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <FiLogIn />
                  <span>Login</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className={`text-sm hover:text-accent transition-colors ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
