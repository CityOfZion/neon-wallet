import { useTranslation } from 'react-i18next'
import { TbPlugX, TbPlus } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { Button } from '@renderer/components/Button'
import { ConnectionsTable } from '@renderer/components/ConnectionsTable'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { AccountDetailsLayout } from '@renderer/layouts/AccountDetailsLayout'

export const AccountConnections = () => {
  const { sessions } = useWalletConnectWallet()
  const { modalNavigateWrapper } = useModalNavigate()

  const { t } = useTranslation('pages', { keyPrefix: 'wallets.accountConnections' })
  const { address } = useParams()

  const filteredSessions = sessions.filter(session =>
    WalletConnectHelper.getAccountInformationFromSession(session).address.includes(address ?? '')
  )

  return (
    <AccountDetailsLayout
      actions={
        <div className="flex items-center gap-2">
          <span className="text-gray-300 mr-2">{t('totalConnections', { connections: filteredSessions.length })}</span>

          <Button
            variant="text"
            label={t('newConnection')}
            leftIcon={<TbPlus />}
            flat
            onClick={modalNavigateWrapper('dapp-connection')}
          />

          <Button
            variant="text"
            label={t('disconnectAll')}
            leftIcon={<TbPlugX />}
            flat
            colorSchema="error"
            disabled={filteredSessions.length === 0}
            onClick={modalNavigateWrapper('dapp-disconnection', { state: { sessions: filteredSessions } })}
          />
        </div>
      }
      title={t('title')}
    >
      <ConnectionsTable
        hasAddress={false}
        sessions={filteredSessions}
        tableHeaderClassName="bg-gray-950"
        className="mt-5"
      />
    </AccountDetailsLayout>
  )
}
