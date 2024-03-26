import { useTranslation } from 'react-i18next'
import { MdDownload, MdOutlineSave } from 'react-icons/md'
import { TAccountBackupFormat, TBackupFormat, TWalletBackupFormat } from '@renderer/@types/blockchain'
import { AlertErrorBanner } from '@renderer/components/AlertErrorBanner'
import { Banner } from '@renderer/components/Banner'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { Separator } from '@renderer/components/Separator'
import { DateHelper } from '@renderer/helpers/DateHelper'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useActions } from '@renderer/hooks/useActions'
import { useContactsSelector } from '@renderer/hooks/useContactSelector'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { useEncryptedPasswordSelector } from '@renderer/hooks/useSettingsSelector'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TFormData = {
  password: string
}

type TLocationState = {
  selectedFilePath: string
}

const SuccessFooter = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'confirmPasswordBackup' })
  const { modalNavigateWrapper } = useModalNavigate()
  return <div className="flex flex-col items-center flex-grow w-full justify-end gap-7">
  <Button
    label={t('downloadQRCodePassword')}
    leftIcon={<MdDownload />}
    variant="outlined"
    className="w-full px-9"
    flat
    iconsOnEdge={false}
    disabled
  />
  <Separator />
  <Button label={t('returnSettings')} onClick={modalNavigateWrapper(-1)} className="w-full px-9" />
</div>
}

export const ConfirmPasswordBackupModal = () => {
  const { encryptedPassword } = useEncryptedPasswordSelector()
  const { t } = useTranslation('modals', { keyPrefix: 'confirmPasswordBackup' })
  const { contacts } = useContactsSelector()
  const { wallets } = useWalletsSelector()
  const { accounts } = useAccountsSelector()
  const { selectedFilePath } = useModalState<TLocationState>()
  const { modalNavigate } = useModalNavigate()

  const { actionData, actionState, handleAct, setDataFromEventWrapper, setError } = useActions<TFormData>({
    password: '',
  })

  const handleSubmit = async ({ password }: TFormData) => {
    const decryptedPassword = await window.api.decryptBasedOS(encryptedPassword ?? '')
    if (password.length === 0 || password !== decryptedPassword) {
      setError('password', t('error'))
      return
    }

    try {
      const backupFile: TBackupFormat = { wallets: [], contacts: [] }
      backupFile.contacts = contacts

      const walletsToBackupPromises = wallets.map(async (wallet): Promise<TWalletBackupFormat> => {
        const accountsToBackupPromises = accounts
          .filter(account => account.idWallet === wallet.id)
          .map(
            async (account): Promise<TAccountBackupFormat> => ({
              accountType: account.accountType,
              address: account.address,
              backgroundColor: account.backgroundColor,
              blockchain: account.blockchain,
              idWallet: account.accountType,
              name: account.name,
              order: account.order,
              key: account.encryptedKey
                ? await window.api.decryptBasedEncryptedSecret(account.encryptedKey)
                : undefined,
            })
          )

        const accountsToBackup = await Promise.all(accountsToBackupPromises)

        return {
          id: wallet.id,
          name: wallet.name,
          walletType: wallet.walletType,
          mnemonic: wallet.encryptedMnemonic
            ? await window.api.decryptBasedEncryptedSecret(wallet.encryptedMnemonic)
            : '',
          accounts: accountsToBackup,
        }
      })

      const walletsToBackup = await Promise.all(walletsToBackupPromises)

      backupFile.wallets = walletsToBackup

      const content = await window.api.encryptBasedSecret(JSON.stringify(backupFile), decryptedPassword)

      window.api.saveFile(`${selectedFilePath}/NEON3-Backup-${DateHelper.getNowUnix()}`, content)
      modalNavigate('success', {
        replace: true,
        state: {
          heading: t('title'),
          headingIcon: <MdOutlineSave className="text-neon" />,
          subtitle: t('modalDescription'),
          footer: <SuccessFooter />,
        },
      })
    } catch {
      ToastHelper.error({ message: t('errorBackup') })
    }
  }

  return (
    <EndModalLayout
      heading={t('title')}
      headingIcon={<MdOutlineSave className="text-neon" />}
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
          <Banner
            type="warningOrange"
            message={
              <span>
                {t('warning')}
                <span className="text-orange pl-0.75">{t('warningHighlighted')}</span>
              </span>
            }
          />
          <Separator className="my-7" />
          <Button
            className="px-9 w-full"
            type="submit"
            label={t('buttonContinueLabel')}
            loading={actionState.isActing}
            flat
          />
        </div>
      </form>
    </EndModalLayout>
  )
}
