'use client'

import { ObjectList } from 'aws-sdk/clients/s3'
import { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [current, setCurrent] = useState<VideoItem | null>(null)
  const [next, setNext] = useState<VideoItem | null>(null)
  const [activeIndex, setActiveIndex] = useState<0 | 1>(0)
  const [visible, setVisible] = useState(false)

  const videoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([
    null,
    null,
  ])

  useEffect(() => {
    fetch('/api/aws-s3')
      .then((res) => res.json())
      .then((data: VideoItem[]) => {
        if (!Array.isArray(data) || data.length === 0) return
        const first = pickRandom(data, null)
        const second = pickRandom(data, first?.Key)
        setVideos(data)
        setCurrent(first)
        setNext(second)
      })
  }, [])

  useEffect(() => {
    const currentRef = videoRefs.current[activeIndex]
    if (currentRef) {
      currentRef.playbackRate = 0.5
      currentRef.play()
    }
  }, [current])

  const handleVideoEnd = () => {
    if (!current || !next || videos.length < 1) return

    const hiddenIndex = activeIndex
    const visibleIndex = activeIndex === 0 ? 1 : 0

    setCurrent(next)
    setActiveIndex(visibleIndex)
    const upcoming = pickRandom(videos, next.Key)
    setNext(upcoming)

    const hiddenRef = videoRefs.current[hiddenIndex]
    if (hiddenRef) {
      if (upcoming) {
        hiddenRef.src = `https://${HOST}/${upcoming.Key}`
        hiddenRef.load()
        hiddenRef.playbackRate = 0.5
      }
    }
  }

  const handleVisibilityChange = () =>
    setVisible(document.visibilityState === 'visible')

  useEffect(() => {
    window.addEventListener('visibilitychange', handleVisibilityChange)

    return () =>
      window.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return (
    <div className="relative w-full h-full">
      {visible && <div className="bg-green-300 absolute inset-0" />}
      {[0, 1].map((i) => {
        if (!current || !next) return null
        const key = i === activeIndex ? current.Key : next.Key
        return (
          <video
            key={i}
            ref={(el) => {
              videoRefs.current[i] = el
            }}
            className={`absolute inset-0 w-full h-full object-cover mix-blend-multiply brightness-150 contrast-75 ${
              i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            src={`https://${HOST}/${key}`}
            muted
            playsInline
            onPlaying={handleVisibilityChange}
            onClick={handleVideoEnd}
            onEnded={handleVideoEnd}
          />
        )
      })}
    </div>
  )
}

const pickRandom = (
  list: VideoItem[],
  excludeKey?: string | null
): VideoItem => {
  if (list.length === 1) return list[0]

  let selected: VideoItem
  do {
    selected = list[Math.floor(Math.random() * list.length)]
  } while (selected.Key === excludeKey)

  return selected
}

const HOST = process.env.NEXT_PUBLIC_YANDEX_HOST

type VideoItem = ObjectList[number]

export default Hero
