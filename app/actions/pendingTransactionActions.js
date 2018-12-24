// @flow
import { createActions } from 'spunky'
import Neon from '@cityofzion/neon-js'
import { isEmpty } from 'lodash-es'

import { getStorage, setStorage } from '../core/storage'
import { getNode, getRPCEndpoint } from './nodeStorageActions'
import { findAndReturnTokenInfo } from '../util/findAndReturnTokenInfo'

export const ID = 'pendingTransactions'
const STORAGE_KEY = 'pendingTransactions'
const MINIMUM_CONFIRMATIONS = 40

type PendingTransactions = {
  [address: string]: Array<string>,
}

type PendingTransaction = {
  vout: Array<{ asset: string, address: string, value: string }>,
  confirmations: number,
  txid: number,
  net_fee: string,
  blocktime: number,
}

type ParsedPendingTransaction = {
  confirmations: number,
  txid: number,
  net_fee: string,
  blocktime: number,
  to: string,
  amount: string,
  asset: string,
}

export const parsePendingTxInfo = async (
  pendingTransactionsInfo: Array<PendingTransaction>,
  net: string,
) => {
  const parsedData: Array<ParsedPendingTransaction> = []
  // eslint-disable-next-line
  for (const transaction of pendingTransactionsInfo) {
    if (transaction) {
      // eslint-disable-next-line
      const { confirmations, txid, net_fee, blocktime = 0 } = transaction
      transaction.vout.pop()
      // eslint-disable-next-line
      for (const send of transaction.vout) {
        parsedData.push({
          confirmations,
          txid,
          net_fee,
          blocktime,
          amount: send.value,
          to: send.address,
          // eslint-disable-next-line no-await-in-loop
          asset: await findAndReturnTokenInfo(send.asset, net),
        })
      }
    }
  }
  const sortedByBlockTime = (
    a: ParsedPendingTransaction,
    b: ParsedPendingTransaction,
  ) => b.blocktime - a.blocktime
  const sorted: Array<ParsedPendingTransaction> = parsedData.sort(
    sortedByBlockTime,
  )
  return sorted
}

const getPendingTransactions = async (): Promise<PendingTransactions> =>
  getStorage(STORAGE_KEY)

const setPendingTransactions = async (
  pendingTransactions: PendingTransactions,
): Promise<any> => setStorage(STORAGE_KEY, pendingTransactions)

export const pruneConfirmedOrStaleTransaction = async (
  address: string,
  txId: string,
) => {
  const storage = await getPendingTransactions()
  if (Array.isArray(storage[address])) {
    storage[address] = storage[address].filter(
      transaction => transaction !== txId,
    )
  }
  await setPendingTransactions(storage)
}

export const addPendingTransaction = createActions(
  ID,
  ({ address, txId }) => async (): Promise<void> => {
    const transactions = await getPendingTransactions()

    if (Array.isArray(transactions[address])) {
      transactions[address].push(txId)
    } else {
      transactions[address] = []
    }
    await setPendingTransactions(transactions)
  },
)

export const getPendingTransactionInfo = createActions(
  ID,
  ({ address, net }) => async (): Promise<Array<Object>> => {
    const transactions = await getPendingTransactions()
    if (Array.isArray(transactions[address]) && transactions[address].length) {
      let url = await getNode(net)
      if (isEmpty(url)) {
        url = await getRPCEndpoint(net)
      }
      const client = Neon.create.rpcClient(url)

      const pendingTransactionInfo = []

      // eslint-disable-next-line
      for (const transaction of transactions[address]) {
        if (transaction) {
          // eslint-disable-next-line
          const result = await client
            .getRawTransaction(transaction, 1)
            .catch(async e => {
              console.error(
                e,
                'An transaction was added to storage that the blockchain does not recognize - purging from storage',
              )
              await pruneConfirmedOrStaleTransaction(address, transaction)
            })

          if (result.confirmations > MINIMUM_CONFIRMATIONS) {
            // eslint-disable-next-line
            await pruneConfirmedOrStaleTransaction(address, transaction)
          }
          pendingTransactionInfo.push(result)
        }
      }

      return parsePendingTxInfo(pendingTransactionInfo, net)
    }
    return []
  },
)

export default createActions(ID, () => async () => {
  const pendingTransactions = await getPendingTransactions()
  return pendingTransactions
})
