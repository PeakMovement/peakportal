import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Calendar, Mic } from 'lucide-react';
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
          // Invalid JSON in localStorage, clear it
          localStorage.removeItem('currentUser');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., logout in another tab)
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

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If user is authenticated, skip intro and show dashboard
  if (isAuthenticated && currentUser) {
    return <Dashboard currentUser={currentUser} onLogout={logout} />;
  }

  // If not authenticated, show intro then login
  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  // Show login page
  return (
    <Login onLoginSuccess={login} />
  );
}

// Dashboard component extracted for better organization
interface DashboardProps {
  currentUser: { name: string; code: string };
  onLogout: () => void;
}

function Dashboard({ currentUser, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 py-12 px-6 flex justify-between items-center"
      >
        <div className="flex-1 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight"
          >
            WELCOME, {currentUser.name.toUpperCase()}
          </motion.h1>
        </div>
        
        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={onLogout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold text-sm tracking-wide hover:bg-red-700 transition-colors duration-200"
        >
          LOGOUT
        </motion.button>
      </motion.header>

      {/* Features Section */}
      <main className="relative z-10 px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: BookOpen,
                title: "SCHOLAR",
                description: "Clinical knowledge & learning",
                emoji: "📚",
                type: "active"
              },
              {
                icon: Calendar,
                title: "PLANNER",
                description: "Organize your schedules",
                emoji: "🗓️",
                type: "active"
              },
              {
                icon: Mic,
                title: "TRANSCRIBER",
                description: "Convert voice to reports",
                emoji: "🎤",
                type: "active"
              },
              {
                title: "CLIENT TRACKER",
                description: "Track and manage client progress",
                emoji: "👥",
                type: "active"
              },
              {
                title: "BLOG CREATOR",
                description: "Generate content for our brand",
                emoji: "✍️",
                type: "active"
              },
              {
                title: "GAIT AI",
                description: "Analyze gait with AI technology",
                emoji: "🚶",
                type: "active"
              },
              {
                title: "NUTRITION PLANNER",
                description: "Personalized meal and diet planning",
                emoji: "🥗",
                type: "active"
              },
              {
                title: "REHAB PRESCRIPTION",
                description: "Create and assign rehab programs",
                emoji: "🏥",
                type: "active"
              },
              {
                title: "COMING SOON",
                description: "New tools on the way",
                emoji: "🚀",
                type: "coming-soon"
              }
            ].map((feature, index) => (
              <motion.div
                key={`${feature.title}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-center mb-6">
                  <span className="text-4xl mb-2">{feature.emoji}</span>
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 tracking-wide text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed text-center mb-8">
                  {feature.description}
                </p>
                {feature.type === "coming-soon" ? (
                  <div className="text-center">
                    <div className="text-gray-400 px-8 py-3 rounded-lg font-bold tracking-wide">
                      COMING SOON
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <motion.button
                      whileHover={{ 
                        scale: 1.05,
                        backgroundColor: "#1E40AF"
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => console.log(`Launch ${feature.title} clicked`)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold tracking-wide hover:bg-blue-700 transition-all duration-200 shadow-md"
                    >
                      LAUNCH {feature.title}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;