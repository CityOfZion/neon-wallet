// @flow
import { wallet } from 'neon-js'

import { getStorage, setStorage } from './storage'

function getNEP6AddressData (matchesEncryptedWIF: boolean, address: string) {
  if (matchesEncryptedWIF) {
    return { address }
  } else {
    return {}
  }
}

export async function upgradeNEP6AddAddresses (encryptedWIF: string, wif: string) {
  const data = getStorage('userWallet')
  const loggedIntoAccount = new wallet.Account(wif)

  if (data && data.accounts) {
    const accounts = data.accounts.map((account, idx) => ({
      ...account,
      ...getNEP6AddressData(account.key === encryptedWIF, loggedIntoAccount.address)
    }))

    await setStorage('userWallet', { ...data, accounts })
  }
}
