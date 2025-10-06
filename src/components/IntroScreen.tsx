import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  const [startTransition, setStartTransition] = useState(false);

  const handleTransitionComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Start logo animation immediately
    setShowLogo(true);
    
    // Show company name after logo sequence (2s fade in + 3s display)
    const companyNameTimer = setTimeout(() => {
      setShowCompanyName(true);
    }, 5000);
    
    // Show slogan after company name sequence (5s logo + 2s company name + 2s display)
    const sloganTimer = setTimeout(() => {
      setShowSlogan(true);
    }, 9000);
    
    // Start transition after slogan sequence (9s previous + 2s slogan + 2s display)
    const timer = setTimeout(() => {
      setStartTransition(true);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(companyNameTimer);
      clearTimeout(sloganTimer);
    };
  }, [onComplete]);

  const companyName = "PEAK MOVEMENT";
  const letters = companyName.split('');
  const slogan = "ACCESSIBLE AND AFFORDABLE HEALTH";

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      initial={{ scale: 1, opacity: 1 }}
      animate={startTransition ? { 
        scale: 0.8, 
        opacity: 0,
        filter: 'brightness(2)'
      } : { 
        scale: 1, 
        opacity: 1,
        filter: 'brightness(1)'
      }}
      transition={{ 
        duration: 1.5, 
        ease: "easeInOut" 
      }}
      onAnimationComplete={() => {
        if (startTransition) {
          handleTransitionComplete();
        }
      }}
    >
      {showLogo && !showCompanyName && (
        <motion.div
          initial={{ 
            opacity: 0, 
            scale: 0.8,
            filter: 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))'
          }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.3))'
          }}
          transition={{ 
            duration: 2,
            ease: "easeOut"
          }}
          className="flex items-center justify-center"
        >
          <img 
            src="/1-removebg-preview (2).png" 
            alt="Peak Movement Logo" 
            className="max-w-md max-h-md object-contain"
            style={{
              filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))'
            }}
          />
        </motion.div>
      )}
      
      {showCompanyName && !showSlogan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <div className="text-center">
            <div className="flex justify-center items-center whitespace-nowrap">
              {letters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ 
                    opacity: 0, 
                    y: 50,
                    scale: 0.8
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  className={`font-black text-white tracking-tighter ${
                    letter === ' ' ? 'mx-2 md:mx-4' : ''
                  }`}
                  style={{
                    fontSize: 'clamp(2rem, 8vw, 6rem)',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)',
                    fontWeight: 900
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {showSlogan && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <div className="text-center">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal text-white tracking-widest px-4"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
              }}
            >
              {slogan}
            </motion.h2>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}