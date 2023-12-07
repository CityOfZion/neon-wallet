import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineLock } from 'react-icons/md'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useActions } from '@renderer/hooks/useActions'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TFormData = {
  privateKey: string
  passphrase: string
  confirmationPassphrase: string
}

const MIN_LENGTH_PASSPHRASE = 4

export const SettingsEncryptKey = (): JSX.Element => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })
  const { bsAggregator } = useBsAggregatorSelector()
  const { modalNavigate } = useModalNavigate()

  const { handleAct, setError, actionState, actionData, setData } = useActions<TFormData>({
    privateKey: '',
    passphrase: '',
    confirmationPassphrase: '',
  })

  const handlePrivateKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setData({
      privateKey: value,
    })
    if (!bsAggregator.validateKeyAllBlockchains(value)) {
      setError('privateKey', t('encryptKey.error.privateKey'))
    } else {
      setError('privateKey', undefined)
    }
  }
  const handlePassphraseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setData({
      passphrase: value,
    })
    if (value.length < MIN_LENGTH_PASSPHRASE) {
      setError('passphrase', t('encryptKey.error.passphrase'))
    } else {
      setError('passphrase', undefined)
    }
  }
  const handleConfirmationPassphraseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setData({
      confirmationPassphrase: value,
    })
    if (actionData.passphrase !== value) {
      setError('confirmationPassphrase', t('encryptKey.error.confirmationPassphrase'))
    } else {
      setError('confirmationPassphrase', undefined)
    }
  }

  const handleSubmit = async (data: TFormData) => {
    const blockchainService = bsAggregator.getBlockchainByKey(data.privateKey)
    if (!blockchainService) {
      setError('privateKey', t('encryptKey.error.privateKeyNotFound'))
      return
    }
    const encryptedKey = await blockchainService.encrypt(data.privateKey, data.passphrase)
    const abbreviateEncryptedKey = (ek: string): string => {
      if (ek.length <= 21) {
        return ek
      }
      return ek.substring(0, 8) + '.....' + ek.substring(ek.length - 8, ek.length)
    }
    modalNavigate('encrypted-key', {
      state: {
        encryptedKey,
        abbreviateEncryptedKey: abbreviateEncryptedKey(encryptedKey),
      },
    })
    setData({
      privateKey: '',
      passphrase: '',
      confirmationPassphrase: '',
    })
  }

  return (
    <div className="w-full">
      <div className="p-5 text-[14px]">{t('securityOption.encryptKey')}</div>
      <Separator className="mx-5 mb-5" />
      <form className="flex justify-center items-center" onSubmit={handleAct(handleSubmit)}>
        <div className="text-[12px] min-w-[360px]">
          <div className="mb-6 text-center">
            <span className="text-gray-100">{t('encryptKey.subtitle')}</span>
          </div>
          <div className="w-full flex mb-2">
            <div className="rounded-full leading-5 text-xs w-5 h-5 bg-blue text-gray-900 text-center text-[10px]">
              1
            </div>
            <span className="text-red-500 ml-4 text-xs">{t('encryptKey.titleInput1')}</span>
          </div>
          <div className="flex items-center ml-2 mb-5">
            <div className="border-l border-gray-500 mr-7 h-16 mt-3"></div>
            <Input
              placeholder={t('encryptKey.inputPrivateKeyPlaceholder')}
              onChange={handlePrivateKeyChange}
              value={actionData.privateKey}
              errorMessage={actionState.errors.privateKey}
            />
          </div>
          <div className="w-full flex mb-2">
            <div className="rounded-full leading-5 text-xs w-5 h-5 bg-blue text-gray-900 text-center text-[10px]">
              2
            </div>
            <span className="text-red-500 ml-4 text-xs">{t('encryptKey.titleInput2')}</span>
          </div>
          <div className="flex items-center ml-2 mb-5">
            <div className="border-l border-gray-500 mr-7 h-16 mt-3"></div>
            <Input
              type="password"
              placeholder={t('encryptKey.inputPassphrasePlaceholder')}
              onChange={handlePassphraseChange}
              value={actionData.passphrase}
              errorMessage={actionState.errors.passphrase}
            />
          </div>
          <div className="w-full flex mb-5">
            <div className="rounded-full leading-5 text-xs w-5 h-5 bg-blue text-gray-900 text-center text-[10px]">
              3
            </div>
            <span className="text-red-500 ml-4 text-xs">{t('encryptKey.titleInput2')}</span>
          </div>
          <div className="flex items-center ml-9 mb-7">
            <Input
              type="password"
              placeholder={t('encryptKey.inputConfirmPassphrasePlaceholder')}
              onChange={handleConfirmationPassphraseChange}
              value={actionData.confirmationPassphrase}
              errorMessage={actionState.errors.confirmationPassphrase}
            />
          </div>
          <div className="flex justify-center w-full">
            <Button
              className="mt-8 w-full"
              type="submit"
              label={t('encryptKey.buttonGenerate')}
              loading={actionState.isActing}
              // TODO Needs to fix the isValid of the actionState.
              // disabled={!actionState.isValid}
              leftIcon={<MdOutlineLock />}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
