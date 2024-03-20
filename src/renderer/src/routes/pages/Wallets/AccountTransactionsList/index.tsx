import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { TransactionsTable } from '@renderer/components/TransactionsTable'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'
import { AccountDetailsLayout } from '@renderer/layouts/AccountDetailsLayout'

import { CommonAccountActions } from '../CommonAccountActions'

export const AccountTransactionsList = () => {
  const { accounts } = useAccountsSelector()
  const { address } = useParams()
  const { t } = useTranslation('pages', { keyPrefix: 'wallets.accountTransactionsList' })

  const account = useMemo(() => accounts.find(account => account.address === address)!, [accounts, address])

  return (
    <AccountDetailsLayout title={t('title')} actions={<CommonAccountActions account={account} />}>
      <TransactionsTable accounts={account ? [account] : []} />
    </AccountDetailsLayout>
  )
}
