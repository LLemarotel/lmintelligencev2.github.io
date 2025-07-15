import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ThreeBackground from './ThreeBackground';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const openQuoteModal = () => {
    window.dispatchEvent(new CustomEvent('openQuoteModal'));
  };

  // State to track device type
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    // Check device type on mount and resize
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1024) {
        setDeviceType('ipad');
      } else {
        setDeviceType('desktop');
      }
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Opacity for the background - start at 1 to ensure it's visible
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  // Black overlay opacity for mobile/iPad - transitions from transparent to black
  const blackOverlayOpacity = useTransform(
    scrollYProgress, 
    [0, 0.8, 1], 
    deviceType !== 'desktop' ? [0, 0.8, 1] : [0, 0, 0]
  );

  // Animate text opacity to fade it out on scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Animate text position to move it out of view
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Conditional transforms based on device type
  const videoScale = useTransform(
    scrollYProgress, 
    [0, 1], 
    deviceType === 'desktop' ? [1, 1.5] : [1, 1] // No scaling on mobile/iPad
  );

  // Horizontal movement
  const videoX = useTransform(
    scrollYProgress, 
    [0, 1], 
    deviceType === 'desktop' ? ['0%', '-50%'] : ['0%', '0%'] // No horizontal movement on mobile/iPad
  );

  // Vertical movement
  const videoY = useTransform(
    scrollYProgress,
    [0, 1],
    deviceType === 'mobile' ? ['0%', '-40%'] : ['0%', '0%'] // Only mobile moves up
  );

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <section id="hero" className="sticky top-0 min-h-screen flex items-center overflow-hidden">
        <ThreeBackground 
          scrollYProgress={scrollYProgress} 
          opacity={backgroundOpacity} 
          isMobile={deviceType !== 'desktop'}
        />
        {/* Black overlay for mobile/iPad */}
        <motion.div
          style={{ opacity: blackOverlayOpacity }}
          className="absolute inset-0 bg-black z-[5] pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className={`
            ${deviceType === 'ipad' 
              ? 'flex flex-col items-center' 
              : 'grid md:grid-cols-2 gap-8 md:gap-16 items-center'}
          `}>
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`
                ${deviceType === 'ipad' 
                  ? 'text-center mb-12 w-full' 
                  : 'text-center md:text-left'}
              `}
            >
              <h1 className={`
                ${deviceType === 'mobile' 
                  ? 'text-4xl sm:text-5xl' 
                  : deviceType === 'ipad'
                  ? 'text-5xl md:text-6xl'
                  : 'text-4xl sm:text-5xl md:text-7xl'} 
                mb-6 md:mb-8 leading-tight font-light
              `}>
                {t('hero.title')}
              </h1>
              <button
                onClick={openQuoteModal}
                className="cta-button-hero"
              >
                {t('hero.button')}
              </button>
            </motion.div>
            <motion.div
              style={{ 
                scale: videoScale, 
                x: videoX,
                y: videoY,
                transformOrigin: 'center center'
              }}
              className={`
                relative w-full rounded-lg overflow-hidden shadow-xl
                ${deviceType === 'ipad' 
                  ? 'max-w-2xl pt-[56.25%]' 
                  : 'pt-[56.25%]'}
                ${deviceType === 'mobile' ? 'mt-8 md:mt-0' : ''}
              `}
            >
              <video
                src={import.meta.env.BASE_URL + "hero video.mp4"}
                className="absolute top-0 left-0 w-full h-full object-cover"
                loop
                muted
                autoPlay
                playsInline
                preload="auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;