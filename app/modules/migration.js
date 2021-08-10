// @flow
/* eslint-disable camelcase */
// import { api, sc, u, wallet, settings } from '@cityofzion/neon-js'
// import {
//   api as n3Api,
//   wallet as n3Wallet,
//   u as n3U,
//   rpc as n3Rpc,
//   tx,
// } from '@cityofzion/neon-js-next'
import { flatMap, keyBy, isEmpty, get, reject } from 'lodash-es'

import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from './notifications'
import {
  getNetwork,
  getWIF,
  getPublicKey,
  getSigningFunction,
  getAddress,
  getIsHardwareLogin,
  getAssetBalances,
  getTokenBalances,
} from '../core/deprecated'
import {
  isToken,
  validateTransactionsBeforeSending,
  getTokenBalancesMap,
} from '../core/wallet'
import { toNumber } from '../core/math'
import { getNode, getRPCEndpoint } from '../actions/nodeStorageActions'
import { addPendingTransaction } from '../actions/pendingTransactionActions'

const N2 = require('@cityofzion/neon-js-legacy-latest')
const N3 = require('@cityofzion/neon-js-next')

// TODO: will need to be dynamic based on network
const CGAS = '74f2dc36a68fdc4682034178eb2220729231db76'
const CNEO = 'c074a05e9dcf0141cbe6b4b3475dd67baf4dcb60'
const ProxyContract = '7997ac991b66ca3810602639a2f2c1bd985e8b5a'
const additionalInvocationGas = 0

export const performMigration = ({
  sendEntries,
}: {
  sendEntries: Array<SendEntryType>,
  fees: number,
  isWatchOnly?: boolean,
  chain: string,
}) => (dispatch: DispatchType, getState: GetStateType): Promise<*> => {
  // TODO: will need to be dynamic based on network
  // eslint-disable-next-line
  const provider = new N2.api.neoCli.instance('https://testnet1.neo2.coz.io')

  return new Promise(async (resolve, reject) => {
    try {
      const state = getState()
      const wif = getWIF(state)

      const TO_ACCOUNT = new N3.wallet.Account(wif)
      const FROM_ACCOUNT = new N2.wallet.Account(wif)

      const mintScript = N2.sc.createScript({
        // TODO: will need to be dynamic based on multiple factors and based on sendEntries param
        scriptHash: CGAS,
        operation: 'mintTokens',
        args: [],
      })

      const swapScript = N2.sc.createScript({
        scriptHash: ProxyContract,
        operation: 'lock',
        args: [
          N2.u.reverseHex(CGAS), // asset
          N2.u.reverseHex(FROM_ACCOUNT.scriptHash), // sender on original chain
          '58', // destination chain ID
          N2.u.reverseHex(TO_ACCOUNT.scriptHash), // recipient on new chain
          15, // amount
          0, // ?
          0, // ?
        ],
      })

      const gas = additionalInvocationGas
      const intent = N2.api.makeIntent(
        // must be .8 GAS more than you want to swap
        { GAS: 15 },
        N2.wallet.getAddressFromScriptHash(CGAS),
      )

      const CONFIG = {
        api: provider,
        account: FROM_ACCOUNT,
        intents: intent,
        script: mintScript + swapScript,
        gas,
      }

      const config = await N2.api.doInvoke(CONFIG)

      // eslint-disable-next-line
      if (config.response.hasOwnProperty('txid')) {
        // eslint-disable-next-line
        console.log(
          `Swap initiated to ${TO_ACCOUNT.address} in tx 0x${
            config.response.txid
          }`,
        )
      }
    } catch (e) {
      return reject(e)
    }
  })
}
