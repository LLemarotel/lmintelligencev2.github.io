// hooks/useScrollColorInterpolation.js
import { useEffect } from 'react'
import { useScroll } from 'framer-motion'

// Helper function to interpolate between colors
function interpolateColor(color1, color2, factor) {
  const r = Math.round(color1.r + (color2.r - color1.r) * factor)
  const g = Math.round(color1.g + (color2.g - color1.g) * factor)
  const b = Math.round(color1.b + (color2.b - color1.b) * factor)
  return `rgb(${r}, ${g}, ${b})`
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  hex = hex.replace('#', '')
  const bigint = parseInt(hex, 16)
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  }
}

export const useScrollColorInterpolation = (
  targetRef,
  colorStops = [
    { color: '#f9fafb', position: 0 },    // gray-50
    { color: '#e5e7eb', position: 0.5 },  // gray-200
    { color: '#d1d5db', position: 1 }     // gray-300
  ],
  options = {}
) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: options.offset || ["start start", "end end"],
    ...options
  })

  useEffect(() => {
    if (!targetRef.current) return

    const unsubscribe = scrollYProgress.onChange((latest) => {
      // Convert color stops to RGB if they're hex
      const rgbStops = colorStops.map(stop => ({
        color: typeof stop.color === 'string' && stop.color.startsWith('#') 
          ? hexToRgb(stop.color) 
          : stop.color,
        position: stop.position
      }))

      // Find which two color stops we're between
      let fromStop = rgbStops[0]
      let toStop = rgbStops[rgbStops.length - 1]

      for (let i = 0; i < rgbStops.length - 1; i++) {
        if (latest >= rgbStops[i].position && latest <= rgbStops[i + 1].position) {
          fromStop = rgbStops[i]
          toStop = rgbStops[i + 1]
          break
        }
      }

      // Calculate local progress between the two stops
      const localProgress = (latest - fromStop.position) / (toStop.position - fromStop.position)
      const clampedProgress = Math.max(0, Math.min(1, localProgress))

      // Interpolate between the two colors
      const interpolatedColor = interpolateColor(fromStop.color, toStop.color, clampedProgress)

      // Apply the color
      if (options.property === 'color') {
        targetRef.current.style.color = interpolatedColor
      } else {
        targetRef.current.style.backgroundColor = interpolatedColor
      }

      // Apply transition for smoothness
      targetRef.current.style.transition = 'background-color 0.2s ease, color 0.2s ease'
    })

    return () => unsubscribe()
  }, [scrollYProgress, colorStops, targetRef, options])

  return scrollYProgress
}

// Multi-color example with more stops
export const useRainbowScrollEffect = (targetRef, options = {}) => {
  return useScrollColorInterpolation(
    targetRef,
    [
      { color: '#3b82f6', position: 0 },      // blue-500
      { color: '#8b5cf6', position: 0.2 },    // violet-500
      { color: '#ec4899', position: 0.4 },    // pink-500
      { color: '#f97316', position: 0.6 },    // orange-500
      { color: '#eab308', position: 0.8 },    // yellow-500
      { color: '#22c55e', position: 1 }       // green-500
    ],
    options
  )
}