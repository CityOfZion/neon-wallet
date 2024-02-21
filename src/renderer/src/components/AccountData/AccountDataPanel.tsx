import { Fragment, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { UseMultipleBalanceAndExchangeResult } from '@renderer/@types/query'
import { IAccountState } from '@renderer/@types/store'
import { AdvancedTokenBalanceList } from '@renderer/components/AccountData/AdvancedTokenBalanceList'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { NftViewer } from './NftViewer'
import { TransactionList } from './TransactionList'

enum EAccountTabOption {
  TOKENS,
  NFTS,
  TRANSACTIONS,
}

type TAccountDataPanelProps = {
  accounts: IAccountState[]
  balanceExchange: UseMultipleBalanceAndExchangeResult
}

export const AccountDataPanel = ({ accounts, balanceExchange }: TAccountDataPanelProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'accountData' })
  const [selectedTabOption, setSelectedTabOption] = useState(EAccountTabOption.TOKENS)

  return (
    <Fragment>
      <div
        className={StyleHelper.mergeStyles('w-full flex flex-col items-center', {
          'mb-7': selectedTabOption !== EAccountTabOption.NFTS,
        })}
      >
        <div className="flex flex-row justify-between h-12 w-[20rem] border-b border-gray-300 text-1xs">
          <button
            className={StyleHelper.mergeStyles(
              'w-[33.34%] border-b border-transparent text-gray-300 hover:text-white hover:border-white',
              {
                'border-white text-white': selectedTabOption === EAccountTabOption.TOKENS,
              }
            )}
            onClick={() => setSelectedTabOption(EAccountTabOption.TOKENS)}
          >
            {t('tab.tokens')}
          </button>
          <button
            className={StyleHelper.mergeStyles(
              'w-[33.34%] border-b border-transparent text-gray-300 hover:text-white hover:border-white',
              {
                'border-white text-white': selectedTabOption === EAccountTabOption.NFTS,
              }
            )}
            onClick={() => setSelectedTabOption(EAccountTabOption.NFTS)}
          >
            {t('tab.nfts')}
          </button>
          <button
            className={StyleHelper.mergeStyles(
              'w-[33.34%] border-b border-transparent text-gray-300 hover:text-white hover:border-white',
              {
                'border-white text-white': selectedTabOption === EAccountTabOption.TRANSACTIONS,
              }
            )}
            onClick={() => setSelectedTabOption(EAccountTabOption.TRANSACTIONS)}
          >
            {t('tab.transactions')}
          </button>
        </div>
      </div>
      {selectedTabOption === EAccountTabOption.TOKENS && <AdvancedTokenBalanceList balanceExchange={balanceExchange} />}
      {selectedTabOption === EAccountTabOption.NFTS && <NftViewer accounts={accounts} />}
      {selectedTabOption === EAccountTabOption.TRANSACTIONS && <TransactionList accounts={accounts} />}
    </Fragment>
  )
}
