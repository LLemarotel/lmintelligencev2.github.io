import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Ourwork from './components/Ourwork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutHero from './components/AboutHero';
import CookieConsent from './components/CookieConsent';
import QuoteModal from './components/QuoteModal';
import SplashScreen from './components/SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState({
    fonts: false,
    videos: false,
    threejs: false,
    images: false,
  });

  useEffect(() => {
    const loadAssets = async () => {
      const criticalAssets = {
        videos: [
          import.meta.env.BASE_URL + 'hero video.mp4',
          import.meta.env.BASE_URL + 'LM Intelligence presentation video.mp4',
          import.meta.env.BASE_URL + 'caroussel restaurant.mp4',
          import.meta.env.BASE_URL + 'caroussel clim.m.mp4',
          import.meta.env.BASE_URL + 'caroussel pizza.mov.mp4',
          import.meta.env.BASE_URL + 'caroussel miroir.mov.mp4',
          '/caroussel-tatoo.mp4',
        ],
        images: ['/luca.png', '/mathieu.jpeg'],
      };

      const videoPromises = criticalAssets.videos.map((src) => {
        return new Promise((resolve) => {
          const video = document.createElement('video');
          video.src = src;
          video.load();
          video.onloadeddata = () => resolve();
          video.onerror = () => resolve();
        });
      });

      const imagePromises = criticalAssets.images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      });

      const fontPromise = document.fonts.ready;

      // THREE.JS PROMISE – race between event & 2 s timer
      const threePromise = Promise.race([
        new Promise((resolve) => {
          window.addEventListener('three-scene-ready', resolve, { once: true });
        }),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      await Promise.all([
        Promise.all(videoPromises).then(() =>
          setLoadingProgress((p) => ({ ...p, videos: true }))
        ),
        Promise.all(imagePromises).then(() =>
          setLoadingProgress((p) => ({ ...p, images: true }))
        ),
        fontPromise.then(() => setLoadingProgress((p) => ({ ...p, fonts: true }))),
        threePromise.then(() => setLoadingProgress((p) => ({ ...p, threejs: true }))),
      ]);

      setTimeout(() => setIsLoading(false), 500);
    };

    loadAssets();
  }, []);

  const handleLoadComplete = () => setIsLoading(false);

  return (
    <>
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <div className="min-h-screen bg-white text-gray-900">
          <Header />
          <main>
            <Hero />
            <AboutHero />
            <About />
            <Ourwork />
            <Contact />
          </main>
          <Footer />
          <CookieConsent />
          <QuoteModal />
        </div>
      </div>
      {isLoading && (
        <SplashScreen
          onLoadComplete={handleLoadComplete}
          loadingProgress={loadingProgress}
        />
      )}
    </>
  );
}

export default App;