'use client'
import { useEffect, useRef, useState } from 'react'

const Komnata = () => {
  const ref = useRef<HTMLVideoElement>(null)
  const [randomFx, setRandomFx] = useState('')

  useEffect(() => {
    const video = ref.current
    const newFx = getRandomFx()
    setRandomFx(newFx)
    if (video) {
      video.playbackRate = 0.5
    }
  }, [])

  return (
    <>
      <div className="bg-green-300 h-full w-full inset-0 absolute" />
      <video
        ref={ref}
        src="/eta_komnata_vid_1.mp4"
        className={`object-cover h-full w-full ${randomFx}`}
        onClick={() => setRandomFx(getRandomFx(randomFx))}
        preload="metadata"
        loop
        autoPlay
        playsInline
        muted
        // onLoadStart={() => setLoadedStart(true)}
      />
    </>
  )
}

const fxs = [
  'mix-blend-exclusion',
  'mix-blend-multiply',
  'mix-blend-darken',
  'mix-blend-hard-light',
]

const getRandomFx = (currentFx?: string) =>
  fxs.filter((fx) => fx !== currentFx)[
    Math.floor(Math.random() * (currentFx ? fxs.length - 1 : fxs.length))
  ]

export default Komnata
