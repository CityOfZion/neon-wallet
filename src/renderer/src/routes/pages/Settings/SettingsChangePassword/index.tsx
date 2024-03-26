import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineLock } from 'react-icons/md'
import { TbReload } from 'react-icons/tb'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { useActions } from '@renderer/hooks/useActions'
import { useBsAggregator } from '@renderer/hooks/useBsAggregator'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TFormData = {
  privateKey: string
  passphrase: string
  confirmationPassphrase: string
}

const MIN_LENGTH_PASSPHRASE = 4

export const SettingsChangePasswordPage = (): JSX.Element => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })
  const { bsAggregator } = useBsAggregator()
  const { modalNavigate } = useModalNavigate()

  const { handleAct, setError, actionState, actionData, setData, reset } = useActions<TFormData>({
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
      return
    }
  }
  const handlePassphraseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setData({
      passphrase: value,
    })

    if (value.length < MIN_LENGTH_PASSPHRASE) {
      setError('passphrase', t('encryptKey.error.passphrase'))
      return
    }
  }
  const handleConfirmationPassphraseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setData({
      confirmationPassphrase: value,
    })

    if (actionData.passphrase !== value) {
      setError('confirmationPassphrase', t('encryptKey.error.confirmationPassphrase'))
      return
    }
  }

  const handleSubmit = async (data: TFormData) => {
    const blockchainService = bsAggregator.getBlockchainByKey(data.privateKey)
    if (!blockchainService) {
      setError('privateKey', t('encryptKey.error.privateKeyNotFound'))
      return
    }
    const encryptedKey = await blockchainService.encrypt(data.privateKey, data.passphrase)

    // modalNavigate('success', {
    //   state: {
    //     heading: t('encryptKey.successModal.title'),
    //     headingIcon: <MdOutlineLock />,
    //     content: <SettingsEncryptKeySuccessContent encryptedKey={encryptedKey} />,
    //     subtitle: t('encryptKey.successModal.subtitle'),
    //   },
    // })

    reset()
  }

  return (
    <div className="w-full px-5 flex flex-col flex-grow">
      <header className="w-full mb-5 h-14 border-b border-gray-300/30 items-center flex">
        <h1 className="text-sm">{t('securityOption.encryptKey')}</h1>
      </header>

      <form className="flex justify-center items-center flex-grow" onSubmit={handleAct(handleSubmit)}>
        <div className="flex flex-col justify-between h-full">
          <div className="min-w-[360px]">
            <div className="mb-6 text-center">
              <span className="text-xs">{t('encryptKey.subtitle')}</span>
            </div>
            <div className="w-full flex mb-2 justify-between items-center">
              <span className="text-gray-100 uppercase text-xs font-bold">{t('encryptKey.titleInput1')}</span>
              <Button variant="text" flat leftIcon={<TbReload className="text-neon" />} label={'generatePassword'} />
            </div>
            <div className="flex items-center mb-5">
              <Input
                placeholder={t('encryptKey.inputPrivateKeyPlaceholder')}
                onChange={handlePrivateKeyChange}
                value={actionData.privateKey}
                errorMessage={actionState.errors.privateKey}
              />
            </div>
            <Separator />
            <div className="w-full flex mt-5 mb-2">
              <span className="text-gray-100 uppercase text-xs font-bold">{t('encryptKey.titleInput2')}</span>
            </div>
            <div className="flex items-center mb-5">
              <Input
                type="password"
                placeholder={t('encryptKey.inputPassphrasePlaceholder')}
                onChange={handlePassphraseChange}
                value={actionData.passphrase}
                errorMessage={actionState.errors.passphrase}
              />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Button
              className="mt-8 w-full"
              type="submit"
              label={t('encryptKey.buttonGenerate')}
              loading={actionState.isActing}
              disabled={!actionState.isValid}
              leftIcon={<MdOutlineLock />}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
