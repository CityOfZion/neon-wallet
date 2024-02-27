import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

const Root = TabsPrimitive.Root

const List = forwardRef<ElementRef<typeof TabsPrimitive.List>, ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, children, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={StyleHelper.mergeStyles('w-full flex items-center justify-center text-gray-300', className)}
      {...props}
    >
      <div className="w-fit h-fit flex border-b border-gray-300">{children}</div>
    </TabsPrimitive.List>
  )
)

const Trigger = forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={StyleHelper.mergeStyles(
      'h-full py-[12px] justify-center whitespace-nowrap px-4 text-1xs border-b-2 border-transparent transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-white data-[state=active]:border-white',
      className
    )}
    {...props}
  />
))

const Content = forwardRef<
  ElementRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={StyleHelper.mergeStyles(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))

export const Tabs = { Content, List, Root, Trigger }
