import { useTranslation } from 'react-i18next'
import { MdArrowBack } from 'react-icons/md'
import { Button } from '@renderer/components/Button'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

export const DappConnectionErrorContent = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'dappConnectionDetails.errorModal' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <div className="flex flex-grow flex-col justify-between w-full items-center mt-2.5">
      <div className="flex flex-col items-center gap-y-2.5">
        <p className="text-lg text-gray-100">{t('subtitle2')}</p>
        <p className="text-sm text-gray-300">{t('subtitle3')}</p>
      </div>

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
