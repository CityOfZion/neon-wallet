import { ChangeEventHandler, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { MdCancel } from 'react-icons/md'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { IconButton } from './IconButton'

type TProps = React.ComponentProps<'textarea'> & {
  containerClassName?: string
  errorMessage?: string
  error?: boolean
  clearable?: boolean
  compact?: boolean
  multiline?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TProps>(
  (
    { className, containerClassName, errorMessage, error, compact, clearable, onChange, multiline = true, ...props },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)

    const clear = () => {
      if (internalRef.current) {
        internalRef.current.value = ''
        internalRef.current.focus()
        calcHeight()
      }
    }

    const calcHeight = useCallback(() => {
      if (!internalRef.current) return
      internalRef.current.style.height = '0px'
      const scrollHeight = internalRef.current.scrollHeight
      internalRef.current.style.height = scrollHeight + 'px'
    }, [])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = event => {
      calcHeight()
      onChange?.(event)
    }

    useImperativeHandle(ref, () => internalRef.current!, [])

    useEffect(() => {
      calcHeight()
    }, [multiline, calcHeight])

    return (
      <div className={StyleHelper.mergeStyles('w-full', containerClassName)}>
        <div
          className={StyleHelper.mergeStyles(
            'flex items-center gap-x-1 rounded bg-asphalt ring-2 ring-transparent w-full px-5 outline-none font-medium placeholder:text-white/50 text-white',
            {
              'py-[0.3125rem]  text-xs': compact,
              'py-2 text-sm': !compact,
              'ring-pink': !!errorMessage || error === true,
              'focus:ring-neon': !errorMessage || error === false,
              'pr-3': clearable,
            },
            className
          )}
        >
          <textarea
            className={StyleHelper.mergeStyles(
              'bg-transparent flex-grow outline-none resize-none overflow-hidden ',
              {
                'whitespace-nowrap': !multiline,
              },
              className
            )}
            ref={internalRef}
            rows={1}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            {...props}
          />

          {clearable && <IconButton icon={<MdCancel />} type="button" onClick={clear} />}
        </div>

        {errorMessage && <span className="block mt-1 text-xs text-pink">{errorMessage}</span>}
      </div>
    )
  }
)
