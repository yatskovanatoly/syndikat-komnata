'use client'

import { useEffect, useRef, useState } from 'react'
import { fetchMedia } from '../lib/fetchMedia'

const Komnata = () => {
  const ref = useRef<HTMLVideoElement>(null)
  const [randomFx, setRandomFx] = useState<string | undefined>(undefined)
  const [src, setSrc] = useState(undefined)

  useEffect(() => {
    fetchMedia(setSrc)
  }, [])

  useEffect(() => {
    const video = ref.current
    if (video && src) {
      video.playbackRate = 0.5
    }
  }, [src])

  return (
    <>
      {randomFx && (
        <div className="bg-green-300 h-full w-full inset-0 absolute" />
      )}
      <video
        ref={ref}
        src={src}
        className={`object-cover h-full w-full ${randomFx}`}
        onClick={() => randomFx && setRandomFx(getRandomFx(randomFx))}
        preload="metadata"
        loop
        autoPlay
        playsInline
        muted
        onLoadedData={() => setRandomFx(getRandomFx())}
      />
    </>
  )
}

const fxs = ['mix-blend-multiply', 'mix-blend-darken', 'mix-blend-hard-light']

const getRandomFx = (currentFx?: string) =>
  fxs.filter((fx) => fx !== currentFx)[
    Math.floor(Math.random() * (currentFx ? fxs.length - 1 : fxs.length))
  ]

export default Komnata
