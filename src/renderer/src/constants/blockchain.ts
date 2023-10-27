import { TAccountColorKey, TBlockchainImageColor, TBlockchainServiceKey } from '@renderer/@types/blockchain'
import ethereumDefault from '@renderer/assets/blockchain/images/ethereum_default.png'
import ethereumWhite from '@renderer/assets/blockchain/images/ethereum_white.png'
import neoLegacyDefault from '@renderer/assets/blockchain/images/neo_legacy_default.png'
import neoLegacyWhite from '@renderer/assets/blockchain/images/neo_legacy_white.png'
import neo3Default from '@renderer/assets/blockchain/images/neo3_default.png'
import neo3White from '@renderer/assets/blockchain/images/neo3_white.png'

export const blockchainIconsByBlockchain: Record<TBlockchainServiceKey, Record<TBlockchainImageColor, string>> = {
  neo3: {
    default: neo3Default,
    white: neo3White,
  },
  neoLegacy: {
    default: neoLegacyDefault,
    white: neoLegacyWhite,
  },
  ethereum: {
    default: ethereumDefault,
    white: ethereumWhite,
  },
}

export const accountColorsKeys: TAccountColorKey[] = ['green', 'blue', 'magenta', 'gray']
