// @flow
import { wallet, api, tx, rpc } from 'neon-js'
import { ASSET } from './constants'

export const oldMintTokens = (
  net: string,
  scriptHash: string,
  fromWif: string,
  neo: number,
  gasCost: number,
  signingFunction
): Promise<*> => {
  const account = new wallet.Account(fromWif)
  const intents = [{ assetId: ASSET.NEO, value: neo, scriptHash: scriptHash }]
  const invoke = { operation: 'mintTokens', scriptHash }
  const rpcEndpointPromise = api.neonDB.getRPCEndpoint(net)
  const balancePromise = api.neonDB.getBalance(net, account.address)
  let signedTx
  let endpt
  return Promise.all([rpcEndpointPromise, balancePromise])
    .then(values => {
      endpt = values[0]
      let balances = values[1]
      const unsignedTx = tx.createInvocationTx(
        balances,
        intents,
        invoke,
        gasCost,
        { version: 1 }
      )
      if (signingFunction) {
        return signingFunction(unsignedTx, account.publicKey)
      } else {
        unsignedTx.sign(account.privateKey)
      }
    })
    .then(signedResult => {
      signedTx = signedResult
      return rpc.Query.sendRawTransaction(signedTx).execute(endpt)
    })
    .then(res => {
      if (res.result === true) {
        res.txid = signedTx.hash
      }
      return res
    })
}
