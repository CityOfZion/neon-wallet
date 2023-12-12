import { ChangeEventHandler, forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { MdCancel } from 'react-icons/md'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { IconButton } from './IconButton'

type TProps = React.ComponentProps<'textarea'> & {
  containerClassName?: string
  errorMessage?: string
  error?: boolean
  clearable?: boolean
  compacted?: boolean
  multiline?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TProps>(
  (
    { className, containerClassName, errorMessage, error, compacted, clearable, onChange, multiline = true, ...props },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)

    const clear = () => {
      if (internalRef.current) {
        const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype,
          'value'
        )!.set!
        nativeTextAreaValueSetter.call(internalRef.current, '')
        const inputEvent = new Event('input', { bubbles: true })
        internalRef.current.dispatchEvent(inputEvent)
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
              'py-[0.3125rem]  text-xs': compacted,
              'py-2 text-sm': !compacted,
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
