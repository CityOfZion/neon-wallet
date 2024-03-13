import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { NftViewer } from '@renderer/components/BlockchainDataPanel/NftViewer'
import { Separator } from '@renderer/components/Separator'
import { useAccountsSelector } from '@renderer/hooks/useAccountSelector'

export const AccountNftList = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'wallets' })
  const { address } = useParams()
  const { accounts } = useAccountsSelector()
  const account = useMemo(() => accounts.find(account => account.address === address), [accounts, address])
  return (
    <div className="w-full flex flex-col flex-grow px-4 py-3 min-h-0">
      <div className="flex justify-between items-center text-sm mb-3 max-h-[1.75rem] h-full">
        <h1 className="text-white text-sm">{t('nfts')}</h1>
      </div>

      <Separator />

      <ul className="flex flex-col min-h-0 flex-grow min-w-0 py-2">
        <NftViewer accounts={account ? [account] : []} />
      </ul>
    </div>
  )
}
