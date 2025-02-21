'use client'
import { useEffect, useRef } from 'react'

const Komnata = () => {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (video) {
      video.playbackRate = 0.5
    }
  }, [])

  return (
    <video
      ref={ref}
      src="/eta_komnata_vid_1.mp4"
      className="object-cover h-full w-full"
      loop
      autoPlay
      playsInline
      muted
    ></video>
  )
}

export default Komnata
