// @flow
import { createActions } from 'spunky'
import { walletHasLabel, getWallet, setWallet } from './accountsActions'

export const ID = 'wallet-label'

export const updateLabelActions = createActions(
  ID,
  ({ label, address }: { label: string, address: string }) => async () => {
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
      account => account.address === address
    )
    if (!accountToUpdate) {
      console.warn('There is no account to update!')
      return wallet.accounts
    }
    accountToUpdate.label = label
    await setWallet(wallet)
    // showSuccessNotification({ message: 'sdfsdfsdfsdfjsdofijsdfoij' })
    return wallet.accounts
  }
)
