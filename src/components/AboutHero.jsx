import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

const AboutHero = () => {
  const { ref, isInView } = useScrollAnimation();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* TEXT BLOCK */}
      <div className="max-w-full px-4 sm:px-6 lg:px-8 lg:w-1/2">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('aboutHero.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {t('aboutHero.description')}
          </p>
        </motion.div>
      </div>

      {/* VIDEO BLOCK */}
      {/* Desktop: absolute half-width panel on the right */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
        <video
          src={import.meta.env.BASE_URL + "LM Intelligence presentation video.mp4"}
          className="w-full h-full object-cover"
          loop
          muted
          autoPlay
          playsInline
        />
      </div>

      {/* Mobile/Tablet: video underneath the text, full-width, aspect-video */}
      <div className="lg:hidden mt-10">
        <video
          src={import.meta.env.BASE_URL + "LM Intelligence presentation video.mp4"}
          className="w-full aspect-video object-cover"
          loop
          muted
          autoPlay
          playsInline
        />
      </div>
    </section>
  )
}

export default AboutHero