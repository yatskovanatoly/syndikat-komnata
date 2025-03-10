import BuyTicket from '@/components/BuyTicket'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import MarkdownViewer from '@/components/MarkdownViewer'
import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const t = await getTranslations()

  return (
    <div className="flex flex-col h-dvh">
      <Hero />
      <main className="flex-1 overflow-y-auto snap-y snap-mandatory px-4">
        <section className="h-dvh flex flex-col justify-end snap-end max-w-screen-sm w-full py-4 ">
          <h1 className="text-7xl sm:text-9xl border-4 px-2 snap-start snap-always scroll-mt-4">
            {t('title')}
          </h1>
        </section>
        <section className="min-h-dvh snap-start snap-always scroll-mt-4 flex">
          <div className="grow flex flex-wrap justify-start items-center w-full gap-4">
            <div className="w-full max-w-screen-sm self-start">
              <MarkdownViewer />
            </div>
            <div className="grow flex flex-col gap-4 justify-center items-center p-4">
              <BuyTicket />
              <p className="text-8xl font-serif">{t('ageRestriction')}</p>
            </div>
          </div>
        </section>
        <section className="py-2 snap-start">
          <Footer />
        </section>
      </main>
    </div>
  )
}

export default Page
