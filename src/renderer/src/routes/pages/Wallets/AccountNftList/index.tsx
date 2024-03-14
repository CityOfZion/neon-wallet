import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NftViewer } from '@renderer/components/BlockchainDataPanel/NftViewer'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { AccountDetailsLayout } from '@renderer/layouts/AccountDetailsLayout'

export const AccountNftList = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const { address } = useParams()
  const { accounts } = useAccountsSelector()
  const account = useMemo(() => accounts.find(account => account.address === address), [accounts, address])
  return (
    <AccountDetailsLayout title={t('nfts')} showButtons={false} account={account}>
      <ul className="flex flex-col min-h-0 flex-grow min-w-0 py-2">
        <NftViewer accounts={account ? [account] : []} />
      </ul>
    </AccountDetailsLayout>
  )
}
