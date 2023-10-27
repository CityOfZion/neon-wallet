import { Fragment } from 'react'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { AccountCard } from '@renderer/components/AccountCard'
import { Separator } from '@renderer/components/Separator'
import { useAppSelector } from '@renderer/hooks/useRedux'
import { selectAccountsByWalletId } from '@renderer/store/account/SelectorAccount'
import { Wallet } from '@renderer/store/wallet/Wallet'

type TProps = {
  selectedWallet: Wallet
  balanceExchange: UseMultipleBalanceAndExchangeResult
}

export const AccountList = ({ selectedWallet, balanceExchange }: TProps) => {
  const selectedAccounts = useAppSelector(selectAccountsByWalletId(selectedWallet.id))

  return (
    <div>
      {selectedAccounts.map(account => (
        <Fragment key={account.address}>
          <Separator />
          <AccountCard account={account} balanceExchange={balanceExchange} />
        </Fragment>
      ))}
    </div>
  )
}
