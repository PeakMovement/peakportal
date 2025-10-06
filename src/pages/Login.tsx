import { useState } from 'react';
import { motion } from 'framer-motion';

const validUsers = [
  { name: 'Tayla Shipp', code: '#1221' },
  { name: 'Amit Maman', code: '#1222' },
  { name: 'Sergio Russouw', code: '#1223' },
  { name: 'Justin Muller', code: '#7874' },
  { name: 'Cilmie Genis', code: '#1224' },
];

interface LoginProps {
  onLoginSuccess: (user: { name: string; code: string }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [name, setName] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    
    const trimmedName = name.trim();
    const trimmedCode = accessCode.trim();
    
    // Find matching user (case-insensitive name comparison)
    const matchedUser = validUsers.find(user => 
      user.name.toLowerCase() === trimmedName.toLowerCase() && 
      user.code === trimmedCode
    );
    
    if (matchedUser) {
      // Add a small delay for smooth transition
      setTimeout(() => {
        onLoginSuccess(matchedUser);
      }, 300);
    } else {
      setIsLoggingIn(false);
      setError('Invalid name or code');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoggingIn ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="min-h-screen bg-white flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mb-12"
        >
          <img 
            src="/1-removebg-preview (2).png" 
            alt="Peak Movement Logo" 
            className="mx-auto max-w-48 max-h-48 object-contain"
          />
        </motion.div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          onSubmit={handleLogin}
          className="space-y-6"
        >
          {/* Name Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoggingIn}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium disabled:opacity-50"
            />
          </motion.div>

          {/* Access Code Input */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <input
              type="password"
              placeholder="Access Code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              disabled={isLoggingIn}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black font-medium disabled:opacity-50"
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* Login Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg tracking-wide hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            {isLoggingIn ? 'LOGGING IN...' : 'LOGIN'}
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
}