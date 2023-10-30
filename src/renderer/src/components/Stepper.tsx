import { StyleHelper } from '@renderer/helpers/StyleHelper'

type TProps = {
  steps: string[]
  currentStep?: number
} & React.ComponentProps<'div'>

export const Stepper = ({ steps, currentStep = 1, className, ...props }: TProps) => {
  return (
    <div className={StyleHelper.mergeStyles('flex gap-x-24', className)} {...props}>
      {steps.map((step, index) => {
        const fixedIndex = index + 1

        return (
          <div className="flex relative" key={index}>
            <div className="flex flex-col items-center w-14 gap-y-2.5">
              <span
                className={StyleHelper.mergeStyles(
                  'w-6 h-6  rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                  {
                    'bg-neon text-asphalt': fixedIndex <= currentStep,
                    'bg-gray-900 text-gray-200': fixedIndex > currentStep,
                  }
                )}
              >
                {fixedIndex}
              </span>

              <span
                className={StyleHelper.mergeStyles(' text-center text-xs transition-colors', {
                  'text-neon': fixedIndex <= currentStep,
                  'text-gray-200': fixedIndex > currentStep,
                })}
              >
                {step}
              </span>
            </div>

            {fixedIndex < steps.length && (
              <div
                className={StyleHelper.mergeStyles(
                  'w-30 h-0 border border-dashed absolute top-[0.75rem] -translate-y-1/2 left-[2.75rem] transition-colors',
                  { 'border-neon': fixedIndex < currentStep, 'border-gray-900': fixedIndex >= currentStep }
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
