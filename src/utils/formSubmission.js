export const submitForm = async (formData) => {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: data.message || 'Message envoyé avec succès !'
      }
    } else {
      return {
        success: false,
        message: data.message || 'Une erreur est survenue.'
      }
    }
  } catch (error) {
    console.error('Form submission error:', error)
    return {
      success: false,
      message: 'Une erreur est survenue. Veuillez réessayer.'
    }
  }
}