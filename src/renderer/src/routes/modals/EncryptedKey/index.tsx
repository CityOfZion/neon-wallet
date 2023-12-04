import { useTranslation } from 'react-i18next'
import { MdOutlineLock } from 'react-icons/md'
import { PiSealCheckFill } from 'react-icons/pi'
import { Input } from '@renderer/components/Input'
import { useModalLocation } from '@renderer/hooks/useModalRouter'
import { ModalLayout } from '@renderer/layouts/Modal'

type TParams = {
  encryptedKey: string
  abbreviateEncryptedKey: string
}

export const EncryptedKeyModal = () => {
  const {
    state: { encryptedKey, abbreviateEncryptedKey },
  } = useModalLocation<TParams>()
  const { t } = useTranslation('modals', { keyPrefix: 'encryptedKey' })

  return (
    <ModalLayout heading={t('title')} headingIcon={<MdOutlineLock />} headingIconFilled={false}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-28 h-28 p-2 bg-asphalt rounded-full flex items-center">
          <PiSealCheckFill className="w-24 h-24 text-blue" />
        </div>
        <p className="text-base my-5">{t('subtitle')}</p>
        <p className="text-gray-300 mb-4">{t('description')}</p>
        <Input type="copy" value={abbreviateEncryptedKey} originalValue={encryptedKey} />
      </div>
    </ModalLayout>
  )
}
