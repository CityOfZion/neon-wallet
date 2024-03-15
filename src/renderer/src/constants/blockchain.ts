import { TAccountColorKey, TBlockchainImageColor, TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { ReactComponent as EthereumBlue } from '@renderer/assets/blockchain/images/ethereum_blue.svg'
import { ReactComponent as EthereumGray } from '@renderer/assets/blockchain/images/ethereum_gray.svg'
import { ReactComponent as EthereumWhite } from '@renderer/assets/blockchain/images/ethereum_white.svg'
import { ReactComponent as NeoLegacyBlue } from '@renderer/assets/blockchain/images/neo_legacy_blue.svg'
import { ReactComponent as NeoLegacyGray } from '@renderer/assets/blockchain/images/neo_legacy_gray.svg'
import { ReactComponent as NeoLegacyWhite } from '@renderer/assets/blockchain/images/neo_legacy_white.svg'
import { ReactComponent as Neo3Blue } from '@renderer/assets/blockchain/images/neo3_blue.svg'
import { ReactComponent as Neo3Gray } from '@renderer/assets/blockchain/images/neo3_gray.svg'
import { ReactComponent as Neo3White } from '@renderer/assets/blockchain/images/neo3_white.svg'

export const blockchainIconsByBlockchain: Record<
  TBlockchainServiceKey,
  Record<TBlockchainImageColor, React.FC<React.SVGProps<SVGSVGElement>>>
> = {
  neo3: {
    gray: Neo3Gray,
    white: Neo3White,
    blue: Neo3Blue,
  },
  neoLegacy: {
    gray: NeoLegacyGray,
    white: NeoLegacyWhite,
    blue: NeoLegacyBlue,
  },
  ethereum: {
    gray: EthereumGray,
    white: EthereumWhite,
    blue: EthereumBlue,
  },
}

export const accountColorsKeys: TAccountColorKey[] = ['green', 'blue', 'magenta', 'gray', 'yellow']
