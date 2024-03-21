import { useTranslation } from 'react-i18next'
import { TbReload } from 'react-icons/tb'
import { TAccountsToImport, TBackupFormat } from '@renderer/@types/blockchain'
import { AlertErrorBanner } from '@renderer/components/AlertErrorBanner'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useActions } from '@renderer/hooks/useActions'
import { useBlockchainActions } from '@renderer/hooks/useBlockchainActions'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useAppDispatch } from '@renderer/hooks/useRedux'
import { EndModalLayout } from '@renderer/layouts/EndModal'
import { contactReducerActions } from '@renderer/store/reducers/ContactReducer'

type TFormData = {
  password: string
}

type TLocationState = {
  fileContent: string
}

const SuccessFooter = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'confirmPasswordRecover' })
  const { modalNavigateWrapper } = useModalNavigate()

  return (
    <div className="flex flex-col items-center flex-grow w-full justify-end gap-7">
      <Separator />
      <Button label={t('returnSettings')} onClick={modalNavigateWrapper(-1)} className="w-full px-9" />
    </div>
  )
}

export const ConfirmPasswordRecoverModal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'confirmPasswordRecover' })
  const { fileContent } = useModalState<TLocationState>()
  const dispatch = useAppDispatch()
  const { accountsRef } = useAccountsSelector()
  const { modalNavigate } = useModalNavigate()
  const { createWallet, importAccounts } = useBlockchainActions()

  const { actionData, actionState, handleAct, setDataFromEventWrapper, setError, reset } = useActions<TFormData>({
    password: '',
  })

  const handleSubmit = async ({ password }: TFormData) => {
    if (password.length === 0) {
      setError('password', t('error'))
      return
    }

    try {
      const contentDecrypted = await window.api.decryptBasedSecret(fileContent, password)
      const backupFile = JSON.parse(contentDecrypted) as TBackupFormat

      backupFile.contacts.forEach(contact => dispatch(contactReducerActions.saveContact(contact)))

      const importPromises = backupFile.wallets.map(async wallet => {
        const accountsToImport: TAccountsToImport = []
        wallet.accounts.forEach(account => {
          if (accountsRef.current.some(acc => acc.address === account.address)) return
          accountsToImport.push({ ...account, type: account.accountType })
        })
        if (accountsToImport.length === 0) return

        const newWallet = await createWallet(wallet)

        await importAccounts({ wallet: newWallet, accounts: accountsToImport })
      })

      await Promise.allSettled(importPromises)

      modalNavigate('success', {
        replace: true,
        state: {
          heading: t('title'),
          headingIcon: <TbReload className="text-neon" />,
          subtitle: t('modalDescription'),
          footer: <SuccessFooter />,
        },
      })
    } catch {
      ToastHelper.error({ message: t('error') })
      reset()
    }
  }

  return (
    <EndModalLayout
      heading={t('title')}
      headingIcon={<TbReload className="text-neon" />}
      contentClassName="flex flex-col"
    >
      <p className="text-xs mb-5">{t('description')}</p>
      <p className="text-gray-300 uppercase font-bold mb-3.5">{t('subtitle')}</p>

      <form className="flex flex-col justify-between flex-grow" onSubmit={handleAct(handleSubmit)}>
        <div>
          <Input
            placeholder={t('inputPlaceholder')}
            error={!!actionState.errors.password}
            value={actionData.password}
            onChange={setDataFromEventWrapper('password')}
            compacted
            type="password"
          />

          <div className="mt-5">
            {actionState.errors.password && <AlertErrorBanner message={actionState.errors.password} />}
          </div>
        </div>

        <div className="flex flex-col w-full items-center">
          <Separator className="my-7" />
          <Button className="w-60" type="submit" label={t('buttonContinueLabel')} loading={actionState.isActing} flat />
        </div>
      </form>
    </EndModalLayout>
  )
}
