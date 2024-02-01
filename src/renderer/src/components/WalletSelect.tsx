import { useTranslation } from 'react-i18next'
import * as RadixSelect from '@radix-ui/react-select'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IWalletState } from '@renderer/@types/store'

import { Button } from './Button'
import { Select } from './Select'
import { Separator } from './Separator'
import { WalletCard } from './WalletCard'

type TItemProps = {
  wallet: IWalletState
  balanceExchange: UseMultipleBalanceAndExchangeResult
}

type TProps = {
  selected?: IWalletState
  disabled?: boolean
  onSelect?: (wallet: IWalletState) => void
  wallets: IWalletState[]
  balanceExchange: UseMultipleBalanceAndExchangeResult
  showCreateWalletButton?: boolean
  bgColor?: string
  radixContextClassName?: string
}

const Item = ({ wallet, balanceExchange }: TItemProps) => {
  return (
    <RadixSelect.Item value={wallet.id} className="outline-none">
      <Separator />
      <WalletCard wallet={wallet} balanceExchange={balanceExchange} />
    </RadixSelect.Item>
  )
}

export const WalletSelect = ({
  wallets,
  selected,
  onSelect,
  balanceExchange,
  disabled,
  showCreateWalletButton,
  bgColor,
  radixContextClassName,
}: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'walletSelect' })

  const handleValueChange = (value: string) => {
    const wallet = wallets.find(wallet => wallet.id === value)
    if (!wallet) return
    onSelect?.(wallet)
  }

  return (
    <Select.Root
      onSelect={handleValueChange}
      disabled={disabled}
      label={selected ? selected.name : t('placeholder')}
      bgColor={bgColor}
      title={t('title')}
      radixContextClassName={radixContextClassName}
    >
      {wallets.map(wallet => (
        <Item key={wallet.id} wallet={wallet} balanceExchange={balanceExchange} />
      ))}
      {(showCreateWalletButton === undefined || showCreateWalletButton === true) && (
        <div className="py-5 px-3">
          <Button className="w-full" label={t('createWalletButtonLabel')} variant="outlined" flat />
        </div>
      )}
    </Select.Root>
  )
}
