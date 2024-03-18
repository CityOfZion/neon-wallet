import { IWalletState } from '@renderer/@types/store'
import { backgroundColorByAccountColor } from '@renderer/constants/blockchain'
import { useAccountsByWalletIdSelector } from '@renderer/hooks/useAccountSelector'

import { ReactComponent as FrontImage } from '../assets/images/wallet-icon-front.svg'
import { ReactComponent as FrontHorizImage } from '../assets/images/wallet-icon-front-horiz.svg'

type TProps = {
  wallet: IWalletState
  withAccounts?: boolean
}

export const WalletIcon = ({ wallet, withAccounts }: TProps) => {
  const { accountsByWalletId } = useAccountsByWalletIdSelector(wallet.id)

  return withAccounts ? (
    <div className="relative w-[2.25rem] h-[2.25rem] min-w-[2rem] min-h-[2.25rem] top-3">
      {accountsByWalletId
        .filter((_account, index) => index < 3)
        .map((account, index, array) => (
          <div
            key={account.address}
            className={`w-[1.525rem] h-[1.125rem] rounded-sm absolute left-[5px] top-0.5 ${
              backgroundColorByAccountColor[account.backgroundColor]
            }`}
            style={{
              opacity: 1 - 0.2 * (array.length - index),
              top: `-${0.15 * (array.length - index)}rem`,
            }}
          />
        ))}

      <FrontHorizImage className="w-full relative -top-0.5" />
    </div>
  ) : (
    <div className="relative w-[2rem] h-[2.25rem] min-w-[2rem] min-h-[2.25rem] top-0.5">
      <div className="w-[1.125rem] h-[1.625rem] bg-neon rounded-sm absolute left-1.5 top-px" />

      <FrontImage className="w-full h-full relative" />
    </div>
  )
}
