import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onLoadComplete, loadingProgress }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showMinimumTime, setShowMinimumTime] = useState(false);

  // Calculate real progress based on loaded assets
  useEffect(() => {
    if (!loadingProgress) return;
    
    const items = Object.values(loadingProgress);
    const loaded = items.filter(Boolean).length;
    const total = items.length || 1;
    const realProgress = (loaded / total) * 100;
    
    setProgress(realProgress);
  }, [loadingProgress]);

  // Ensure splash screen shows for minimum time for smooth experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMinimumTime(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Exit when loading is complete and minimum time has passed
  useEffect(() => {
    if (progress >= 100 && showMinimumTime && !isExiting) {
      setIsExiting(true);
      setTimeout(() => onLoadComplete(), 500);
    }
  }, [progress, showMinimumTime, isExiting, onLoadComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-50 to-white flex items-center justify-center overflow-hidden"
        >
          {/* Background Animation Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="text-center relative z-10">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-8xl">
                <motion.span 
                  style={{ 
                    color: '#000099',
                    fontFamily: "'Merriweather', serif",
                    fontWeight: 900
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  LM{' '}
                </motion.span>
                <motion.span 
                  style={{ 
                    color: '#111827',
                    fontFamily: "'Merriweather', serif",
                    fontWeight: 400
                  }}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Intelligence
                </motion.span>
              </h1>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "300px", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mx-auto"
            >
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#000099] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              
              {/* Loading Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-gray-600 text-sm tracking-widest uppercase"
              >
                Loading Experience
              </motion.p>
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 flex justify-center space-x-2"
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;