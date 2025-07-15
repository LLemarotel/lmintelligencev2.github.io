import React from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-gray-400 text-sm">
            {t('footer.rights')}
          </p>
          
          {/* Trustpilot widget placeholder */}
          <div className="trustpilot-widget" data-locale="fr-FR">
            <a href="https://fr.trustpilot.com/review/lmintelligence.fr" 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-gray-400 hover:text-white"
            >
              Trustpilot
            </a>
          </div>
          
          <a href="/terms-of-service" 
             className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            {t('footer.terms')}
          </a>
          <div className="ml-4">
              <select 
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)} 
                className="bg-gray-800 text-white p-2 rounded"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="it">Italiano</option>
                <option value="ru">Русский</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
                <option value="ar">العربية</option>
              </select>
            </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer