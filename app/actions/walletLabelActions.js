// @flow
import { createActions } from 'spunky'
import { walletHasLabel, getWallet, setWallet } from './accountsActions'

import {
  walletHasLabel as n3WalletHasLabel,
  getWallet as n3GetWallet,
  setWallet as n3SetWallet,
} from './n3AccountsActions'
import { getSettings } from './settingsActions'

export const ID = 'walletLabel'

export const updateLabelActions = createActions(
  ID,
  ({ label, address }: { label: string, address: string }) => async () => {
    const { chain } = await getSettings()

    if (chain === 'neo2') {
      const wallet = await getWallet()
      if (!label || !address) {
        console.warn('updateLabelActions() invoked with invalid arguments')
        return wallet.accounts
      }
      if (walletHasLabel(wallet, label)) {
        const err = 'A wallet with this name already exists locally.'
        throw new Error(err)
      }
      const accountToUpdate = wallet.accounts.find(
        account => account.address === address,
      )
      if (!accountToUpdate) {
        console.warn('There is no account to update!')
        return wallet.accounts
      }
      accountToUpdate.label = label
      await setWallet(wallet)
      return wallet.accounts
    }

    const wallet = await n3GetWallet()
    if (!label || !address) {
      console.warn('updateLabelActions() invoked with invalid arguments')
      return wallet.accounts
    }
    if (n3WalletHasLabel(wallet, label)) {
      const err = 'A wallet with this name already exists locally.'
      throw new Error(err)
    }
    const accountToUpdate = wallet.accounts.find(
      account => account.address === address,
    )
    if (!accountToUpdate) {
      console.warn('There is no account to update!')
      return wallet.accounts
    }
    accountToUpdate.label = label
    await n3SetWallet(wallet)
    return wallet.accounts
  },
)

export default createActions(ID, () => async (): Promise<Object> => {
  const { chain } = await getSettings()

  let wallet
  if (chain === 'neo2') {
    wallet = await getWallet()
  } else {
    wallet = await n3GetWallet()
  }

  return wallet.accounts
})
