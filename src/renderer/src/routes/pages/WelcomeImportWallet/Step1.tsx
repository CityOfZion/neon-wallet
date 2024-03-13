import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { TUseImportActionInputType } from '@renderer/@types/hooks'
import { Button } from '@renderer/components/Button'
import { Textarea } from '@renderer/components/Textarea'
import { useImportAction } from '@renderer/hooks/useImportAction'

export const WelcomeImportWalletStep1Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet.step1' })
  const { t: commonT } = useTranslation('common')
  const navigate = useNavigate()

  const submit = async (input: string, inputType: TUseImportActionInputType) => {
    navigate('/welcome-import-wallet/2', { state: { input, inputType } })
  }

  const submitEncryptedKey = async () => {
    throw new Error(t('encryptedKeyIsNotSupported'))
  }

  const { actionData, actionState, handleAct, handleChange, handleSubmit } = useImportAction({
    encrypted: submitEncryptedKey,
    key: submit,
    mnemonic: submit,
    address: submit,
  })

  return (
    <Fragment>
      <p className="text-sm text-white mt-15">{t('formTitle')}</p>
      <form
        className="w-full flex-grow flex flex-col justify-between mt-6 items-center"
        onSubmit={handleAct(handleSubmit)}
      >
        <Textarea
          placeholder={t('inputPlaceholder')}
          error={!!actionState.errors.text}
          value={actionData.text}
          onChange={handleChange}
          pastable
          multiline={actionData.inputType === 'mnemonic'}
          errorMessage={actionState.errors.text}
        />

        <Button label={commonT('general.next')} className="w-64" type="submit" disabled={!actionState.isValid} />
      </form>
    </Fragment>
  )
}
