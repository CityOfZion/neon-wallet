import { forwardRef } from 'react'
import { FiCheck } from 'react-icons/fi'
import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = Omit<RadixCheckbox.CheckboxProps, 'onCheckedChange'> & {
  onCheckedChange?(checked: boolean): void
}

export const Checkbox = forwardRef<HTMLButtonElement, TProps>(({ className, onCheckedChange, ...props }, ref) => {
  const handleCheckedChange = (value: RadixCheckbox.CheckedState) => {
    if (value === 'indeterminate') {
      onCheckedChange?.(false)
    } else {
      onCheckedChange?.(value)
    }
  }

  return (
    <RadixCheckbox.Root
      ref={ref}
      className={StyleHelper.mergeStyles(
        'min-w-[1.125rem] flex items-center justify-center min-h-[1.125rem] max-w-[1.125rem] max-h-[1.125rem]  rounded-sm border-2 data-[state=unchecked]:border-gray-300 data-[state=checked]:border-neon data-[state=unchecked]:bg-transparent data-[state=checked]:bg-neon disabled:cursor-not-allowed',
        className
      )}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <RadixCheckbox.Indicator>
        <FiCheck className="w-full h-full stroke-asphalt stroke-2" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  )
})
