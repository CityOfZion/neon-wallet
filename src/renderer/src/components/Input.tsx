import { cloneElement, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { MdCancel, MdContentCopy, MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { IconButton } from './IconButton'

export type TInputProps = Omit<React.ComponentProps<'input'>, 'type' | 'ref'> & {
  containerClassName?: string
  errorMessage?: string
  error?: boolean
  clearable?: boolean
  compacted?: boolean
  copyable?: boolean
  type?: 'text' | 'password'
  leftIcon?: JSX.Element
}

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    { className, containerClassName, type, errorMessage, error, compacted, clearable, leftIcon, copyable, ...props },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null)
    const [hidden, setHidden] = useState(type === 'password')
    const realType = type === 'password' ? (hidden ? 'password' : 'text') : type

    const toggleHidden: React.MouseEventHandler<HTMLButtonElement> = event => {
      event.stopPropagation()
      setHidden(prev => !prev)
    }

    const handleCopyInput = () => {
      navigator.clipboard.writeText(internalRef.current?.value ?? '')
    }

    const clear = () => {
      if (internalRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')!.set!
        nativeInputValueSetter.call(internalRef.current, '')
        const inputEvent = new Event('input', { bubbles: true })
        internalRef.current.dispatchEvent(inputEvent)
        internalRef.current.focus()
      }
    }

    useImperativeHandle(ref, () => internalRef.current!, [])

    return (
      <div className={StyleHelper.mergeStyles('w-full relative', containerClassName)}>
        <div
          className={StyleHelper.mergeStyles(
            'flex items-center gap-x-1.5 rounded bg-asphalt ring-2 ring-transparent w-full px-5 outline-none font-medium placeholder:text-white/50 text-white',
            {
              'h-8.5 py-1.5 text-xs': compacted,
              'h-12 py-2 text-sm': !compacted,
              'ring-pink': !!errorMessage || error === true,
              'focus:ring-neon': !errorMessage || error === false,
              'pl-3': !!leftIcon,
              'pr-3': type === 'password' || clearable,
            },
            className
          )}
        >
          {leftIcon &&
            cloneElement(leftIcon, {
              ...leftIcon.props,
              className: StyleHelper.mergeStyles(
                {
                  'w-5 h-5': compacted,
                  'w-6 h-6': !compacted,
                },
                leftIcon.props.className
              ),
            })}

          <input
            ref={internalRef}
            className={StyleHelper.mergeStyles('bg-transparent flex-grow outline-none', className)}
            type={realType}
            spellCheck="false"
            autoComplete="off"
            {...props}
          />

          {type === 'password' && (
            <IconButton icon={hidden ? <MdVisibility /> : <MdVisibilityOff />} onClick={toggleHidden} type="button" />
          )}

          {copyable && (
            <IconButton icon={<MdContentCopy className="fill-neon" />} onClick={handleCopyInput} type="button" />
          )}

          {clearable && <IconButton icon={<MdCancel />} type="button" onClick={clear} />}
        </div>

        {errorMessage && <span className="block mt-1 text-xs text-pink absolute">{errorMessage}</span>}
      </div>
    )
  }
)
