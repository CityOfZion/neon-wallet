// @flow
import { api } from 'neon-js'

import createRequestActions from '../util/api/createRequestActions'
import { toBigNumber } from '../core/math'
import { toFixedDecimals, COIN_DECIMAL_LENGTH } from '../core/formatters'
import { ASSETS } from '../core/constants'

type Props = {
  net: string,
  address: string
}

export const ID = 'TRANSACTION_HISTORY'

export default createRequestActions(ID, ({ net, address }: Props = {}) => async (state: Object) => {
  const transactions = await api.neonDB.getTransactionHistory(net, address)

  return transactions.map(({ NEO, GAS, txid }: TransactionHistoryType) => ({
    txid,
    [ASSETS.NEO]: toFixedDecimals(NEO, 0),
    [ASSETS.GAS]: toBigNumber(GAS).round(COIN_DECIMAL_LENGTH).toString()
  }))
})
