// @flow
import { ASSETS_LABELS, ASSETS } from '../core/constants'
import { validateTransactionBeforeSending } from '../core/wallet'
import { getTransactionHistory, doSendAsset } from 'neon-js'
import { setTransactionHistory } from '../modules/wallet'
import { log } from '../util/Logs'
import { hardwareDoSendAsset } from '../ledger/ledgerNanoS.js'
import { showErrorNotification, showStickyInfoNotification, showSuccessNotification } from './notification'

// Constants
export const TOGGLE_ASSET = 'TOGGLE_ASSET'

export function toggleAsset () {
  return {
    type: TOGGLE_ASSET
  }
}

export const syncTransactionHistory = (net: NetworkType, address: string) => (dispatch: DispatchType) => {
  getTransactionHistory(net, address).then((transactions) => {
    let txs = []
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].neo_sent === true) {
        txs = txs.concat([{ type: ASSETS.NEO, amount: transactions[i].NEO, txid: transactions[i].txid, block_index: transactions[i].block_index }])
      }
      if (transactions[i].gas_sent === true) {
        txs = txs.concat([{ type: ASSETS.GAS, amount: transactions[i].GAS, txid: transactions[i].txid, block_index: transactions[i].block_index }])
      }
    }
    dispatch(setTransactionHistory(txs))
  })
}

export const sendTransaction = (sendAddress: string, sendAmount: string) => (dispatch: DispatchType, getState: GetStateType): Promise<*> => {
  return new Promise((resolve, reject) => {
    const state = getState()
    const wif = state.account.wif
    const address = state.account.address
    const net = state.metadata.network
    const neo = state.wallet.Neo
    const gas = state.wallet.Gas
    const selectedAsset = state.transactions.selectedAsset
    const signingFunction = state.account.signingFunction
    const publicKey = state.account.publicKey

    const rejectTransaction = (error: string) => {
      dispatch(showErrorNotification({ message: error }))
      reject(new Error(error))
    }

    const { error, valid } = validateTransactionBeforeSending(neo, gas, selectedAsset, sendAddress, sendAmount)
    if (valid) {
      const selfAddress = address
      const assetName = selectedAsset === ASSETS_LABELS.NEO ? ASSETS.NEO : ASSETS.GAS
      let sendAsset = {}
      sendAsset[assetName] = sendAmount

      dispatch(showStickyInfoNotification({ message: 'Processing...' }))
      log(net, 'SEND', selfAddress, { to: sendAddress, asset: selectedAsset, amount: sendAmount })

      const isHardwareSend = !!publicKey

      let sendAssetFn
      if (isHardwareSend) {
        sendAssetFn = () => hardwareDoSendAsset(net, sendAddress, publicKey, sendAsset, signingFunction)
      } else {
        sendAssetFn = () => doSendAsset(net, sendAddress, wif, sendAsset)
      }

      sendAssetFn().then((response) => {
        if (response.result === undefined || response.result === false) {
          rejectTransaction('Transaction failed!')
        } else {
          dispatch(showSuccessNotification({ message: 'Transaction complete! Your balance will automatically update when the blockchain has processed it.' }))
        }
        resolve()
      }).catch((e) => {
        rejectTransaction('Transaction failed!')
      })
    } else {
      rejectTransaction(error)
    }
  })
}

const initialState = {
  success: null,
  message: null,
  selectedAsset: ASSETS_LABELS.NEO
}

// Reducer for state used when performing a transaction
export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case TOGGLE_ASSET:
      return {
        ...state,
        success: null,
        selectedAsset: state.selectedAsset === ASSETS_LABELS.NEO ? ASSETS_LABELS.GAS : ASSETS_LABELS.NEO
      }
    default:
      return state
  }
}
