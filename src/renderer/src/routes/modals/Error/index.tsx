import { MdCancel } from 'react-icons/md'
import { useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TState = {
  heading: string
  headingIcon?: JSX.Element
  subtitle?: string
  content: JSX.Element
}

export const ErrorModal = () => {
  const { heading, headingIcon, content, subtitle } = useModalState<TState>()

  return (
    <EndModalLayout
      heading={heading}
      headingIcon={headingIcon}
      bigger
      contentClassName="flex flex-col flex-grow items-center justify-center"
    >
      <div className="w-28 h-28 p-2 bg-asphalt rounded-full flex items-center">
        <MdCancel className="w-24 h-24 text-pink" />
      </div>

      <p className="text-lg text-white mt-7">{subtitle}</p>

      {content}
    </EndModalLayout>
  )
}
