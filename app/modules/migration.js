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

  // TODO: Implement the following logic:
  // Please ensure at least 1 cGAS at the user's address before starting the migration, otherwise the migration may fail!
  // Currently the cross-chain contract adds a condition that migration to N3 is free as long as the amount of assets is
  // greater than or equal to 10 NEO or 20 GAS; otherwise, the contract will charge 1 cGAS at the user's address if the condition is not met.

  return new Promise(async (resolve, reject) => {
    try {
      const state = getState()
      const wif = getWIF(state)

      const TO_ACCOUNT = new N3.wallet.Account(wif)
      const FROM_ACCOUNT = new N2.wallet.Account(wif)

      const entry = sendEntries[0]

      const { symbol, amount } = entry
      const MINT_REQUIRED = symbol === 'NEO' || symbol === 'GAS'

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
      }

      if (MINT_REQUIRED) {
        const mintAmount = {
          [symbol]: Number(amount),
        }

        // TODO: none of this is necessary is wallet has > 1 CGAS balance

        // TODO: If wallet has less than 1 GAS and the transaction is below the minimum
        // we need to throw an error

        if (symbol === 'GAS' && Number(amount) < 20) {
          // $FlowFixMe
          mintAmount.GAS += 1
        }

        const mintIntents = N2.api.makeIntent(
          mintAmount,
          N2.wallet.getAddressFromScriptHash(
            symbol === 'GAS' || symbol === 'CGAS' ? CGAS : NNEO,
          ),
        )

        if (symbol === 'NEO' && Number(amount) < 10) {
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
