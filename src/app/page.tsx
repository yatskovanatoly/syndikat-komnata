'use client'

import BuyTicket from '@/components/BuyTicket'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import MarkdownViewer from '@/components/MarkdownViewer'

const Page = () => {
  return (
    <div className="flex flex-col h-dvh">
      <Hero />
      <main className="flex-1 overflow-y-scroll snap-y snap-mandatory px-4">
        <section className="h-dvh flex flex-col justify-end snap-start scroll-mt-6 py-4">
          <h1 className="text-7xl sm:text-9xl snap-start snap-always border-4 w-fit px-2 scroll-mt-6">
            эта комната
          </h1>
        </section>
        <section className="min-h-dvh snap-start flex flex-col lg:flex-row items-center gap-4">
          <div className="snap-end snap-always scroll-mb-4 w-full lg:w-fit max-w-[1000px]">
            <MarkdownViewer />
          </div>
          <div className="h-fit snap-end snap-always scroll-mb-4 flex grow flex-col gap-4 items-center justify-center p-4">
            <BuyTicket />
            <p className="text-8xl font-serif">16+</p>
          </div>
        </section>
        <section className="h-fit snap-start py-2">
          <Footer />
        </section>
      </main>
    </div>
  )
}

export default Page
