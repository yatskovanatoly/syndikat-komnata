import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownViewer = () => {
  const [content, setContent] = useState('')
  // const url = 'https://raw.githubusercontent.com/yatskovanatoly/syndikat-komnata/refs/heads/main/DESCRIPTION.md'
  const url = '/DESCRIPTION.md'

  useEffect(() => {
    fetch(url)
      .then((res) => res.text())
      .then(setContent)
  }, [url])

  if (!content) return null
  return (
    <div className="bg-white/10 rounded-2xl p-4 snap-end snap-always scroll-mb-4 sm:px-6 backdrop-blur-3xl w-full max-w-[1000px]">
      <div className="prose lg:prose-xl prose-invert w-full">
        <Markdown
          components={{
            p: (props) => (
              <p
                className="font-mono whitespace-pre-wrap leading-7"
                {...props}
              />
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
          {content}
        </Markdown>
      </div>
    </div>
  )
}

export default MarkdownViewer
