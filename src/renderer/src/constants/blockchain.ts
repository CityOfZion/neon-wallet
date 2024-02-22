import { TAccountColorKey, TBlockchainImageColor, TBlockchainServiceKey } from '@renderer/@types/blockchain'
import ethereumBlue from '@renderer/assets/blockchain/images/ethereum_blue.png'
import ethereumDefault from '@renderer/assets/blockchain/images/ethereum_default.png'
import ethereumWhite from '@renderer/assets/blockchain/images/ethereum_white.png'
import neoLegacyBlue from '@renderer/assets/blockchain/images/neo_legacy_blue.png'
import neoLegacyDefault from '@renderer/assets/blockchain/images/neo_legacy_default.png'
import neoLegacyWhite from '@renderer/assets/blockchain/images/neo_legacy_white.png'
import neo3Default from '@renderer/assets/blockchain/images/neo3_default.png'
import neo3White from '@renderer/assets/blockchain/images/neo3_white.png'

export const blockchainIconsByBlockchain: Record<TBlockchainServiceKey, Record<TBlockchainImageColor, string>> = {
  neo3: {
    default: neo3Default,
    white: neo3White,
    blue: '',
  },
  neoLegacy: {
    default: neoLegacyDefault,
    white: neoLegacyWhite,
    blue: neoLegacyBlue,
  },
  ethereum: {
    default: ethereumDefault,
    white: ethereumWhite,
    blue: ethereumBlue,
  },
}

export const accountColorsKeys: TAccountColorKey[] = ['green', 'blue', 'magenta', 'gray', 'yellow']
