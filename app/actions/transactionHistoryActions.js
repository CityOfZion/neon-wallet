// @flow
import { api } from 'neon-js'
import { createActions } from 'spunky'

import { COIN_DECIMAL_LENGTH } from '../core/formatters'
import { ASSETS } from '../core/constants'

type Props = {
  net: string,
  address: string
}

export const ID = 'TRANSACTION_HISTORY'

export default createActions(ID, ({ net, address }: Props = {}) => async (state: Object) => {
  const transactions = await api.getTransactionHistoryFrom({ net, address }, api.neoscan)

  return transactions.map(({ change, txid, ...rest }: TransactionHistoryType) => {
    const { NEO, GAS } = change

    return {
      txid,
      [ASSETS.NEO]: NEO ? NEO.toFixed(0) : '0',
      [ASSETS.GAS]: GAS ? GAS.round(COIN_DECIMAL_LENGTH).toString() : '0'
    }
  })
})
