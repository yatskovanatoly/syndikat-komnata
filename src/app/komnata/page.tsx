'use client'
import { useEffect, useRef, useState } from 'react'

const Komnata = () => {
  const ref = useRef<HTMLVideoElement>(null)
  const [randomFx, setRandomFx] = useState('')

  useEffect(() => {
    const video = ref.current
    setRandomFx(getRandomFx())
    if (video) {
      video.playbackRate = 0.5
    }
  }, [])

  if (!randomFx) return null
  return (
    <>
      <div className="bg-green-300 h-full w-full inset-0 fixed" />
      <video
        ref={ref}
        src="/eta_komnata_vid_1.mp4"
        className={`object-cover h-full w-full ${randomFx}`}
        onClick={() => setRandomFx(getRandomFx(randomFx))}
        preload='metadata'
        loop
        autoPlay
        playsInline
        muted
        onLoadedData={() => console.log('awdaw')}
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
