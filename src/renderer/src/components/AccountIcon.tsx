import { IAccountState } from '@renderer/@types/store'
import placeholderImage from '@renderer/assets/images/account-card-placeholder.png'
import { backgroundColorByAccountColor } from '@renderer/constants/blockchain'

import { BlockchainIcon } from './BlockchainIcon'
type TProps = {
  account: IAccountState
}

export const AccountIcon = ({ account }: TProps) => {
  return (
    <div className="w-[2.25rem] h-[2.25rem] flex justify-center items-center">
      <div
        className={`w-7 h-5 relative rounded-sm flex items-center shadow-sm justify-center overflow-hidden ${
          backgroundColorByAccountColor[account.backgroundColor]
        }`}
      >
        <div className="w-full h-full absolute border-l-0 border-b-0 border-r-[1.75rem] border-t-[1.25rem] border-l-transparent border-r-transparent border-b-transparent border-t-white/5" />

        <img src={placeholderImage} className="absolute -left-1 -bottom-1 opacity-80" />

        <div className="w-4 h-4 flex items-center justify-center relative">
          <div className="w-full h-full rounded-full bg-asphalt/50 mix-blend-overlay absolute" />
          <BlockchainIcon blockchain={account.blockchain} type="white" className="w-2.5 h-2.5" />
        </div>
      </div>
    </div>
  )
}
