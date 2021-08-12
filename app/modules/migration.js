// @flow
import axios from 'axios'
import { keyBy } from 'lodash-es'
import { wallet } from '@cityofzion/neon-js'

import { getNode, getRPCEndpoint } from '../actions/nodeStorageActions'
import { addPendingTransaction } from '../actions/pendingTransactionActions'
import { getNetworkById, getTokenBalances, getWIF } from '../core/deprecated'
import {
  showErrorNotification,
  showInfoNotification,
  showSuccessNotification,
} from './notifications'

const N2 = require('@cityofzion/neon-js-legacy-latest')
const N3 = require('@cityofzion/neon-js-next')

const CGAS = '74f2dc36a68fdc4682034178eb2220729231db76'

// TODO: will need to be dynamic based on network
const NNEO = '17da3881ab2d050fea414c80b3fa8324d756f60e'
const ProxyContract = '7997ac991b66ca3810602639a2f2c1bd985e8b5a'
const additionalInvocationGas = 0

const populateTestNetBalances = async (address: string) => {
  const net = 'TestNet'

  const testnetBalances = await axios.get(
    `https://dora.coz.io/api/v1/neo2/testnet/get_balance/${address}`,
  )
  const parsedTestNetBalances = {}

  testnetBalances.data.balance.forEach(token => {
    parsedTestNetBalances[token.asset_symbol || token.symbol] = {
      name: token.asset_symbol || token.symbol,
      balance: token.amount,
      unspent: token.unspent,
    }
  })

  const Balance = new wallet.Balance({
    address,
    net,
  })

  Object.values(parsedTestNetBalances).forEach(
    // $FlowFixMe
    ({ name, balance, unspent }) => {
      if (name === 'GAS' || name === 'NEO') {
        Balance.addAsset(name, { balance, unspent })
      } else {
        Balance.addToken(name, balance)
      }
    },
  )

  return Balance
}

