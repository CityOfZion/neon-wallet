import { getExplorerLink, openExplorer } from '../../app/core/explorer'
import { NETWORK, EXPLORER } from '../../app/core/constants'
import { shell } from 'electron'

describe('explorer tests', () => {
  describe('getExplorerLink tests', () => {
    test('NeoTracker mainnet explorer test', () => {
      const net = NETWORK.MAIN
      const explorer = EXPLORER.NEO_TRACKER
      const txid = '1234567890abcdef'
      const expectedUrl = 'https://neotracker.io/tx/1234567890abcdef'
      expect(getExplorerLink(net, explorer, txid)).toEqual(expectedUrl)
    })

    test('NeoTracker testnet explorer test', () => {
      const net = NETWORK.TEST
      const explorer = EXPLORER.NEO_TRACKER
      const txid = '1234567890abcdef'
      const expectedUrl = 'https://testnet.neotracker.io/tx/1234567890abcdef'
      expect(getExplorerLink(net, explorer, txid)).toEqual(expectedUrl)
    })

    test('NeoScan mainnet explorer test', () => {
      const net = NETWORK.MAIN
      const explorer = EXPLORER.NEO_SCAN
      const txid = '1234567890abcdef'
      const expectedUrl = 'https://neoscan.io/transaction/1234567890abcdef'
      expect(getExplorerLink(net, explorer, txid)).toEqual(expectedUrl)
    })

    test('NeoScan testnet explorer test', () => {
      const net = NETWORK.TEST
      const explorer = EXPLORER.NEO_SCAN
      const txid = '1234567890abcdef'
      const expectedUrl = 'https://neoscan-testnet.io/transaction/1234567890abcdef'
      expect(getExplorerLink(net, explorer, txid)).toEqual(expectedUrl)
    })

    test('AntChain mainnet explorer test', () => {
      const net = NETWORK.MAIN
      const explorer = EXPLORER.ANT_CHAIN
      const txid = '1234567890abcdef'
      const expectedUrl = 'http://antcha.in/tx/hash/1234567890abcdef'
      expect(getExplorerLink(net, explorer, txid)).toEqual(expectedUrl)
    })

    test('AntChain testnet explorer test', () => {
      const net = NETWORK.TEST
      const explorer = EXPLORER.ANT_CHAIN
      const txid = '1234567890abcdef'
      const expectedUrl = 'http://testnet.antcha.in/tx/hash/1234567890abcdef'
      expect(getExplorerLink(net, explorer, txid)).toEqual(expectedUrl)
    })
  })

  describe('openExplorer tests', () => {
    test('open NeoTracker mainnet explorer test', () => {
      const net = NETWORK.MAIN
      const explorer = EXPLORER.NEO_TRACKER
      const txid = '1234567890abcdef'
      const expectedUrl = 'https://neotracker.io/tx/1234567890abcdef'
      const spy = jest.spyOn(shell, 'openExternal')

      openExplorer(net, explorer, txid)
      expect(spy).toHaveBeenCalledWith(expectedUrl)
    })
  })
})
