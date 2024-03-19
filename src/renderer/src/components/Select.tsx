import { ComponentPropsWithoutRef, ElementRef, forwardRef, Fragment } from 'react'
import { MdCheck, MdExpandLess, MdExpandMore } from 'react-icons/md'
import * as SelectPrimitive from '@radix-ui/react-select'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

const Root = SelectPrimitive.Root

const Value = SelectPrimitive.Value

const Trigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, disabled = false, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    aria-disabled={disabled}
    className={StyleHelper.mergeStyles(
      'flex items-center h-fit justify-between group w-full min-w-[11.625rem] text-sm py-1.5 px-2.5 transition-colors outline-none rounded [&>span]:truncate',
      'aria-[disabled=false]:hover:bg-gray-300/15 aria-[disabled=true]:opacity-50 aria-[disabled=true]:cursor-not-allowed aria-expanded:bg-gray-300/15',
      className
    )}
    disabled={disabled}
    {...props}
  >
    {children}
  </SelectPrimitive.Trigger>
))

const Icon = forwardRef<ElementRef<typeof SelectPrimitive.Icon>, ComponentPropsWithoutRef<typeof SelectPrimitive.Icon>>(
  ({ className, ...props }, ref) => (
    <SelectPrimitive.Icon
      ref={ref}
      className={StyleHelper.mergeStyles(
        'min-w-[1.5rem] min-h-[1.5rem] max-w-[1.5rem] max-h-[1.5rem] text-white',
        className
      )}
      {...props}
    >
      <Fragment>
        <MdExpandMore className={StyleHelper.mergeStyles('w-full h-full group-aria-expanded:hidden')} />

        <MdExpandLess className={StyleHelper.mergeStyles('w-full h-full hidden group-aria-expanded:block')} />
      </Fragment>
    </SelectPrimitive.Icon>
  )
)

const Content = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', align = 'center', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={StyleHelper.mergeStyles(
        'relative max-h-96 min-w-[11.625rem] overflow-hidden rounded bg-gray-900 text-white shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      align={align}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={StyleHelper.mergeStyles(
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full max-w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

const Item = forwardRef<ElementRef<typeof SelectPrimitive.Item>, ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={StyleHelper.mergeStyles(
        'relative flex justify-between min-w-0 w-full gap-4 cursor-default select-none items-center rounded-sm py-2 px-3 text-xs outline-none focus:bg-grey-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>span]:truncate',
        className
      )}
      {...props}
    >
      {children}
    </SelectPrimitive.Item>
  )
)

const ItemIndicator = forwardRef<
  ElementRef<typeof SelectPrimitive.ItemIndicator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemIndicator>
>((props, ref) => (
  <SelectPrimitive.ItemIndicator ref={ref} asChild {...props}>
    <MdCheck className="min-h-[1rem] min-w-[1rem] max-h-[1rem] max-w-[1rem]" />
  </SelectPrimitive.ItemIndicator>
))

const ItemText = forwardRef<
  ElementRef<typeof SelectPrimitive.ItemText>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ItemText>
>((props, ref) => <SelectPrimitive.ItemText ref={ref} {...props} />)

const Separator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={StyleHelper.mergeStyles('-mx-1 h-px bg-gray-300/30', className)}
    {...props}
  />
))

export const Select = {
  Root,
  Content,
  Item,
  Icon,
  ItemText,
  ItemIndicator,
  Separator,
  Trigger,
  Value,
}
