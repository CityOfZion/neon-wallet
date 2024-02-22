import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MdContentCopy } from 'react-icons/md'
import { TbChevronRight } from 'react-icons/tb'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TransactionResponse } from '@cityofzion/blockchain-service'
import { IAccountState } from '@renderer/@types/store'
import { DateHelper } from '@renderer/helpers/DateHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useBsAggregatorSelector } from '@renderer/hooks/useBlockchainSelector'

import { IconButton } from '../IconButton'
import { TransactionsTableEmpty } from '../TransactionsTableEmpty'

type TTransactionListProps = {
  accounts: IAccountState[]
}

export const TransactionList = ({ accounts }: TTransactionListProps) => {
  const { t } = useTranslation('components', { keyPrefix: 'transactionList' })
  const { bsAggregator } = useBsAggregatorSelector()
  const [transactions, setTransactions] = useState<TransactionResponse[]>([])

  const handleCopyHash = async (hash: string) => {
    await navigator.clipboard.writeText(hash)
  }

  const hashToContractName = (address: string, contractHash: string): string => {
    // const contract = await bsAggregator.getBlockchainByAddress(address)?.blockchainDataService.getContract(contractHash)
    // return contract?.name ?? ''
    return address === contractHash ? 'BurgerNEO' : 'GasToken'
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await bsAggregator.blockchainServicesByName[
        accounts[0].blockchain
      ].blockchainDataService.getTransactionsByAddress({
        address: accounts[0].address,
        page: 1,
      })

      setTransactions(response.transactions)
    }

    fetchData()
  }, [accounts, bsAggregator.blockchainServicesByName])

  return transactions.length > 0 ? (
    <InfiniteScroll
      dataLength={transactions.length}
      next={() => {}}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      refreshFunction={() => {}}
    >
      <table className="min-w-full text-xs text-left justify-evenly">
        <thead>
          <tr className="text-gray-100 opacity-75">
            <th className="pl-4 w-[5.5rem]">{t('date')}</th>
            <th className="w-[4.5rem]">{t('time')}</th>
            <th className="w-[5rem]">{t('name')}</th>
            <th className="w-[30.5rem]">{t('hash')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tr, index) => (
            <tr
              key={index}
              className={StyleHelper.mergeStyles({
                'bg-gray-300 bg-opacity-15': index % 2 !== 0,
              })}
            >
              <td className="pl-4">{DateHelper.timeToDate(tr.time)}</td>
              <td>{DateHelper.timeToHour(tr.time)}</td>
              <td>{hashToContractName(tr.transfers[0].from, tr.transfers[0].contractHash)}</td>
              <td>
                <div className="flex items-center justify-between">
                  {tr.hash}
                  <IconButton
                    icon={<MdContentCopy className="fill-neon w-6 h-6" />}
                    onClick={() => handleCopyHash(tr.hash)}
                    type="button"
                  />
                </div>
              </td>
              <td>
                <div className="flex items-center">
                  <span className="text-neon leading-[0.1rem]">{t('view')}</span>
                  <TbChevronRight className="w-6 h-6 text-gray-300" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  ) : (
    <TransactionsTableEmpty />
  )
}
