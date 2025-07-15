// hooks/useScrollAnimation.js
import { useRef, useEffect, useState } from 'react'

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  // ensure the threshold is always a finite number
  const safeThreshold = Number.isFinite(threshold) ? threshold : 0.1

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: safeThreshold }
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [safeThreshold])

  return { ref, isInView }
}