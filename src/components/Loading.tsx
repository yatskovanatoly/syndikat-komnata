import Image from 'next/image'

const LoadingElement = () => (
  <Image
    width={150}
    height={150}
    alt="loading"
    src="/poster.png"
    className="animate-pulse fixed h-auto w-auto m-auto inset-0 -z-10"
  />
)

export default LoadingElement
