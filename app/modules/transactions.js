// @flow
/* eslint-disable camelcase */
import { api, sc, u, wallet, settings } from '@cityofzion/neon-js'
import { flatMap, keyBy, isEmpty, get } from 'lodash-es'

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

export const DEFAULT_RPC_TIMEOUT = 60000
settings.timeout.rpc = DEFAULT_RPC_TIMEOUT

const extractTokens = (sendEntries: Array<SendEntryType>) =>
  sendEntries.filter(({ symbol }) => isToken(symbol))

const extractAssets = (sendEntries: Array<SendEntryType>) =>
  sendEntries.filter(({ symbol }) => !isToken(symbol))

const buildIntents = (sendEntries: Array<SendEntryType>) => {
  const assetEntries = extractAssets(sendEntries)
  // $FlowFixMe
  return flatMap(assetEntries, ({ address, amount, symbol }) =>
    api.makeIntent({ [symbol]: toNumber(amount) }, address),
  )
}

const buildTransferScript = (
  net: NetworkType,
  sendEntries: Array<SendEntryType>,
  fromAddress: string,
  tokensBalanceMap: {
    [key: string]: TokenBalanceType,
  },
) => {
  const tokenEntries = extractTokens(sendEntries)
  const fromAcct = new wallet.Account(fromAddress)
  const scriptBuilder = new sc.ScriptBuilder()

  tokenEntries.forEach(({ address, amount, symbol }) => {
    const toAcct = new wallet.Account(address)
    const { scriptHash, decimals } = tokensBalanceMap[symbol]
    const args = [
      u.reverseHex(fromAcct.scriptHash),
      u.reverseHex(toAcct.scriptHash),
      sc.ContractParam.byteArray(toNumber(amount), 'fixed8', decimals),
    ]

    scriptBuilder.emitAppCall(scriptHash, 'transfer', args)
  })

  return scriptBuilder.str
}

const makeRequest = (
  sendEntries: Array<SendEntryType>,
  config: Object,
  script: string,
) => {
  // NOTE: We purposefully mutate the contents of config
  // because neon-js will also mutate this same object by reference
  config.intents = buildIntents(sendEntries)
  if (script === '') {
    return api.sendAsset(config, api.neoscan)
  }
  config.script = script
  config.gas = 0
  return api.doInvoke(config, api.neoscan)
}

export const generateBalanceInfo = (
  tokensBalanceMap: any,
  address: string,
  net: NetworkType,
) => {
  const Balance = new wallet.Balance({ address, net })
  // $FlowFixMe
  Object.values(tokensBalanceMap).forEach(({ name, balance }) => {
    Balance.addAsset(name, { balance, unspent: [] })
  })
}

export const sendTransaction = ({
  sendEntries,
  fees,
}: {
  sendEntries: Array<SendEntryType>,
  fees: number,
}) => (dispatch: DispatchType, getState: GetStateType): Promise<*> =>
  new Promise(async (resolve, reject) => {
    const state = getState()
    const wif = getWIF(state)
    const fromAddress = getAddress(state)
    const net = getNetwork(state)
    const tokenBalances = getTokenBalances(state)
    const tokensBalanceMap = keyBy(tokenBalances, 'symbol')
    const balances = {
      ...getAssetBalances(state),
      ...getTokenBalancesMap(tokenBalances),
    }
    const signingFunction = getSigningFunction(state)
    const publicKey = getPublicKey(state)
    const isHardwareSend = getIsHardwareLogin(state)
    let url = await getNode(net)
    if (isEmpty(url)) {
      url = await getRPCEndpoint(net)
    }

    const rejectTransaction = (message: string) =>
      dispatch(showErrorNotification({ message }))

    const error = validateTransactionsBeforeSending(balances, sendEntries)

    if (error) {
      console.error({ error })
      rejectTransaction(error)
      return reject(error)
    }

    dispatch(
      showInfoNotification({
        message: 'Sending Transaction...',
        autoDismiss: 0,
      }),
    )

    if (isHardwareSend) {
      dispatch(
        showInfoNotification({
          message: 'Please sign the transaction on your hardware device',
          autoDismiss: 0,
        }),
      )
    }

    const config = {
      net,
      tokensBalanceMap,
      address: fromAddress,
      publicKey,
      privateKey: new wallet.Account(wif).privateKey,
      signingFunction: isHardwareSend ? signingFunction : null,
      fees,
      url,
      balance: undefined,
    }
    const balanceResults = await api
      .getBalanceFrom({ net, address: fromAddress }, api.neoscan)
      .catch(e => {
        // indicates that neo scan is down and that api.sendAsset and api.doInvoke
        // will fail unless balances are supplied
        console.error(e)
        config.balance = generateBalanceInfo(tokensBalanceMap, fromAddress, net)
      })
    if (balanceResults) config.balance = balanceResults.balance

    try {
      const script = buildTransferScript(
        config.net,
        sendEntries,
        config.address,
        // $FlowFixMe
        config.tokensBalanceMap,
      )
      const { response } = await makeRequest(sendEntries, config, script)

      if (!response.result) {
        throw new Error('Rejected by RPC server.')
      }

      dispatch(
        showSuccessNotification({
          message:
            'Transaction complete! Your balance will automatically update when the blockchain has processed it.',
        }),
      )
      return resolve(response)
    } catch (err) {
      console.error({ err })
      rejectTransaction(`Transaction failed: ${err.message}`)
      return reject(err)
    } finally {
      const outputs = get(config, 'tx.outputs')
      const hash = get(config, 'tx.hash')

      dispatch(
        addPendingTransaction.call({
          address: config.address,
          tx: {
            hash,
            sendEntries,
          },
        }),
      )
    }
  })
