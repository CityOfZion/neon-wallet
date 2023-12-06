import { ComponentProps, ReactEventHandler } from 'react'

type TProps = ComponentProps<'img'> & {
  fallbackSrc?: string
}

export const ImageWithFallback = ({ fallbackSrc, ...props }: TProps) => {
  const handleError: ReactEventHandler<HTMLImageElement> = event => {
    event.currentTarget.onerror = null

    if (fallbackSrc) {
      event.currentTarget.src = fallbackSrc
    }
  }

  return <img {...props} onError={handleError} />
}
