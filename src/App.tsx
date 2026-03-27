import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import Login from './pages/Login';

// Session guard hook
const useSessionGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState<{ name: string; code: string } | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('currentUser');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentUser') {
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = (user: { name: string; code: string }) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, currentUser, login, logout };
};

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { isAuthenticated, currentUser, login, logout } = useSessionGuard();

  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated && currentUser) {
    return <Dashboard currentUser={currentUser} onLogout={logout} />;
  }

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return <Login onLoginSuccess={login} />;
}

interface DashboardProps {
  currentUser: { name: string; code: string };
  onLogout: () => void;
}

function Dashboard({ currentUser, onLogout }: DashboardProps) {
  const portals = [
    {
      title: "BUDDY",
      description: "Your AI companion for movement & wellness",
      emoji: "🤝",
      url: "#", // TODO: Connect your URL here
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "HIPPOCRATES",
      description: "Clinical knowledge & evidence-based insights",
      emoji: "🏛️",
      url: "#", // TODO: Connect your URL here
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "TRACKER",
      description: "Track and manage client progress",
      emoji: "📊",
      url: "#", // TODO: Connect your URL here
      color: "from-purple-500 to-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 py-10 px-6 flex justify-between items-center"
      >
        <div className="flex-1 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight"
          >
            PEAK PORTAL
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-500 mt-3 text-lg tracking-wide"
          >
            Welcome, {currentUser.name}
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={onLogout}
          className="absolute top-10 right-6 bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm tracking-wide hover:bg-red-700 transition-colors duration-200"
        >
          LOGOUT
        </motion.button>
      </motion.header>

      {/* Portal Cards */}
      <main className="flex-1 flex items-center justify-center px-6 pb-20">
        <div className="max-w-5xl w-full">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {portals.map((portal, index) => (
              <motion.a
                key={portal.title}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                }}
                whileTap={{ scale: 0.97 }}
                className="block bg-white rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer group"
              >
                <div className="flex items-center justify-center mb-6">
                  <span className="text-5xl">{portal.emoji}</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-3 tracking-wide text-center">
                  {portal.title}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed text-center mb-8">
                  {portal.description}
                </p>
                <div className="text-center">
                  <span
                    className={`inline-block bg-gradient-to-r ${portal.color} text-white px-8 py-3 rounded-lg font-bold tracking-wide shadow-md group-hover:shadow-lg transition-shadow duration-200`}
                  >
                    LAUNCH
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;