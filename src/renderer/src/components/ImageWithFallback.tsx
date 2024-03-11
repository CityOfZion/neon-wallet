import { ComponentProps, ReactEventHandler, useState } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { Loader } from './Loader'

type TProps = ComponentProps<'img'> & {
  fallbackSrc?: string
}

export const ImageWithFallback = ({ fallbackSrc, className, ...props }: TProps) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleError: ReactEventHandler<HTMLImageElement> = event => {
    event.currentTarget.onerror = null

    if (fallbackSrc) {
      event.currentTarget.src = fallbackSrc
    }
  }

  return (
    <div className={className}>
      {isLoading && <Loader className="w-4 h-4 text-gray-600" containerClassName="p-2" />}
      <img
        {...props}
        className={StyleHelper.mergeStyles({ hidden: isLoading }, 'w-full h-full')}
        onError={handleError}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
