import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IWalletState } from '@renderer/@types/store'
import { ReactComponent as NeonWalletIcon3D } from '@renderer/assets/images/neon-wallet-icon-3d.svg'
import { Button } from '@renderer/components/Button'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { CreateWalletModalLayout } from '@renderer/layouts/CreateWalletModalLayout'

type TLocationState = {
  wallet: IWalletState
}

export const CreateWalletStep4Modal = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'createWallet.step4' })
  const { wallet } = useModalState<TLocationState>()
  const { accounts } = useAccountsSelector()
  const { modalNavigate } = useModalNavigate()
  const navigate = useNavigate()

  const handleNavigate = () => {
    const firstAccount = accounts.find(account => account.idWallet === wallet.id)
    if (firstAccount) {
      modalNavigate(-4)
      navigate('/wallets', { state: { wallet } })
    }
  }

  return (
    <CreateWalletModalLayout>
      <div className="flex flex-col items-center w-full h-full justify-between">
        <div className="flex flex-col w-full gap-2.5 px-28 items-center justify-center h-full">
          <NeonWalletIcon3D />
          <div className="text-white text-lg text-center">{t('title')}</div>
          <div className="text-gray-100 text-xs text-center">{t('description')}</div>
        </div>

        <Button
          className="w-48 mb-5"
          type="submit"
          label={t('viewWalletButtonLabel')}
          flat
          onClick={() => handleNavigate()}
        />
      </div>
    </CreateWalletModalLayout>
  )
}
