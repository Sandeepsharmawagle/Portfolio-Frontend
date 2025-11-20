import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLogOut, FiMessageSquare, FiBarChart2, FiUser, FiRefreshCw, FiCheckCircle, FiClock, FiCheck } from 'react-icons/fi';

const AdminDashboard = ({ darkMode }) => {
  const [admin, setAdmin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');
    
    if (!token || !adminData) {
      navigate('/admin/login');
      return;
    }
    
    try {
      const parsedAdmin = JSON.parse(adminData);
      setAdmin(parsedAdmin);
      fetchMessages(token);
      fetchStats(token);
    } catch (err) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const fetchMessages = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setMessages(data.messages);
      } else {
        setError(data.message || 'Failed to fetch messages');
      }
    } catch (err) {
      setError('Network error while fetching messages');
      console.error('Fetch messages error:', err);
    }
  };

  const fetchStats = async (token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Fetch stats error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (messageId, status) => {
    const token = localStorage.getItem('adminToken');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Update local state
        setMessages(prev => 
          prev.map(msg => 
            msg._id === messageId ? { ...msg, status } : msg
          )
        );
        
        // Refresh stats
        fetchStats(token);
      }
    } catch (err) {
      console.error('Update message error:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'read': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'replied': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'unread': return <FiClock className="text-red-500" />;
      case 'read': return <FiCheck className="text-blue-500" />;
      case 'replied': return <FiCheckCircle className="text-green-500" />;
      default: return <FiClock />;
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-primary' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      darkMode ? 'bg-primary' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className={`border-b ${
        darkMode ? 'bg-primary-light border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <FiUser className="text-accent" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Welcome back, {admin?.name || 'Admin'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  fetchMessages(localStorage.getItem('adminToken'));
                  fetchStats(localStorage.getItem('adminToken'));
                }}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-200 text-gray-700'
                }`}
                title="Refresh"
              >
                <FiRefreshCw />
              </button>
              
              <button
                onClick={logout}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' 
                    : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                }`}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${
              darkMode ? 'glass-effect-dark' : 'bg-white shadow'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Messages</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <FiMessageSquare className="text-blue-500" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-6 rounded-xl ${
              darkMode ? 'glass-effect-dark' : 'bg-white shadow'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Unread</p>
                <p className="text-2xl font-bold text-red-500">{stats.unread}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <FiClock className="text-red-500" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`p-6 rounded-xl ${
              darkMode ? 'glass-effect-dark' : 'bg-white shadow'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Read</p>
                <p className="text-2xl font-bold text-blue-500">{stats.read}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                <FiCheck className="text-blue-500" size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`p-6 rounded-xl ${
              darkMode ? 'glass-effect-dark' : 'bg-white shadow'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Replied</p>
                <p className="text-2xl font-bold text-green-500">{stats.replied}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <FiCheckCircle className="text-green-500" size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Messages Section */}
        <div className={`rounded-xl overflow-hidden ${
          darkMode ? 'glass-effect-dark' : 'bg-white shadow'
        }`}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Contact Messages</h2>
              <div className="flex items-center space-x-2">
                <FiMessageSquare className="text-accent" />
                <span>{messages.length} messages</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-6">
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-500">
                {error}
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-primary-light' : 'bg-gray-50'}>
                <tr>
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-left p-4 font-semibold">Email</th>
                  <th className="text-left p-4 font-semibold">Subject</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-8 text-gray-500">
                      No messages found
                    </td>
                  </tr>
                ) : (
                  messages.map((message) => (
                    <motion.tr
                      key={message._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`border-t ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className="p-4">{message.name}</td>
                      <td className="p-4">{message.email}</td>
                      <td className="p-4 max-w-xs truncate">{message.subject}</td>
                      <td className="p-4">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(message.status)}`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(message.status)}
                            <span className="capitalize">{message.status}</span>
                          </div>
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          {message.status !== 'read' && (
                            <button
                              onClick={() => updateMessageStatus(message._id, 'read')}
                              className={`px-3 py-1 rounded text-xs font-medium ${
                                darkMode 
                                  ? 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30' 
                                  : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
                              }`}
                            >
                              Mark Read
                            </button>
                          )}
                          {message.status !== 'replied' && (
                            <button
                              onClick={() => updateMessageStatus(message._id, 'replied')}
                              className={`px-3 py-1 rounded text-xs font-medium ${
                                darkMode 
                                  ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
                                  : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                              }`}
                            >
                              Replied
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
