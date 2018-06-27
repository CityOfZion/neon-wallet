import { EXPLORERS } from './constants'
const { ANT_CHAIN, NEO_SCAN, NEO_TRACKER } = EXPLORERS

export default {
  [ANT_CHAIN]: {
    addressLinkStructure: 'address/info/',
    assetLinkStructure: 'asset/hash/',
    mainNetwork: 'http://antcha.in/',
    testNetwork: 'http://testnet.antcha.in/',
    trxLinkStructure: 'tx/hash/0x'
  },
  [NEO_SCAN]: {
    addressLinkStructure: 'address/',
    assetLinkStructure: 'asset/',
    mainNetwork: 'https://neoscan.io/',
    testNetwork: 'https://neoscan-testnet.io/',
    trxLinkStructure: 'transaction/'
  },
  [NEO_TRACKER]: {
    addressLinkStructure: 'address/',
    assetLinkStructure: 'asset/',
    mainNetwork: 'https://neotracker.io/',
    testNetwork: 'https://testnet.neotracker.io/',
    trxLinkStructure: 'tx/'
  }

}
