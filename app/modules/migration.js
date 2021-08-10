// @flow

import { getWIF } from '../core/deprecated'

const N2 = require('@cityofzion/neon-js-legacy-latest')
const N3 = require('@cityofzion/neon-js-next')

const CGAS = '74f2dc36a68fdc4682034178eb2220729231db76'

// TODO: will need to be dynamic based on network
const NNEO = '17da3881ab2d050fea414c80b3fa8324d756f60e'
const ProxyContract = '7997ac991b66ca3810602639a2f2c1bd985e8b5a'
const additionalInvocationGas = 0

export const performMigration = ({
  sendEntries,
}: {
  sendEntries: Array<SendEntryType>,
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

      const entry = sendEntries[0]

      const { symbol, amount } = entry

      console.log({ symbol })

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
          symbol === 'NEO' ? amount : Number(amount) * 100000000, // amount
          0, // ?
          0, // ?
        ],
      })

      const gas = additionalInvocationGas

      const CONFIG = {
        api: provider,
        account: FROM_ACCOUNT,
        intents:
          symbol === 'NEO' || symbol === 'GAS'
            ? N2.api.makeIntent(
                {
                  [symbol]: amount,
                },
                N2.wallet.getAddressFromScriptHash(
                  symbol === 'GAS' || symbol === 'CGAS' ? CGAS : NNEO,
                ),
              )
            : null,
        script:
          symbol === 'NEO' || symbol === 'GAS'
            ? mintScript + swapScript
            : swapScript,
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
