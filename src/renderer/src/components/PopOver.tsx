import { cloneElement, ReactNode, useState } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

type TProps = {
  trigger: JSX.Element
  children: ReactNode
}

export const PopOver = ({ trigger, children }: TProps) => {
  const [open, setOpen] = useState(false)

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>{cloneElement(trigger, { activated: open })}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content className="relative" sticky="always" side="bottom" align="end">
          <div className="bg-gray-900 flex flex-col rounded backdrop-blur-md overflow-hidden">{children}</div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
