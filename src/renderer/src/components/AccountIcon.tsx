import { TAccountColorKey } from '@renderer/@types/blockchain'
import placeholderImage from '@renderer/assets/images/account-card-placeholder.png'
import { Account } from '@renderer/store/account/Account'

import { BlockchainIcon } from './BlockchainIcon'
type TProps = {
  account: Account
}

export const AccountIcon = ({ account }: TProps) => {
  const gradientByAccountColor: Record<TAccountColorKey, string> = {
    blue: 'from-[#2F008E] to-[#7C4BFE]',
    green: 'from-[#125B53] to-[#00DDB4]',
    gray: 'from-[#4B5D69] to-[#91ABBC]',
    magenta: 'from-[#7E1E8D] to-[#D355E7]',
  }
  return (
    <div className="w-[2.25rem] h-[2.25rem] flex justify-center items-center">
      <div
        className={`w-7 h-5 relative rounded-sm flex items-center shadow-sm justify-center overflow-hidden bg-gradient-to-t ${
          gradientByAccountColor[account.backgroundColor]
        }`}
      >
        <div className="w-full h-full absolute border-l-0 border-b-0 border-r-[1.75rem] border-t-[1.25rem] border-l-transparent border-r-transparent border-b-transparent border-t-white/5" />

        <img src={placeholderImage} className="absolute -left-1 -bottom-1 opacity-80" />
        <BlockchainIcon blockchain={account.blockchain} type="white" className="w-3 h-3" />
      </div>
    </div>
  )
}
