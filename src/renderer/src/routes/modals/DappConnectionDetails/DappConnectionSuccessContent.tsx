import { useTranslation } from 'react-i18next'
import { MdArrowBack } from 'react-icons/md'
import { Button } from '@renderer/components/Button'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

export const DappConnectionSuccessContent = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappConnectionDetails.successModal' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <div className="flex flex-grow  justify-center w-full items-end">
      <Button
        label={t('buttonReturnLabel')}
        className="w-full px-14"
        flat
        leftIcon={<MdArrowBack />}
        onClick={modalNavigateWrapper(-1)}
      />
    </div>
  )
}
