import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownViewer = () => {
  return (
    <div className="prose lg:prose-xl prose-invert w-full bg-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-3xl">
      <Suspense fallback={<Skeleton />}>
        <MarkdownContent />
      </Suspense>
    </div>
  )
}

const MarkdownContent = async () => {
  const description = await getDescription(
    process.env.NEXT_PUBLIC_DESCRIPTION || ''
  )
  return (
    <Markdown
      components={{
        p: (props) => (
          <p className="font-mono whitespace-pre-wrap leading-7" {...props} />
        ),
        h1: (props) => (
          <h1 className="text-4xl font-bold font-serif" {...props} />
        ),
        h2: (props) => (
          <h2 className="text-2xl font-bold font-serif" {...props} />
        ),
        h3: (props) => (
          <h3 className="text-xl font-bold font-serif" {...props} />
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {description}
    </Markdown>
  )
}

const getDescription = async (url: string) => {
  const t = await getTranslations()
  const res = await fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
      }
      return res.text()
    })
    .catch((error) => {
      console.error('Markdown fetch error:', error)
    })
  if (!res) return t('Description.error')
  return res
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
