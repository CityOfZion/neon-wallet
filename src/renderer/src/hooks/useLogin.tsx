import { useCallback } from 'react'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { settingsReducerActions } from '@renderer/store/reducers/SettingsReducer'

import { useAccountsSelector } from './useAccountSelector'
import { useBsAggregator } from './useBsAggregator'
import { useAppDispatch } from './useRedux'
import { useWalletsSelector } from './useWalletSelector'

export const useLogin = () => {
  const { walletsRef } = useWalletsSelector()
  const { accountsRef } = useAccountsSelector()
  const { bsAggregator } = useBsAggregator()
  const dispatch = useAppDispatch()

  const login = useCallback(
    async (password: string) => {
      const encryptedPassword = await window.api.encryptBasedOS(password)

      const walletPromises = walletsRef.current.map(async wallet => {
        if (!wallet.encryptedMnemonic) return
        const mnemonic = await window.api.decryptBasedEncryptedSecret(wallet.encryptedMnemonic, encryptedPassword)
        const isMnemonicValid = UtilsHelper.isValidMnemonic(mnemonic)
        if (!isMnemonicValid) throw new Error()
      })

      const accountPromises = accountsRef.current.map(async account => {
        if (!account.encryptedKey) return
        const key = await window.api.decryptBasedEncryptedSecret(account.encryptedKey, encryptedPassword)
        const service = bsAggregator.blockchainServicesByName[account.blockchain]
        const isKeyValid = service.validateKey(key)
        if (!isKeyValid) throw new Error()
      })

      await Promise.all([...walletPromises, ...accountPromises])
      dispatch(settingsReducerActions.setEncryptedPassword(encryptedPassword))
    },
    [walletsRef, accountsRef, bsAggregator, dispatch]
  )

  const logout = useCallback(() => {
    dispatch(settingsReducerActions.setEncryptedPassword(undefined))
  }, [dispatch])

  return {
    login,
    logout,
  }
}
