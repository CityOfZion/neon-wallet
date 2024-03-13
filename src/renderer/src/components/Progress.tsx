import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={StyleHelper.mergeStyles('h-3 w-full rounded-full bg-asphalt flex items-center p-[0.188rem]', className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full rounded-full bg-blue transition-all shadow-[0px_0px_9px_0px_theme(colors.blue.DEFAULT)]"
      style={{ width: `${Math.min(value ?? 0, 100)}%` }}
    />
  </ProgressPrimitive.Root>
))

export { Progress }
