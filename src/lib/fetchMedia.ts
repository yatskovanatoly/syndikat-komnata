export const fetchMedia = async (handleMedia: (url?: any) => void) => {
  try {
    const res = await fetch('/api/dropbox')
    const data = await res.json()

    if (!Array.isArray(data) || data.length === 0) {
      console.warn('No media files available')
      return
    }

    const prevRandom = Number(localStorage.getItem('prevRandomMediaIndex'))
    let randomMedia: number

    if (data.length === 1) {
      randomMedia = 0
    } else {
      do {
        randomMedia = Math.floor(Math.random() * data.length)
      } while (randomMedia === prevRandom)
    }

    handleMedia(data[randomMedia]?.link)
    localStorage.setItem('prevRandomMediaIndex', randomMedia.toString())
  } catch (error) {
    console.error('Error fetching media:', error)
  }
}
