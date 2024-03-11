import { useTranslation } from 'react-i18next'
import { MdContentCopy } from 'react-icons/md'
import { Button } from '@renderer/components/Button'

type TProps = {
  result: string
}

export const SuccessModalContent = ({ result }: TProps) => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappPermission.requests.neo3.invokeFunction' })
  return (
    <div className="flex flex-grow flex-col min-w-0 w-full">
      <p className="text-center text-sm mt-4 px-9">{t('successModal.text')}</p>

      <Button className="mt-8" variant="text" label={result} flat rightIcon={<MdContentCopy />} />
    </div>
  )
}
