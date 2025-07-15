import React, { useState, useEffect } from 'react'
import { Menu, X, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const HERO_HEIGHT = 700        // adjust to your hero section height in px

const Header = () => {
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > HERO_HEIGHT)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const openQuoteModal = () =>
    window.dispatchEvent(new CustomEvent('openQuoteModal'))

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      let offset = 0;
      if (id === 'our-work') {
        const aboutElement = document.getElementById('about');
        if (aboutElement) {
          offset = aboutElement.offsetHeight;
        }
      }
      window.scrollTo({
        top: element.offsetTop + offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-500
        ${isScrolled ? 'opacity-20 hover:opacity-100' : 'opacity-100'}`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo – always visible */}
          <div className="flex items-center">
            <span className="text-2xl">
              <span className="text-[#000099] font-merriweather-black">LM </span>
              <span className="text-gray-900 dark:text-white font-merriweather-regular">
                Intelligence
              </span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={openQuoteModal}
              className={`flex items-center gap-2 text-sm font-medium transition
                ${
                  isScrolled
                    ? 'px-3 py-1.5 border border-primary/40 text-primary rounded-md hover:bg-primary/10'
                    : 'cta-button'
                }`}
            >
              <FileText size={16} />
              {t('freeQuote')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown – unchanged */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={openQuoteModal}
                className="block w-full text-left px-3 py-2 text-base font-medium bg-primary text-white rounded-md"
              >
                {t('freeQuote')}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full h-px bg-white/10" />
    </header>
  )
}

export default Header