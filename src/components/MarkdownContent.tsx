import { getTranslations } from 'next-intl/server'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownContent = async () => {
  const description = await getDescription(url)
  const commonStyles = 'font-bold font-serif mb-[calc(var(--spacing)*4)]'
  return (
    <Markdown
      components={{
        p: (props) => (
          <p className="font-mono whitespace-pre-wrap leading-7" {...props} />
        ),
        h1: (props) => <h1 className={`text-4xl ${commonStyles}`} {...props} />,
        h2: (props) => <h2 className={`text-2xl ${commonStyles}`} {...props} />,
        h3: (props) => <h3 className={`text-xl ${commonStyles}`} {...props} />,
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
    .then((res) => res.text())
    .catch((error) => {
      console.error('Markdown fetch error:', error)
    })
  if (!res) return t('Description.error')
  return res
}

const url = `https://${process.env.NEXT_PUBLIC_DESCRIPTION}`

console.log(url)

export default MarkdownContent
