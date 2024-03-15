import { useTranslation } from 'react-i18next'
import { MdChevronRight } from 'react-icons/md'
import { TbFileImport } from 'react-icons/tb'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { IWalletState } from '@renderer/@types/store'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Textarea } from '@renderer/components/Textarea'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useImportAction } from '@renderer/hooks/useImportAction'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TImportState = {
  onImportWallet?: (wallet: IWalletState) => void
}

export const ImportModal = () => {
  const { modalNavigate } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'import' })
  const { t: tCommon } = useTranslation('common', { keyPrefix: 'wallet' })
  const { onImportWallet } = useModalState<TImportState>()
  const { accountsRef } = useAccountsSelector()
  const { createWallet, importAccount } = useBlockchainActions()

  const submitKey = async (key: string) => {
    modalNavigate('import-key-accounts-selection', { state: { key, onImportWallet } })
  }

  const submitMnemonic = async (mnemonic: string) => {
    modalNavigate('import-mnemonic-accounts-selection', { state: { mnemonic, onImportWallet } })
  }

  const submitEncrypted = async (encryptedKey: string) => {
    modalNavigate('blockchain-selection', {
      state: {
        heading: t('title'),
        headingIcon: <TbFileImport />,
        description: t('importEncryptedDescription'),
        onSelect: (blockchain: TBlockchainServiceKey) => {
          modalNavigate('decrypt-key', {
            state: {
              encryptedKey,
              blockchain,
              onDecrypt: async (key: string, address: string) => {
                const addressAlreadyExist = accountsRef.current.some(acc => acc.address === address)

                if (addressAlreadyExist) {
                  throw new Error(t('addressAlreadyExist'))
                }

                const wallet = await createWallet({
                  name: tCommon('encryptedName'),
                  walletType: 'legacy',
                })
                await importAccount({ address, blockchain, wallet, key, type: 'legacy' })

                if (onImportWallet) onImportWallet(wallet)

                ToastHelper.success({ message: t('successEncryptKey') })
                modalNavigate(-3)
              },
            },
          })
        },
      },
    })
  }

  const submitAddress = async (address: string) => {
    modalNavigate('add-watch', { replace: true, state: { address } })
  }

  const { actionData, actionState, handleAct, handleChange, handleSubmit } = useImportAction({
    key: submitKey,
    mnemonic: submitMnemonic,
    encrypted: submitEncrypted,
    address: submitAddress,
  })

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbFileImport />} contentClassName="flex flex-col">
      <p className="text-gray-300 uppercase font-bold">{t('subtitle')}</p>
      <p className="text-xs">{t('description')}</p>

      <form className="mt-10 flex flex-col justify-between flex-grow" onSubmit={handleAct(handleSubmit)}>
        <div>
          <Textarea
            placeholder={t('inputPlaceholder')}
            error={!!actionState.errors.text}
            value={actionData.text}
            onChange={handleChange}
            compacted
            clearable
            multiline={actionData.inputType === 'mnemonic'}
          />

          <div className="mt-5">
            {actionState.errors.text ? (
              <Banner type="error" message={actionState.errors.text} />
            ) : (
              actionState.isValid &&
              actionData.inputType && <Banner type="success" message={t(`success.${actionData.inputType}` as const)} />
            )}
          </div>
        </div>

        <Button
          className="mt-8"
          type="submit"
          label={t('buttonContinueLabel')}
          rightIcon={<MdChevronRight />}
          loading={actionState.isActing}
          flat
        />
      </form>
    </EndModalLayout>
  )
}
