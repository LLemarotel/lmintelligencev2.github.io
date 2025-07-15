import { useEffect } from 'react'

const VideoPreloader = ({ videos = [], onProgress }) => {
  useEffect(() => {
    if (videos.length === 0) return

    let loadedCount = 0
    const totalVideos = videos.length

    videos.forEach((src) => {
      const video = document.createElement('video')
      video.src = src
      video.preload = 'auto'
      
      // Create a promise for each video
      const loadPromise = new Promise((resolve) => {
        video.addEventListener('canplaythrough', () => {
          loadedCount++
          if (onProgress) {
            onProgress(loadedCount / totalVideos)
          }
          resolve()
        }, { once: true })

        video.addEventListener('error', () => {
          console.warn(`Failed to preload video: ${src}`)
          loadedCount++
          if (onProgress) {
            onProgress(loadedCount / totalVideos)
          }
          resolve()
        }, { once: true })
      })

      // Start loading
      video.load()
    })
  }, [videos, onProgress])

  return null
}

export default VideoPreloader