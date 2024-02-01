import { useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import * as RadixSelect from '@radix-ui/react-select'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { Separator } from './Separator'

type TItemProps = {
  children: React.ReactNode
  value: string
}

type TProps = {
  label?: string
  title: string
  disabled?: boolean
  onSelect?: (value: string) => void
  children: React.ReactNode
  bgColor?: string
  radixContextClassName?: string
}

const Item = ({ children, value }: TItemProps) => {
  return (
    <RadixSelect.Item value={value} className="outline-none">
      <Separator />
      {children}
    </RadixSelect.Item>
  )
}

const Root = ({ label, onSelect, disabled, children, title, bgColor, radixContextClassName }: TProps) => {
  const [open, setOpen] = useState(false)

  return (
    <RadixSelect.Root onOpenChange={setOpen} open={open} onValueChange={onSelect} disabled={disabled}>
      <RadixSelect.Trigger
        aria-disabled={disabled}
        className={StyleHelper.mergeStyles(
          'flex items-center w-full min-w-[11.625rem] py-1.5 px-2.5 transition-colors outline-none rounded',
          'aria-[disabled=false]:hover:bg-gray-300/15 aria-[disabled=true]:opacity-50 aria-[disabled=true]:cursor-not-allowed',
          bgColor && [bgColor],
          {
            'bg-gray-800 rounded-b-none': open,
            'hover:bg-gray-300/15': !disabled,
            '': disabled,
          }
        )}
      >
        <div className="flex flex-col pointer-events-none w-full text-left min-w-0">
          <span className="text-xs text-gray-300 ">{title}</span>
          <span className="text-sm text-white truncate">{label}</span>
        </div>

        <RadixSelect.Icon>
          {open ? <MdExpandLess className="fill-white w-6 h-6" /> : <MdExpandMore className="fill-white w-6 h-6" />}
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className={StyleHelper.mergeStyles(
            'bg-gray-800 min-w-[11.625rem] rounded-b shadow-xl',
            radixContextClassName
          )}
          position="popper"
          align="center"
        >
          <RadixSelect.Viewport className="pt-2">{children}</RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

export const Select = {
  Root,
  Item,
}
