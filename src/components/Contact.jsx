import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const sentence = t('contact.sentence');
  const words = sentence.split(' ');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.3', 'end 0.7'],
  });

  // Transform scroll progress to word reveal count
  const revealed = useTransform(scrollYProgress, [0, 1], [0, words.length + 2]);

  return (
    <section ref={containerRef} id="contact" className="relative bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SCROLL AREA FOR ANIMATION */}
        <div className="h-[300vh] pt-20">
          {/* STICKY CONTENT */}
          <div className="sticky top-32">
            {/* HEADLINE – centred and sticky */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-2">{t('contact.title')}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {t('contact.description')}
              </p>
            </motion.div>

            <div className="flex justify-start">
              <div className="max-w-lg">
            {/* WORD-BY-WORD REVEAL */}
            <div className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-gray-100">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  initial={{ 
                    opacity: 0, 
                    y: 30,
                    filter: "blur(10px)"
                  }}
                  style={{
                    opacity: useTransform(revealed, (latest) => {
                      return latest > i ? 1 : 0;
                    }),
                    y: useTransform(revealed, (latest) => {
                      return latest > i ? 0 : 30;
                    }),
                    filter: useTransform(revealed, (latest) => {
                      return latest > i ? "blur(0px)" : "blur(10px)";
                    }),
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* CONTACT DETAILS - Appears after all words */}
            <motion.div
              className="mt-10 text-2xl md:text-3xl font-medium text-gray-900 dark:text-gray-100"
              initial={{ 
                opacity: 0, 
                y: 40,
                filter: "blur(10px)"
              }}
              style={{
                opacity: useTransform(revealed, (latest) => {
                  return latest > words.length ? 1 : 0;
                }),
                y: useTransform(revealed, (latest) => {
                  return latest > words.length ? 0 : 40;
                }),
                filter: useTransform(revealed, (latest) => {
                  return latest > words.length ? "blur(0px)" : "blur(10px)";
                }),
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
            >
              <div className="space-y-2">
                <div>
                  <a href="tel:+33781848311" className="hover:text-primary transition-colors duration-200">
                    +33 7 81 84 83 11
                  </a>{' '}
                  (Luca)
                </div>
                <div>
                  <a href="tel:+33652022750" className="hover:text-primary transition-colors duration-200">
                    +33 6 52 02 27 50
                  </a>{' '}
                  (Mathieu)
                </div>
                <div>
                  <a href="mailto:contact@lmintelligence.fr" className="hover:text-primary transition-colors duration-200">
                    contact@lmintelligence.fr
                  </a>
                </div>
              </div>
            </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* BOTTOM PADDING */}
      <div className="pb-20"></div>
    </section>
  );
};

export default Contact;