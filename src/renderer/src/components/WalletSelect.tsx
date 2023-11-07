import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'
import * as RadixSelect from '@radix-ui/react-select'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IWalletState } from '@renderer/@types/store'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { Button } from './Button'
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
}

const Item = ({ wallet, balanceExchange }: TItemProps) => {
  return (
    <RadixSelect.Item value={wallet.id} className="outline-none">
      <Separator />
      <WalletCard wallet={wallet} balanceExchange={balanceExchange} />
    </RadixSelect.Item>
  )
}

export const WalletSelect = ({ wallets, selected, onSelect, balanceExchange, disabled }: TProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'walletSelect' })
  const [open, setOpen] = useState(false)

  const handleValueChange = (value: string) => {
    const wallet = wallets.find(wallet => wallet.id === value)
    if (!wallet) return
    onSelect?.(wallet)
  }

  return (
    <RadixSelect.Root onOpenChange={setOpen} open={open} onValueChange={handleValueChange} disabled={disabled}>
      <RadixSelect.Trigger
        aria-disabled={disabled}
        className={StyleHelper.mergeStyles(
          'flex items-center w-[11.625rem] min-w-[11.625rem] py-1.5 px-2.5 transition-colors outline-none rounded aria-[disabled=false]:hover:bg-gray-300/15 aria-[disabled=true]:opacity-50 aria-[disabled=true]:cursor-not-allowed',
          {
            'bg-gray-800 rounded-b-none': open,
            'hover:bg-gray-300/15': !disabled,
            '': disabled,
          }
        )}
      >
        <div className="flex flex-col pointer-events-none w-full text-left">
          <span className="text-xs text-gray-300 ">{t('title')}</span>
          <span className="text-sm text-white">{selected ? selected.name : t('placeholder')}</span>
        </div>
        <RadixSelect.Icon>
          {open ? <MdExpandLess className="fill-white w-6 h-6" /> : <MdExpandMore className="fill-white w-6 h-6" />}
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className="bg-gray-800 w-[11.625rem] min-w-[11.625rem] rounded-b shadow-xl"
          position="popper"
          align="end"
        >
          <RadixSelect.Viewport className="pt-2">
            {wallets.map(wallet => (
              <Item key={wallet.id} wallet={wallet} balanceExchange={balanceExchange} />
            ))}

            <div className="py-5 px-3">
              <Button className="w-full" label={t('createWalletButtonLabel')} variant="outlined" flat />
            </div>
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
