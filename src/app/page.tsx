import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import MarkdownViewer from '@/components/MarkdownViewer'
import { getTranslations } from 'next-intl/server'

const Page = async () => {
  const t = await getTranslations()

  return (
    <div className="flex flex-col h-dvh">
      <Hero />
      <main className="flex-1 overflow-y-auto px-4">
        <section className="h-dvh flex flex-col justify-end max-w-screen-sm w-full py-4 ">
          <h1 className="text-7xl sm:text-9xl border-4 relative px-2 scroll-mt-4">
            {t('title')}
            {/* <div className='absolute right-4 top-4 text-2xl sm:text-4xl'>{t('date')}</div> */}
          </h1>
        </section>
        <section className="min-h-dvh scroll-mt-4 flex">
          <div className="grow flex flex-wrap justify-start h-fit items-center w-full gap-4">
            <div className="w-full max-w-screen-sm self-start">
              <MarkdownViewer />
            </div>
            <div className="grow flex flex-col gap-4 justify-center items-center p-4">
              {/* <BuyTicket />
              <p className="text-8xl font-serif">{t('ageRestriction')}</p> */}
            </div>
          </div>
        </section>
        <section className="py-2">
          <Footer />
        </section>
      </main>
    </div>
  )
}

export default Page
