import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

const Footer = async () => {
  const t = await getTranslations()
  return (
    <footer className="w-full text-end text-xs opacity-10 hover:opacity-30 transition">
      <Link target="_blank" href="https://mkcode.org">
        {t('footer')}
      </Link>
    </footer>
  )
}

export default Footer
