// @flow
import axios from 'axios'
import { api } from 'neon-js'
import { createActions } from 'spunky'
import { filter, reduce } from 'lodash'

import { COIN_DECIMAL_LENGTH } from '../core/formatters'
import { ASSETS } from '../core/constants'
import { toBigNumber } from '../core/math'
import { getDefaultTokens } from '../core/nep5'

export const NEO_ID =
  'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'
export const GAS_ID =
  '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7'

type Props = {
  net: string,
  address: string
}

function sum(txns, address, asset) {
  const matchingTxns = filter(
    txns,
    txn => txn.asset === asset && txn.address_hash === address
  )

  return reduce(matchingTxns, (sum, txn) => sum.plus(txn.value), toBigNumber(0))
}

// function calculateSummary(vouts, vin, address) {
//   const summary = {
//     out: [],
//     in: [],
//   }

//   const matchingTxns = []

//   vouts.forEach(tx => {
//     const token = tokens.find(token => token.scriptHash === tx.asset)
//     matchingTxns.push(...vouts.filter(txn => txn.asset === token.scriptHash && txn.address_hash === address))
//   })

//   reduce(matchingTxns, (sum, txn) => sum.plus(txn.value), toBigNumber(0))

// }

export const ID = 'transactionHistory'

export default createActions(
  ID,
  ({ net, address }: Props = {}) => async (state: Object) => {
    // $FlowFixMe
    const tokens = await getDefaultTokens()

    const endpoint = api.neoscan.getAPIEndpoint(net)
    const { data } = await axios.get(
      `${endpoint}/v1/get_last_transactions_by_address/${address}`
    )

    return data.map(({ txid, vin, vouts, type, time }) => {
      const summary = {
        [ASSETS.NEO]: {
          out: sum(vouts, address, NEO_ID).toFixed(),
          in: vin.length ? sum(vin, address, NEO_ID).toFixed() : 0,
          total: sum(vouts, address, NEO_ID)
            .minus(sum(vin, address, NEO_ID))
            .toFixed(0)
        },
        [ASSETS.GAS]: {
          out: sum(vouts, address, GAS_ID)
            .round(COIN_DECIMAL_LENGTH)
            .toString(),
          in: sum(vin, address, GAS_ID)
            .round(COIN_DECIMAL_LENGTH)
            .toString(),
          total: sum(vouts, address, GAS_ID)
            .minus(sum(vin, address, GAS_ID))
            .round(COIN_DECIMAL_LENGTH)
            .toString()
        }
      }

      tokens.forEach(token => {
        const ins = sum(vouts, address, token.scriptHash)
          .round(COIN_DECIMAL_LENGTH)
          .toString()
        const out = sum(vin, address, token.scriptHash)
          .round(COIN_DECIMAL_LENGTH)
          .toString()
        const total = sum(vouts, address, token.scriptHash)
          .minus(sum(vin, address, token.scriptHash))
          .round(COIN_DECIMAL_LENGTH)
          .toString()

        if (total !== '0') {
          summary[token.symbol] = {
            out,
            in: ins,
            total
          }
        }
      })

      return {
        txid,
        summary,
        [ASSETS.NEO]: sum(vouts, address, NEO_ID)
          .minus(sum(vin, address, NEO_ID))
          .toFixed(0),
        [ASSETS.GAS]: sum(vouts, address, GAS_ID)
          .minus(sum(vin, address, GAS_ID))
          .round(COIN_DECIMAL_LENGTH)
          .toString(),
        type,
        time
      }
    })
  }
)
