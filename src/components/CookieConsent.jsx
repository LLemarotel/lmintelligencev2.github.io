import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getCookie, setCookie } from '../utils/cookieUtils'
import { useTranslation } from 'react-i18next'

const CookieConsent = () => {
  const { t } = useTranslation()
  const [showBanner, setShowBanner] = useState(false)
  const COOKIE_NAME = 'lm_intelligence_cookie_consent'

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME)
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1500)
    }
  }, [])

  const handleAccept = () => {
    setCookie(COOKIE_NAME, 'accepted', 365)
    setShowBanner(false)
  }

  const handleDecline = () => {
    setCookie(COOKIE_NAME, 'declined', 365)
    setShowBanner(false)
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-[1000]"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="mb-2 md:mb-0 md:mr-4 text-center md:text-left">
              <p>
                {t('cookieConsent.text')}
                <a href="/privacy-policy" className="underline hover:text-gray-300">
                  {t('cookieConsent.privacyPolicy')}
                </a>.
              </p>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
              <button
                onClick={handleAccept}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded transition"
              >
                {t('cookieConsent.accept')}
              </button>
              <button
                onClick={handleDecline}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
              >
                {t('cookieConsent.decline')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent