import { PiSealCheckFill } from 'react-icons/pi'
import { useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TState = {
  heading: string
  headingIcon?: JSX.Element
  subtitle?: string
  content: JSX.Element
}

export const SuccessModal = () => {
  const { heading, headingIcon, content, subtitle } = useModalState<TState>()

  return (
    <EndModalLayout
      heading={heading}
      headingIcon={headingIcon}
      bigger
      contentClassName="flex flex-col flex-grow min-w-0 items-center"
    >
      <div className="w-28 h-28 p-2 bg-asphalt rounded-full flex items-center">
        <PiSealCheckFill className="w-24 h-24 text-blue" />
      </div>

      <p className="text-lg text-white mt-7">{subtitle}</p>

      {content}
    </EndModalLayout>
  )
}
