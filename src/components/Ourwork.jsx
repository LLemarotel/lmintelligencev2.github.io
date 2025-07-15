import React, { useRef, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const OurWork = () => {
  const { t } = useTranslation()
  const projects = [
    {
      title: "Le Goût Divin",
      mockup: "/caroussel restaurant.mp4",
    preview: "/caroussel restaurant.mp4",
      link: "https://lmintelligence.fr/maquettes/restaurant/",
      mediaType: "video"
    },
    {
      title: "Climacool",
      mockup: "/caroussel clim.m.mp4",
    preview: "/caroussel clim.m.mp4",
      link: "https://lmintelligence.fr/maquettes/clim/",
      mediaType: "video"
    },
    {
      title: "Pizza Che Vuoi",
      mockup: "/caroussel pizza.mov.mp4",
    preview: "/caroussel pizza.mov.mp4",
      link: "https://lmintelligence.fr/maquettes/pizza/",
      mediaType: "video"
    },
    {
      title: "Express Vitre",
      mockup: "/caroussel miroir.mov.mp4",
    preview: "/caroussel miroir.mov.mp4",
      link: "https://lmintelligence.fr/maquettes/miroir/",
      mediaType: "video"
    },
    {
      title: "Encre Noire",
      mockup: import.meta.env.BASE_URL + "caroussel-tatoo.mp4",
      preview: import.meta.env.BASE_URL + "caroussel-tatoo.mp4",
      link: "https://lmintelligence.fr/maquettes/tatoo/",
      mediaType: "video"
    }
  ]

  // Quadruple projects for even better buffer
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects];
  
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);
  const dragStartX = useRef(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize position based on actual item width
  useEffect(() => {
    if (!isInitialized && trackRef.current) {
      const item = trackRef.current.querySelector('.carousel-item');
      if (item) {
        const itemWidth = item.offsetWidth;
        const oneSetWidth = itemWidth * projects.length;
        // Start at the beginning of the second set
        setCurrentX(-oneSetWidth);
        setIsInitialized(true);
      }
    }
  }, [projects.length, isInitialized]);

  // Auto-scroll animation using requestAnimationFrame
  useEffect(() => {
    let lastTime = Date.now();
    const speed = 0.05; // Pixels per millisecond (adjust for speed)
    
    const animate = () => {
      if (!isDragging && !isPaused && trackRef.current && isInitialized) {
        const item = trackRef.current.querySelector('.carousel-item');
        // Wait for item to be available before calculating widths
        if (!item) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }

        const itemWidth = item.offsetWidth;
        const oneSetWidth = itemWidth * projects.length;
        
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        let newX = currentX - (speed * deltaTime);
        
        // Normalize position for seamless looping
        while (newX < -oneSetWidth * 3) {
          newX += oneSetWidth;
        }
        while (newX > -oneSetWidth * 0.5) {
          newX -= oneSetWidth;
        }
        
        if (newX <= -oneSetWidth * 2 && newX > -oneSetWidth * 2.1) {
          newX += oneSetWidth;
        }
        
        setCurrentX(newX);
        trackRef.current.style.transform = `translateX(${newX}px)`;
      } else {
        lastTime = Date.now(); // Reset time when paused
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentX, isDragging, isPaused, projects.length, isInitialized]);

  // Handle mouse/touch down
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    setHasDragged(false);
    const pageX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
    setStartX(pageX);
    dragStartX.current = currentX;
  };

  // Handle mouse/touch move
  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    
    e.preventDefault();
    const pageX = e.type.includes('touch') ? e.touches[0].pageX : e.pageX;
    const diff = pageX - startX;
    
    if (Math.abs(diff) > 5) {
      setHasDragged(true);
    }
    
    const newX = dragStartX.current + diff;
    setCurrentX(newX);
    trackRef.current.style.transform = `translateX(${newX}px)`;
  };

  // Handle mouse/touch up
  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (hasDragged) {
      setTimeout(() => {
        setHasDragged(false);
      }, 100);
    }
  };

  // Handle mouse enter/leave for pause on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Prevent link clicks during/after drag
  const handleLinkClick = (e) => {
    if (isDragging || hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  };

  // Global mouse up listener
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, hasDragged, currentX]);

  return (
    <section id="our-work" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('ourWork.title')}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('ourWork.description')}
          </p>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative carousel-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div 
          ref={trackRef}
          className="carousel-track-js"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            display: 'flex',
            width: 'auto'
          }}
        >
          {duplicatedProjects.map((project, index) => (
            <div
              key={index}
              className="group rounded-xl overflow-hidden text-left flex-shrink-0 carousel-item bg-white w-[80vw] sm:w-[40vw] md:w-[30vw] lg:w-[25vw]"
              draggable="false"
            >
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                draggable="false"
                style={{ display: 'block' }}
              >
                <div className="relative overflow-hidden" style={{paddingBottom: '100%'}}>
                  {project.mediaType === "video" ? (
                    <video
                      src={project.mockup}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      loop
                      muted
                      autoPlay
                      playsInline
                      draggable="false"
                      style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                    />
                  ) : (
                    <img
                      src={project.mockup}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                      draggable="false"
                      style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                    />
                  )}
                  {project.mediaType === "video" ? (
                    <video
                      src={project.preview}
                      alt={`${project.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      loop
                      muted
                      autoPlay
                      playsInline
                      draggable="false"
                      style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                    />
                  ) : (
                    <img
                      src={project.preview}
                      alt={`${project.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      draggable="false"
                      style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
                    />
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="text-white font-semibold text-center px-4 text-sm">
                      {t('ourWork.clickToView')}
                    </span>
                  </div>
                </div>
              </a>
              <div className="carousel-caption p-4" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
                <h3 className="font-bold text-lg mb-1">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OurWork