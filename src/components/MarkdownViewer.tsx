import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import MarkdownContent from './MarkdownContent'

const MarkdownViewer = () => {
  return (
    <div className="prose lg:prose-xl prose-invert w-full bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-3xl">
      <Suspense fallback={<Skeleton />}>
        <MarkdownContent />
      </Suspense>
    </div>
  )
}

const Skeleton = async () => {
  const t = await getTranslations()

  return (
    <div className="blur-xs prose prose-invert lg:prose-xl animate-pulse select-none">
      {t('Description.skeleton')}
    </div>
  )
}

export default MarkdownViewer
