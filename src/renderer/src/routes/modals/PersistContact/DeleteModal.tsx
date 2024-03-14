import { MdDeleteForever } from 'react-icons/md'
import { PiWarningLight } from 'react-icons/pi'
import { Button } from '@renderer/components/Button'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  modalTitle: string
  warningText: string
  warningDescription?: string
  firstName: string
  secondName?: string
  onButtonClick: () => void
  buttonLabel: string
  truncateFirstName?: boolean
}

export const DeleteModal = () => {
  const {
    modalTitle,
    warningText,
    warningDescription,
    buttonLabel,
    firstName,
    secondName,
    onButtonClick,
    truncateFirstName = false,
  } = useModalState<TLocationState>()
  const { modalNavigate } = useModalNavigate()

  const handleButtonClick = () => {
    onButtonClick()
    modalNavigate(-1)
  }

  const formatFirstName = (text: string) => {
    const minTextLength = 35

    if (!truncateFirstName) return text

    return text.length > minTextLength ? StringHelper.truncateStringMiddle(text, minTextLength) : text
  }

  return (
    <EndModalLayout heading={modalTitle} headingIcon={<MdDeleteForever className="text-pink" />}>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col items-center gap-y-6 text-lg text-center">
          <div className="bg-asphalt rounded-full w-[9.25rem] h-[9.25rem] flex items-center justify-center">
            <PiWarningLight className="w-28 h-28 px-1 text-pink" />
          </div>
          <p>{warningText}</p>

          <p className="text-gray-100 text-sm">{formatFirstName(firstName)}</p>

          {warningDescription && <p className="text-sm text-gray-300">{warningDescription}</p>}

          {secondName && <p className="text-gray-100 text-sm">{secondName}</p>}
        </div>

        <Button
          label={buttonLabel}
          type="button"
          leftIcon={<MdDeleteForever className="fill-pink" />}
          variant="outlined"
          colorSchema="error"
          flat
          className="w-full"
          onClick={handleButtonClick}
        />
      </div>
    </EndModalLayout>
  )
}
