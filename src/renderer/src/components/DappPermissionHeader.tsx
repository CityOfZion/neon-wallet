import { TSession } from '@cityofzion/wallet-connect-sdk-wallet-react'
import dappFallbackIcon from '@renderer/assets/images/dapp-fallback-icon.png'
import { ReactComponent as NeonWalletLogo } from '@renderer/assets/images/neon-wallet-full.svg'
import { ReactComponent as WalletConnectLogo } from '@renderer/assets/images/wallet-connect.svg'

import { ImageWithFallback } from './ImageWithFallback'

type TProps = {
  session: TSession
}

export const DappPermissionHeader = ({ session }: TProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full gap-x-12 px-8 items-center">
        <NeonWalletLogo className="w-full h-min" />

        <WalletConnectLogo className="w-full h-min opacity-60" />
      </div>

      <ImageWithFallback
        src={session.peer.metadata.icons[0]}
        alt={session.peer.metadata.name}
        fallbackSrc={dappFallbackIcon}
        className="max-h-[2.25rem] max-w-[4rem] object-contain mt-9 rounded-sm bg-asphalt"
      />
    </div>
  )
}
