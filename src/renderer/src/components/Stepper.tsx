import { Fragment } from 'react'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  steps: string[]
  currentStep?: number
} & React.ComponentProps<'div'>

export const Stepper = ({ steps, currentStep = 1, className, ...props }: TProps) => {
  return (
    <div className={StyleHelper.mergeStyles('flex w-full items-center gap-x-1 px-6', className)} {...props}>
      {steps.map((step, index) => {
        const fixedIndex = index + 1

        return (
          <Fragment key={index}>
            <div className="flex flex-col relative">
              <span
                className={StyleHelper.mergeStyles(
                  'w-6 h-6  rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                  {
                    'bg-blue text-asphalt': fixedIndex <= currentStep,
                    'bg-gray-900 text-gray-300': fixedIndex > currentStep,
                  }
                )}
              >
                {fixedIndex}
              </span>

              <span
                className={StyleHelper.mergeStyles(
                  'text-center w-20 top-8 left-1/2 -translate-x-1/2 text-xs transition-colors absolute',
                  {
                    'text-blue': fixedIndex <= currentStep,
                    'text-gray-300': fixedIndex > currentStep,
                  }
                )}
              >
                {step}
              </span>
            </div>

            {fixedIndex < steps.length && (
              <div
                className={StyleHelper.mergeStyles('w-full h-0 border-t-2 border-dashed transition-colors', {
                  'border-blue': fixedIndex < currentStep,
                  'border-gray-900': fixedIndex >= currentStep,
                })}
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
