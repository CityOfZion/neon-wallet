import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { TbFileImport } from 'react-icons/tb'
import { Location, useLocation, useNavigate } from 'react-router-dom'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { TUseImportActionInputType } from '@renderer/@types/hooks'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Textarea } from '@renderer/components/Textarea'
import { useImportAction } from '@renderer/hooks/useImportAction'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'

type TLocationState = {
  password: string
}

export const WelcomeImportWalletStep3Page = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet.step3' })
  const { t: commonT } = useTranslation('common')
  const navigate = useNavigate()
  const { state } = useLocation() as Location<TLocationState>
  const { modalNavigate } = useModalNavigate()

  const submit = async (input: string, inputType: TUseImportActionInputType) => {
    navigate('/welcome-import-wallet/4', { state: { input, inputType, password: state.password } })
  }

  const submitEncryptedKey = async (input: string, inputType: TUseImportActionInputType) => {
    modalNavigate('blockchain-selection', {
      state: {
        heading: t('importEncryptedTitle'),
        headingIcon: <TbFileImport />,
        description: t('importEncryptedDescription'),
        subtitle: t('importEncryptedSubtitle'),
        withBackButton: false,
        onSelect: (blockchain: TBlockchainServiceKey) => {
          modalNavigate('decrypt-key', {
            state: {
              encryptedKey: input,
              blockchain,
              onDecrypt: async (key: string) => {
                modalNavigate(-2)
                navigate('/welcome-import-wallet/4', { state: { input: key, inputType, password: state.password } })
              },
            },
          })
        },
      },
    })
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
        <div className="flex flex-col w-full gap-5">
          <Textarea
            placeholder={t('inputPlaceholder')}
            error={!!actionState.errors.text}
            value={actionData.text}
            onChange={handleChange}
            pastable
            clearable
            multiline={actionData.inputType === 'mnemonic'}
            errorMessage={actionState.errors.text}
          />

          {actionData.inputType === 'encrypted' && <Banner type="warning" message={t('encryptedKeyMessage')} />}
        </div>

        <Button label={commonT('general.next')} className="w-64" type="submit" disabled={!actionState.isValid} />
      </form>
    </Fragment>
  )
}
