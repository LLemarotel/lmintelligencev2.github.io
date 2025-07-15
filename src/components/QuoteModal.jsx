import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bot, Layout, MailPlus, Instagram, Map, Film, ArrowLeft, Loader2 } from 'lucide-react'
import { submitForm } from '../utils/formSubmission'
import { useTranslation } from 'react-i18next'

const QuoteModal = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState([])
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true)
    window.addEventListener('openQuoteModal', handleOpenModal)
    return () => window.removeEventListener('openQuoteModal', handleOpenModal)
  }, [])

  const services = [
    { id: 'ia_automation', label: 'Automatisation IA', icon: <Bot /> },
    { id: 'site_web', label: 'Création de Site Web', icon: <Layout /> },
    { id: 'contact_form', label: 'Formulaire de Contact', icon: <MailPlus /> },
    { id: 'social_carousel', label: 'Carrousel Social', icon: <Instagram /> },
    { id: 'google_integration', label: 'Google Review/Map', icon: <Map /> },
    { id: 'media_section', label: 'Section Photo/Vidéo', icon: <Film /> }
  ]

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleNext = () => {
    if (selectedServices.length > 0) {
      setCurrentStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const response = await submitForm({
      ...formData,
      services_demandes: selectedServices.join(', '),
      access_key: '42024fd5-2386-419c-a362-590e276899e7',
      subject: 'Nouvelle Demande de Devis - Site LM Intelligence',
      from_name: 'LM Intelligence Notifier'
    })
    
    setResult(response)
    setIsSubmitting(false)
    
    if (response.success) {
      setTimeout(() => {
        setIsOpen(false)
        setCurrentStep(1)
        setSelectedServices([])
        setFormData({ nom: '', prenom: '', email: '', message: '' })
        setResult(null)
      }, 3000)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-[1001] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-6 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold font-serif">{t('quoteModal.title')}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={28} />
            </button>
          </div>

          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <div className={`step-indicator w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold ${
                  currentStep === 1 ? 'active' : 'border-gray-300 text-gray-400'
                }`}>
                  1
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep === 1 ? 'text-primary' : 'text-gray-400'
                }`}>
                  {t('quoteModal.step1')}
                </span>
              </div>
              <div className="w-16 h-0.5 bg-gray-200" />
              <div className="flex items-center">
                <div className={`step-indicator w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold ${
                  currentStep === 2 ? 'active' : 'border-gray-300 text-gray-400'
                }`}>
                  2
                </div>
                <span className={`ml-3 font-medium ${
                  currentStep === 2 ? 'text-primary' : 'text-gray-400'
                }`}>
                  {t('quoteModal.step2')}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {currentStep === 1 ? (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {t('quoteModal.serviceQuestion')}
                </h3>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                  {t('quoteModal.multipleChoice')}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {services.map(service => (
                    <label key={service.id} className="project-option relative cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="sr-only"
                      />
                      <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-primary transition h-full flex flex-col justify-center items-center">
                        <div className="text-primary mb-2">{service.icon}</div>
                        <span className="font-medium text-sm">{t(`quoteModal.services.${service.id}`)}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {selectedServices.length === 0 && (
                  <p className="text-red-500 text-sm mt-4 text-center">
                    {t('quoteModal.selectServiceError')}
                  </p>
                )}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={selectedServices.length === 0}
                    className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
                  >
                    {t('quoteModal.nextButton')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-6 text-center">{t('quoteModal.almostDone')}</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-medium mb-2">{t('quoteModal.form.lastName')} *</label>
                      <input
                        name="nom"
                        type="text"
                        required
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-2">{t('quoteModal.form.firstName')} *</label>
                      <input
                        name="prenom"
                        type="text"
                        required
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-2">{t('quoteModal.form.email')} *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-2">{t('quoteModal.form.message')}</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-800"
                      placeholder={t('quoteModal.form.messagePlaceholder')}
                    />
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-800 font-medium flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    {t('quoteModal.backButton')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        {t('quoteModal.sending')}
                      </>
                    ) : (
                      t('quoteModal.sendRequest')
                    )}
                  </button>
                </div>
                {result && (
                  <div className={`mt-4 text-center ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                    {result.success ? t('quoteModal.successMessage') : t('quoteModal.errorMessage')}
                  </div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default QuoteModal