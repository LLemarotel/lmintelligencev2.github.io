import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Rocket, MousePointerClick, TrendingUp, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const servicesRef = useRef(null);

  /* ----------  activeFeature is now driven by scroll  ---------- */
  const [activeFeature, setActiveFeature] = useState(null);

  // Global scroll progress for the services section
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ['start start', 'end end'],
  });

  /* ----------  background-color interpolation  ---------- */
  const serviceColors = [
    { r: 255, g: 255, b: 255 }, // white (initial)
    { r: 219, g: 234, b: 254 }, // blue-100
    { r: 220, g: 252, b: 231 }, // green-100
    { r: 243, g: 232, b: 255 }, // purple-100
    { r: 254, g: 226, b: 226 }, // red-100
  ];

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (!sectionRef.current) return;

      // Map 0 → 1  to  0 → (serviceColors.length-1)
      const rawIndex = latest * (serviceColors.length - 1);
      const index = Math.min(Math.floor(rawIndex), serviceColors.length - 2);
      const local = rawIndex - index;

      const c1 = serviceColors[index];
      const c2 = serviceColors[index + 1];

      const r = Math.round(c1.r + (c2.r - c1.r) * local);
      const g = Math.round(c1.g + (c2.g - c1.g) * local);
      const b = Math.round(c1.b + (c2.b - c1.b) * local);

      sectionRef.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      sectionRef.current.style.transition = 'background-color 0.3s ease';
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  /* ----------  auto-open on scroll  ---------- */
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const step = 1 / features.length;
      const nextIndex = Math.floor(latest / step);
      setActiveFeature(nextIndex >= 0 && nextIndex < features.length ? nextIndex : null);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-blue-600" />,
      title: t('about.services.one.title'),
      description: t('about.services.one.description'),
      color: 'blue',
      bgColor: 'rgb(219, 234, 254)',
      details: {
        title: t('about.services.one.details.title'),
        content: [
          t('about.services.one.details.content.one'),
          t('about.services.one.details.content.two'),
          t('about.services.one.details.content.three'),
        ],
        features: [t('about.services.one.details.features.one'), t('about.services.one.details.features.two'), t('about.services.one.details.features.three')],
      },
    },
    {
      icon: <MousePointerClick className="w-6 h-6 text-green-600" />,
      title: t('about.services.two.title'),
      description: t('about.services.two.description'),
      color: 'green',
      bgColor: 'rgb(220, 252, 231)',
      details: {
        title: t('about.services.two.details.title'),
        content: [
          t('about.services.two.details.content.one'),
          t('about.services.two.details.content.two'),
          t('about.services.two.details.content.three'),
        ],
        features: [t('about.services.two.details.features.one'), t('about.services.two.details.features.two'), t('about.services.two.details.features.three')],
      },
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      title: t('about.services.three.title'),
      description: t('about.services.three.description'),
      color: 'purple',
      bgColor: 'rgb(243, 232, 255)',
      details: {
        title: t('about.services.three.details.title'),
        content: [
          t('about.services.three.details.content.one'),
          t('about.services.three.details.content.two'),
          t('about.services.three.details.content.three'),
        ],
        features: [t('about.services.three.details.features.one'), t('about.services.three.details.features.two'), t('about.services.three.details.features.three')],
      },
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-red-600" />,
      title: t('about.services.four.title'),
      description: t('about.services.four.description'),
      color: 'red',
      bgColor: 'rgb(254, 226, 226)',
      details: {
        title: t('about.services.four.details.title'),
        content: [
          t('about.services.four.details.content.one'),
          t('about.services.four.details.content.two'),
          t('about.services.four.details.content.three'),
        ],
        features: [t('about.services.four.details.features.one'), t('about.services.four.details.features.two'), t('about.services.four.details.features.three')],
      },
    },
  ];

  const founders = [
    {
      name: 'Luca',
      role: t('about.founders.luca.role'),
      education: t('about.founders.luca.education'),
      description: t('about.founders.luca.description'),
      image: 'luca.png',
    },
    {
      name: 'Mathieu',
      role: t('about.founders.mathieu.role'),
      education: t('about.founders.mathieu.education'),
      description: t('about.founders.mathieu.description'),
      image: 'mathieu.jpeg',
    },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founders Section — always on white */}
        <div className="mb-32">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            {t('about.founders.title')}
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6"
              >
                <img
                  className="w-32 h-32 rounded-full flex-shrink-0 object-cover shadow-lg"
                  src={founder.image}
                  alt={founder.name}
                />
                <div>
                  <h4 className="text-2xl font-bold font-serif">{founder.name}</h4>
                  <p className="text-primary font-semibold mb-1">{founder.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{founder.education}</p>
                  <p className="text-gray-600 dark:text-gray-300">{founder.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Services Section — sticky reveal + auto-open */}
        <div ref={servicesRef} className="min-h-[400vh] md:min-h-[300vh]">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-center mb-16"
          >
            {t('about.services.title')}
          </motion.h3>

          <div className="relative">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="sticky top-0 flex items-center justify-center min-h-screen py-20"
              >
                <motion.div
                  style={{
                    scale: useTransform(
                      scrollYProgress,
                      [
                        (index - 0.3) / features.length,
                        index / features.length,
                        (index + 0.7) / features.length,
                        (index + 1) / features.length,
                      ],
                      [0.9, 1, 1, 0.9]
                    ),
                    opacity: useTransform(
                      scrollYProgress,
                      [
                        (index - 0.2) / features.length,
                        index / features.length,
                        (index + 0.8) / features.length,
                        (index + 1) / features.length,
                      ],
                      [0, 1, 1, 0]
                    ),
                  }}
                  className="w-full max-w-4xl"
                >
                  <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <motion.div
                            className={`flex-shrink-0 bg-${feature.color}-100 dark:bg-${feature.color}-900/20 rounded-lg p-4 mr-6`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            {feature.icon}
                          </motion.div>
                          <div>
                            <h4 className="font-bold text-2xl mb-2">{feature.title}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeFeature === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="border-t dark:border-gray-700"
                        >
                          <div className="p-10 bg-gray-50/50 dark:bg-gray-900/50">
                            <h5 className="text-2xl font-bold mb-6">{feature.details.title}</h5>
                            <div className="space-y-4 mb-8">
                              {feature.details.content.map((p, i) => (
                                <p key={i} className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                  {p}
                                </p>
                              ))}
                            </div>
                            <div className="grid sm:grid-cols-3 gap-6">
                              {feature.details.features.map((item, i) => (
                                <div
                                  key={i}
                                  className={`bg-${feature.color}-50 dark:bg-${feature.color}-900/20 rounded-xl p-6 text-center shadow-md`}
                                >
                                  <p className={`text-${feature.color}-800 dark:text-${feature.color}-200 font-semibold text-lg`}>
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;