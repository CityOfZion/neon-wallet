import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type ItemProps = RadixRadioGroup.RadioGroupItemProps & {
  label: string
  leftIcon?: JSX.Element
  containerClassname?: string
}

const Root = (props: RadixRadioGroup.RadioGroupProps) => {
  return <RadixRadioGroup.Root {...props} />
}

const Item = ({ label, leftIcon, className, containerClassname, ...props }: ItemProps) => {
  return (
    <div
      className={StyleHelper.mergeStyles(
        'flex flex-row gap-y-2 gap-x-4 h-10 items-center justify-between hover:bg-asphalt border-b border-gray-300/30',
        containerClassname
      )}
    >
      <div className="flex items-center gap-2.5">
        {leftIcon && leftIcon}
        <label>{label}</label>
      </div>

      <RadixRadioGroup.Item
        className={StyleHelper.mergeStyles(
          'data-[state=unchecked]:border-gray-300 data-[state=checked]:border-neon border border-2 bg-transparent w-4 h-4 rounded-full outline-none cursor-pointer mx-4',
          className
        )}
        {...props}
      >
        <RadixRadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-[50%] after:bg-neon" />
      </RadixRadioGroup.Item>
    </div>
  )
}

export const RadioGroup = { Root, Item }
