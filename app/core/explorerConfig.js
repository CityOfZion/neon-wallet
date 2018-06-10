import { EXPLORERS } from './constants'

export default {
  [EXPLORERS.NEO_TRACKER]: {
    addressLinkStructure: 'address/',
    assetLinkStructure: 'asset/',
    mainNetwork: 'https://neotracker.io/',
    testNetwork: 'https://testnet.neotracker.io/',
    trxLinkStructure: 'tx/'
  },
  [EXPLORERS.NEO_SCAN]: {
    addressLinkStructure: 'address/',
    assetLinkStructure: 'asset/',
    mainNetwork: 'https://neoscan.io/',
    testNetwork: 'https://neoscan-testnet.io/',
    trxLinkStructure: 'transaction/'
  },
  [EXPLORERS.ANT_CHAIN]: {
    addressLinkStructure: 'address/info/',
    assetLinkStructure: 'asset/hash/',
    mainNetwork: 'http://antcha.in/',
    testNetwork: 'http://testnet.antcha.in/',
    trxLinkStructure: 'tx/hash/0x'
  }
}
