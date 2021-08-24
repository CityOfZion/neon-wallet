import {
  getExplorerAddressLink,
  getExplorerTxLink,
  openExplorerTx,
} from '../../app/core/explorer'
import {
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  EXPLORERS,
} from '../../app/core/constants'
import { shell } from 'electron'

describe('explorer tests', () => {
  const txId =
    '33e6dad17f65564222d697923558792feda7847644f1810e6b389106335a7de0'
  const address = 'AQpLnwMpnhxroPM4fcYGenB2pH5cLhMDao'

  describe('getExplorerTxLink tests', () => {
    test('Dora mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.DORA
      const expectedUrl = `https://dora.coz.io/transaction/neo2/mainnet/0x${txId}`
      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })

    test('Neotube mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.NEOTUBE
      const expectedUrl = `https://neotube.io/transaction/0x${txId}`
      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })

    test('NeoTracker mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.NEO_TRACKER
      const expectedUrl = `https://neotracker.io/tx/${txId}`
      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })

    test('NeoTracker testnet explorer test', () => {
      const networkId = TEST_NETWORK_ID
      const explorer = EXPLORERS.NEO_TRACKER
      const expectedUrl = `https://testnet.neotracker.io/tx/${txId}`

      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })

    test('NeoScan mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.NEO_SCAN
      const expectedUrl = `https://neoscan.io/transaction/${txId}`

      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })

    test('NeoScan testnet explorer test', () => {
      const networkId = TEST_NETWORK_ID
      const explorer = EXPLORERS.NEO_SCAN
      const expectedUrl = `https://neoscan-testnet.io/transaction/${txId}`

      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })

    test('AntChain mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.ANT_CHAIN
      const expectedUrl =
        'http://antcha.in/tx/hash/0x33e6dad17f65564222d697923558792feda7847644f1810e6b389106335a7de0'

      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })

    test('AntChain testnet explorer test', () => {
      const networkId = TEST_NETWORK_ID
      const explorer = EXPLORERS.ANT_CHAIN
      const expectedUrl =
        'http://testnet.antcha.in/tx/hash/0x33e6dad17f65564222d697923558792feda7847644f1810e6b389106335a7de0'

      expect(getExplorerTxLink(networkId, explorer, txId)).toEqual(expectedUrl)
    })
  })

  describe('openExplorerTx tests', () => {
    test('open NeoTracker mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.NEO_TRACKER
      const expectedUrl = `https://neotracker.io/tx/${txId}`
      const spy = jest.spyOn(shell, 'openExternal')

      openExplorerTx(networkId, explorer, txId)

      expect(spy).toHaveBeenCalledWith(expectedUrl)
    })
  })

  describe('getExplorerAddressLink tests', () => {
    test('Neotube mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.NEOTUBE
      const expectedUrl = `https://neotube.io/address/${address}`
      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })

    test('Dora mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.DORA
      const expectedUrl = `https://dora.coz.io/address/neo2/mainnet/${address}`
      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })

    test('NeoTracker mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.NEO_TRACKER
      const expectedUrl = `https://neotracker.io/address/${address}`

      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })

    test('NeoTracker testnet explorer test', () => {
      const networkId = TEST_NETWORK_ID
      const explorer = EXPLORERS.NEO_TRACKER
      const expectedUrl = `https://testnet.neotracker.io/address/${address}`

      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })

    test('NeoScan mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.NEO_SCAN
      const expectedUrl = `https://neoscan.io/address/${address}/1`

      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })

    test('NeoScan testnet explorer test', () => {
      const networkId = TEST_NETWORK_ID
      const explorer = EXPLORERS.NEO_SCAN
      const expectedUrl = `https://neoscan-testnet.io/address/${address}/1`

      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })

    test('AntChain mainnet explorer test', () => {
      const networkId = MAIN_NETWORK_ID
      const explorer = EXPLORERS.ANT_CHAIN
      const expectedUrl = `http://antcha.in/address/info/${address}`

      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })

    test('AntChain testnet explorer test', () => {
      const networkId = TEST_NETWORK_ID
      const explorer = EXPLORERS.ANT_CHAIN
      const expectedUrl = `http://testnet.antcha.in/address/info/${address}`

      expect(getExplorerAddressLink(networkId, explorer, address)).toEqual(
        expectedUrl,
      )
    })
  })
})
