import { useTranslation } from 'react-i18next'

type TProps = {
  error: string
}

export const ErrorModalContent = ({ error }: TProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission' })

  return (
    <div className="flex flex-grow flex-col min-w-0 w-full text-gray-100">
      <p className="text-center text-sm mt-4 px-9">{t('errorModal.text')}</p>

      <div className="mt-8 flex flex-col gap-1 text-xs w-full ">
        <span className="font-bold  ">{t('errorModal.errorMessageLabel')}</span>
        <p className=" bg-asphalt w-full p-2 rounded break-words whitespace-pre-wrap max-h-48 overflow-y-auto">
          {error}
        </p>
      </div>
    </div>
  )
}
