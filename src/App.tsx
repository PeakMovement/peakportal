import { motion } from 'framer-motion';

function App() {
  const portals = [
    {
      title: "BUDDY",
      description: "Your AI companion for movement & wellness",
      emoji: "🤝",
      url: "https://buddyt.up.railway.app",
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "HIPPOCRATES",
      description: "Clinical knowledge & evidence-based insights",
      emoji: "🏛️",
      url: "https://rehabfinder.up.railway.app",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      title: "TRACKER",
      description: "Track and manage client progress",
      emoji: "📊",
      url: "https://clienttracker-production.up.railway.app",
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
        className="relative z-10 py-10 px-6"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight"
          >
            PEAK PORTAL
          </motion.h1>
        </div>
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
