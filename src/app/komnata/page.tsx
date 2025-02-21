'use client'
import { useEffect, useRef, useState } from 'react'

const Komnata = () => {
  const ref = useRef<HTMLVideoElement>(null)
  const [randomFx, setRandomFx] = useState('')

  useEffect(() => {
    const video = ref.current
    if (video) {
      setRandomFx(getRandomFx())
      video.playbackRate = 0.5
    }
  }, [])

  return (
    <>
      <div className="bg-green-300 h-wull w-full inset-0 fixed" />
      <video
        ref={ref}
        src="/eta_komnata_vid_1.mp4"
        className={`object-cover h-full w-full ${randomFx}`}
        onClick={() => setRandomFx(getRandomFx(randomFx))}
        poster="/2025-02-13 19.06.42.jpg"
        loop
        autoPlay
        playsInline
        muted
      />
    </>
  )
}

const fxs = [
  'mix-blend-exclusion',
  'mix-blend-multiply',
  'mix-blend-darken',
  'mix-blend-hard-light',
  'mix-blend-overlay',
]

const getRandomFx = (currentFx?: string) =>
  fxs.filter((fx) => fx !== currentFx)[
    Math.floor(Math.random() * (currentFx ? fxs.length - 1 : fxs.length))
  ]

export default Komnata
