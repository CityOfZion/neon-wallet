import { useTranslation } from 'react-i18next'
import { MdLock } from 'react-icons/md'
import { Input } from '@renderer/components/Input'

type TProps = {
  encryptedKey: string
}

export const SettingsEncryptKeySuccessContent = ({ encryptedKey }: TProps) => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings.encryptKey' })

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-4 mt-8">
      <p className="text-gray-300">{t('successModal.description')}</p>

      <Input leftIcon={<MdLock className="w-6 h-6 text-gray-300/50" />} value={encryptedKey} copyable readOnly />
    </div>
  )
}
