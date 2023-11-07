import { useAppSelector } from './useRedux'

export const useWalletsSelector = () => {
  const { ref, value } = useAppSelector(state => state.wallet.data)
  return {
    wallets: value,
    walletsRef: ref,
  }
}

export const useWalletSelectorByID = (id: string) => {
  const { value, ref } = useAppSelector(state => {
    const foundWallet = state.wallet.data.find(wallet => wallet.id === id)
    if (!foundWallet) throw new Error(`Wallet with id ${id} not found`)
    return foundWallet
  })

  return { wallet: value, walletRef: ref }
}
