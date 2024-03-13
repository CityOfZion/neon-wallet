import { useTranslation } from 'react-i18next'
import { TbPlugX, TbPlus } from 'react-icons/tb'
import { useParams } from 'react-router-dom'
import { useWalletConnectWallet } from '@cityofzion/wallet-connect-sdk-wallet-react'
import { Button } from '@renderer/components/Button'
import { ConnectionsTable } from '@renderer/components/ConnectionsTable'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { WalletConnectHelper } from '@renderer/helpers/WalletConnectHelper'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { useWalletsSelector } from '@renderer/hooks/useWalletSelector'

export const ConnectionsPage = () => {
  const { sessions } = useWalletConnectWallet()
  const { modalNavigateWrapper } = useModalNavigate()
  const { accounts } = useAccountsSelector()
  const { wallets } = useWalletsSelector()
  const { t } = useTranslation('pages', { keyPrefix: 'connections' })
  const { address } = useParams()

  const filteredSessions = sessions.filter(session =>
    address
      ? WalletConnectHelper.getAccountInformationFromSession(session).address.includes(address)
      : session.peer.metadata.name.toLowerCase()
  )

  return (
    <div
      className={StyleHelper.mergeStyles('w-full flex flex-col py-3 flex-grow min-h-0 px-4 min-w-0', {
        'bg-gray-800 rounded shadow-lg': !address,
      })}
    >
      <div className="flex justify-between items-center text-sm mb-3 max-h-[1.75rem] h-full">
        <h1 className="text-white text-sm">{address ? t('connections') : t('allConnections')}</h1>
        <div className="flex justify-end items-center gap-4">
          {address ? (
            <>
              <span className="text-gray-300">{t('totalConnections', { connections: filteredSessions.length })}</span>
              <Button
                variant="text-slim"
                label={t('newConnection')}
                leftIcon={<TbPlus />}
                flat
                onClick={modalNavigateWrapper('dapp-connection')}
              />
              {filteredSessions.length > 0 && (
                <Button
                  variant="text-slim"
                  label={t('disconnectAll')}
                  leftIcon={<TbPlugX />}
                  flat
                  colorSchema="error"
                  onClick={modalNavigateWrapper('dapp-disconnection', { state: { sessions: filteredSessions } })}
                />
              )}
            </>
          ) : (
            <span className="text-gray-300">
              {t('walletsAndAccounts', { wallets: wallets.length, accounts: accounts.length })}
            </span>
          )}
        </div>
      </div>

      <Separator />

      <div className="mt-7 flex-grow flex flex-col min-h-0">
        {!address && filteredSessions.length > 0 && (
          <div className="flex flex-row justify-between">
            <Button
              variant="text-slim"
              label={t('disconnectAll')}
              leftIcon={<TbPlugX />}
              flat
              colorSchema="error"
              onClick={modalNavigateWrapper('dapp-disconnection', { state: { sessions: filteredSessions } })}
            />
            <p className="text-gray-100 text-sm">{t('totalConnections', { connections: filteredSessions.length })}</p>
          </div>
        )}
        <ConnectionsTable
          hasAddress={!address}
          sessions={filteredSessions}
          tableHeaderClassName={address ? 'bg-gray-950' : 'bg-gray-800'}
        />
      </div>
    </div>
  )
}
