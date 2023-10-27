import { useState } from 'react'
import * as RadixPopover from '@radix-ui/react-popover'

import { Button } from './Button'
import { Separator } from './Separator'

type Action = { icon?: JSX.Element; iconFilled?: boolean; label: string; onClick?: () => void | Promise<void> }

type TProps = {
  children: React.ReactNode
  actions: Action[]
}

export const ActionPopover = ({ children, actions }: TProps) => {
  const [open, setOpen] = useState(false)

  const handleClick = (onClick?: () => void | Promise<void>) => {
    onClick?.()
    setOpen(false)
  }

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content className="relative" side="right" align="center" sideOffset={20}>
          <div className="bg-gray-900/50 flex flex-col rounded backdrop-blur-md border-l-4 border-l-neon overflow-hidden">
            {actions.map(({ iconFilled = true, label, icon, onClick }, index) => (
              <>
                <Button
                  clickableProps={{ className: 'border-none rounded-none text-left h-10' }}
                  label={label}
                  variant="outlined"
                  flat
                  leftIcon={icon}
                  iconFilled={iconFilled}
                  onClick={() => handleClick(onClick)}
                />

                {index !== actions.length - 1 && (
                  <div className="px-5">
                    <Separator className="h-0.5" />
                  </div>
                )}
              </>
            ))}
          </div>

          <div className="flex items-center absolute top-2/4 -translate-y-2/4 left-0 -translate-x-full">
            <div className="w-2 h-2 bg-neon rounded-full" />

            <div className="w-5 h-px bg-neon" />
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}
