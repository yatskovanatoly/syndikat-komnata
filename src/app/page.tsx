import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-2">
      <span className="text-9xl font-bold text-wrap break-words select-none">
        МОСКОВСКИЙМУЗЫКАЛЬНЫЙСИНДИКАТ
      </span>
      <Link href={'/komnata'} className="text-4xl underline text-nowrap">
        эта комната
      </Link>
    </div>
  )
}