export const performMigration = ({
  sendEntries,
}: {
  sendEntries: Array<SendEntryType>,
}) => (dispatch: DispatchType, getState: GetStateType): Promise<*> =>
  // TODO: will need to be dynamic based on network
  // eslint-disable-next-line
  // const provider = new N2.api.neoCli.instance('https://testnet1.neo2.coz.io')

  new Promise(async (resolve, reject) => {
    try {
      dispatch(
        showInfoNotification({
          message: 'Broadcasting transaction to network...',
          autoDismiss: 0,
        }),
      )

      const state = getState()
      const wif = getWIF(state)

      const tokenBalances = getTokenBalances(state)
      const tokensBalanceMap = keyBy(tokenBalances, 'symbol')
      const TO_ACCOUNT = new N3.wallet.Account(wif)
      const FROM_ACCOUNT = new N2.wallet.Account(wif)
      const entry = sendEntries[0]

      // eslint-disable-next-line
      const net = state.spunky.network.data == 1 ? 'MainNet' : 'TestNet'

      let endpoint = await getNode(net)
      if (!endpoint) {
        endpoint = await getRPCEndpoint(net)
      }

      // eslint-disable-next-line
      const provider = new N2.api.neoCli.instance(endpoint)

      const { symbol, amount } = entry

      const determineIfCGASMintRequired = () => {
        const userMustPayFee =
          (symbol === 'NEO' && Number(amount) < 10) ||
          (symbol === 'GAS' && Number(amount) < 20)

        const userHasLessThanOneCGAS = tokensBalanceMap.CGAS
          ? tokensBalanceMap.CGAS.balance.lt(1)
          : true

        return userMustPayFee && userHasLessThanOneCGAS
      }

      const hasBalanceForRequiredFee = (MIN_FEE = 1) => {
        if (
          !tokensBalanceMap.GAS ||
          (tokensBalanceMap.GAS && tokensBalanceMap.GAS.balance.lt(MIN_FEE))
        ) {
          return false
        }
        return true
      }

      const MINT_REQUIRED = symbol === 'NEO' || symbol === 'GAS'
      const CGAS_MINT_REQUIRED = determineIfCGASMintRequired()

      if (CGAS_MINT_REQUIRED) {
        if (!hasBalanceForRequiredFee()) {
          const generateMinRequirementString = () => {
            const requirementMap = {
              GAS: ' OR migrate at least 20 GAS.',
              NEO: ' OR migrate at least 10 NEO.',
              OTHER: '.',
            }

            if (requirementMap[symbol]) {
              return requirementMap[symbol]
            }
            return requirementMap.OTHER
          }
          const message = `Account does not have enough to cover the 1 GAS fee... Please transfer at least 1 GAS to ${
            FROM_ACCOUNT.address
          } to proceed${generateMinRequirementString()}`
          const error = new Error(message)
          dispatch(
            showErrorNotification({
              message,
              autoDismiss: 10000,
            }),
          )
          return reject(error)
        }
      }

      const mintScript = N2.sc.createScript({
        scriptHash: symbol === 'NEO' ? NNEO : CGAS,
        operation: 'mintTokens',
        args: [],
      })

      const swapScript = N2.sc.createScript({
        scriptHash: ProxyContract,
        operation: 'lock',
        args: [
          N2.u.reverseHex(symbol === 'NEO' || symbol === 'nNEO' ? NNEO : CGAS), // asset
          N2.u.reverseHex(FROM_ACCOUNT.scriptHash), // sender on original chain
          '58', // destination chain ID
          N2.u.reverseHex(TO_ACCOUNT.scriptHash), // recipient on new chain
          Number(amount) * 100000000, // amount
          0, // ?
          0, // ?
        ],
      })

      const gas = additionalInvocationGas

      const CONFIG = {
        api: provider,
        account: FROM_ACCOUNT,
        script: MINT_REQUIRED ? mintScript + swapScript : swapScript,
        intents: undefined,
        gas,
        balance: null,
      }

      if (net === 'TestNet') {
        CONFIG.balance = await populateTestNetBalances(FROM_ACCOUNT.address)
      }

      if (MINT_REQUIRED) {
        const mintAmount = {
          [symbol]: Number(amount),
        }
        // If a CGAS mint is required and the user
        // is migrating GAS we add 1 to the mint amount
        // (the min recommended fee required)
        if (symbol === 'GAS' && CGAS_MINT_REQUIRED) {
          // $FlowFixMe
          mintAmount.GAS += 1
        }

        const mintIntents = N2.api.makeIntent(
          mintAmount,
          N2.wallet.getAddressFromScriptHash(
            symbol === 'GAS' || symbol === 'CGAS' ? CGAS : NNEO,
          ),
        )
        // If a CGAS mint is required and the user
        // is migrating a different token (NEO, CGAS, or NNEO)
        // we still need to create a CGAS mint intent
        // so they can pay the minimum required fee
        if (CGAS_MINT_REQUIRED && symbol !== 'GAS') {
          // $FlowFixMe
          const mintGasFeeIntents = N2.api.makeIntent(
            1,
            N2.wallet.getAddressFromScriptHash(CGAS),
          )
          CONFIG.intents = mintGasFeeIntents + mintIntents
        } else {
          CONFIG.intents = mintIntents
        }
      }

      const config = await N2.api.doInvoke(CONFIG).catch(e => {
        dispatch(
          showErrorNotification({
            message: `Oops something went wrong please try again... ${
              e.message
            }`,
          }),
        )
        return reject(e)
      })

      // eslint-disable-next-line
      if (config.response.hasOwnProperty('txid')) {
        // eslint-disable-next-line
        console.log(
          `Swap initiated to ${TO_ACCOUNT.address} in tx 0x${
            config.response.txid
          }`,
        )

        dispatch(
          showSuccessNotification({
            message:
              'Transaction pending! Your balance will automatically update when the blockchain has processed it.',
          }),
        )

        dispatch(
          addPendingTransaction.call({
            address: config.account.address,
            tx: {
              hash: config.response.txid,
              sendEntries,
            },
            net,
          }),
        )

        return resolve()
      }
    } catch (e) {
      showErrorNotification({
        message: `Oops something went wrong please try again... ${e.message}`,
      })
      return reject(e)
    }
  })
