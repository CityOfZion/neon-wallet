import * as RadixTooltip from '@radix-ui/react-tooltip'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  children: React.ReactNode
  title: string
  contentProps?: RadixTooltip.TooltipContentProps
  arrowProps?: RadixTooltip.TooltipArrowProps
}

export const Tooltip = ({ children, title, ...props }: TProps) => {
  const { className: contentClassName, ...contentProps } = props.contentProps ?? {}
  const { className: arrowClassName, ...arrowProps } = props.arrowProps ?? {}

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side="bottom"
            className={StyleHelper.mergeStyles(
              'bg-gray-100 rounded-sm text-xs text-asphalt px-1 py-0.5',
              contentClassName
            )}
            {...contentProps}
          >
            {title}
            <RadixTooltip.Arrow className={StyleHelper.mergeStyles('fill-gray-100', arrowClassName)} {...arrowProps} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
