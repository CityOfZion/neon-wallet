import { twMerge } from 'tailwind-merge'

type TProps = {
  steps: string[]
  currentStep?: number
} & React.ComponentProps<'div'>

export const Stepper = ({ steps, currentStep = 1, className, ...props }: TProps) => {
  return (
    <div className={twMerge('flex gap-x-24', className)} {...props}>
      {steps.map((step, index) => {
        const fixedIndex = index + 1

        return (
          <div className="flex relative" key={index}>
            <div className="flex flex-col items-center w-14 gap-y-2.5">
              <span
                className={twMerge(
                  'w-6 h-6  rounded-full flex items-center justify-center text-sm font-bold transition-colors',
                  fixedIndex <= currentStep ? 'bg-neon text-asphalt' : 'bg-gray-900 text-gray-200'
                )}
              >
                {fixedIndex}
              </span>

              <span
                className={twMerge(
                  ' text-center text-xs transition-colors',
                  fixedIndex <= currentStep ? 'text-neon' : 'text-gray-200'
                )}
              >
                {step}
              </span>
            </div>

            {fixedIndex < steps.length && (
              <div
                className={twMerge(
                  'w-30 h-0 border border-dashed absolute top-[0.75rem] -translate-y-1/2 left-[2.75rem] transition-colors',
                  fixedIndex < currentStep ? 'border-neon' : 'border-gray-900'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
