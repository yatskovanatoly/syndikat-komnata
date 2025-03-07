'use client'

import { useEffect, useRef, useState } from 'react'

const Komnata = () => {
  const ref = useRef<HTMLVideoElement>(null)
  const [src, setSrc] = useState<string | undefined>(undefined)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setSrc(getRandomVideoSrc(src))
  }, [])

  useEffect(() => {
    const video = ref.current
    if (video && src) {
      video.playbackRate = 0.5
    }
  }, [src])

  const onEnded = () => {
    setLoaded(false)
    setSrc(getRandomVideoSrc(src))
  }

  return (
    <>
      {loaded && (
        <div className="bg-green-300 h-full w-full inset-0 absolute" />
      )}
      <video
        ref={ref}
        src={src}
        className={`object-cover h-full w-full mix-blend-multiply`}
        onClick={onEnded}
        onPlay={() => setLoaded(true)}
        onEnded={onEnded}
        preload="metadata"
        autoPlay
        playsInline
        muted
      />
    </>
  )
}

const getRandomVideoSrc = (prev: string | undefined) => {
  const next = `/eta_komnata_vid_${Math.floor(Math.random() * 10 + 1)}.mp4`
  if (prev === next) return getRandomVideoSrc(prev)
  return next
}

export default Komnata
