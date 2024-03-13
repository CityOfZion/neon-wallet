import { ChangeEvent, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { TbLink } from 'react-icons/tb'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { ReactComponent as NeonWalletLogo } from '@renderer/assets/images/neon-wallet-full.svg'
import { ReactComponent as WalletConnectLogo } from '@renderer/assets/images/wallet-connect.svg'
import { Button } from '@renderer/components/Button'
import { Input } from '@renderer/components/Input'
import { ToastHelper } from '@renderer/helpers/ToastHelper'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { useActions } from '@renderer/hooks/useActions'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { CenterModalLayout } from '@renderer/layouts/CenterModal'

type TFormData = {
  url: string
  isConnecting: boolean
}

export const DappConnectionModal = () => {
  const { connect, proposals } = useWalletConnectWallet()
  const { modalNavigate } = useModalNavigate()
  const { t } = useTranslation('modals', { keyPrefix: 'dappConnection' })
  const { actionData, setData, actionState, setError, handleAct } = useActions<TFormData>({
    url: '',
    isConnecting: false,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setData({ url: value })
  }

  const handleSubmit = async (data: TFormData) => {
    if (!WalletConnectHelper.isValidURI(data.url)) {
      setError('url', 'Invalid URI')
      return
    }

    try {
      setData({ isConnecting: true })
      await connect(data.url)
    } catch {
      ToastHelper.error({ message: t('errors.errorToConnect') })
      setData({ isConnecting: false })
    }
  }

  useEffect(() => {
    const proposal = proposals[0]
    if (!proposal) return

    modalNavigate('dapp-connection-details', { state: { proposal }, replace: true })
  }, [proposals, modalNavigate])

  return (
    <CenterModalLayout contentClassName="flex flex-col">
      <div className="flex w-full gap-x-12 items-center">
        <NeonWalletLogo className="w-full h-min" />

        <WalletConnectLogo className="w-full h-min opacity-60" />
      </div>

      <div>
        <div className="text-center px-8">
          <h2 className="text-2xl text-white mt-8">{t('title')}</h2>

          <p className="text-sm text-gray-100 mt-5">
            <Trans t={t} i18nKey="description" />
          </p>

          <p className="mt-2 text-blue italic text-xs leading-5">{t('disclaimer')}</p>
        </div>
      </div>

      <form className="mt-6 flex-grow flex flex-col items-center justify-between" onSubmit={handleAct(handleSubmit)}>
        <Input
          placeholder={t('inputPlaceholder')}
          clearable
          value={actionData.url}
          onChange={handleChange}
          errorMessage={actionState.errors.url}
        />
        <Button
          label={t('buttonConnectLabel')}
          leftIcon={<TbLink />}
          className="w-full max-w-[15.625rem]"
          loading={actionState.isActing || actionData.isConnecting}
        />
      </form>
    </CenterModalLayout>
  )
}
