import metadataReducer, { setNetworkId, setBlockHeight, setBlockExplorer, SET_HEIGHT, SET_NETWORK_ID, SET_EXPLORER } from '../../app/modules/metadata'
import { MAIN_NETWORK_ID, TEST_NETWORK_ID } from '../../app/core/constants'

describe('metadata module tests', () => {
  const networkId = TEST_NETWORK_ID
  const blockHeight = 10
  const blockExplorer = 'Neoscan'

  const initialState = {
    blockHeight: 0,
    networkId: MAIN_NETWORK_ID,
    blockExplorer: 'Neotracker',
    networks: [
      {
        id: MAIN_NETWORK_ID,
        label: 'MainNet',
        network: 'MainNet'
      },
      {
        id: TEST_NETWORK_ID,
        label: 'TestNet',
        network: 'TestNet'
      }
    ],
    tokens: [
      {
        'id': '1',
        'isUserGenerated': false,
        'networkId': '1',
        'scriptHash': 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf'
      },
      {
        'id': '2',
        'isUserGenerated': false,
        'networkId': '1',
        'scriptHash': 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9'
      },
      {
        'id': '3',
        'isUserGenerated': false,
        'networkId': '1',
        'scriptHash': '2328008e6f6c7bd157a342e789389eb034d9cbc4'
      },
      {
        'id': '4',
        'isUserGenerated': false,
        'networkId': '1',
        'scriptHash': '0d821bd7b6d53f5c2b40e217c6defc8bbe896cf5'
      },
      {
        'id': '5',
        'isUserGenerated': false,
        'networkId': '2',
        'scriptHash': 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf'
      },
      {
        'id': '6',
        'isUserGenerated': false,
        'networkId': '2',
        'scriptHash': '5b7074e873973a6ed3708862f219a6fbf4d1c411'
      },
      {
        'id': '7',
        'isUserGenerated': false,
        'networkId': '2',
        'scriptHash': '0d821bd7b6d53f5c2b40e217c6defc8bbe896cf5'
      }
    ]
  }

  describe('setNetworkId tests', () => {
    const expectedAction = {
      type: SET_NETWORK_ID,
      payload: {
        networkId
      }
    }

    test('setNetworkId action works', () => {
      expect(setNetworkId(networkId)).toEqual(expectedAction)
    })

    test('setNetworkId reducer should return the initial state', () => {
      expect(metadataReducer(undefined, {})).toEqual(initialState)
    })

    test('metadata reducer should handle SET_NETWORK_ID', () => {
      const expectedState = {
        ...initialState,
        networkId
      }
      expect(metadataReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setBlockHeight tests', () => {
    const expectedAction = {
      type: SET_HEIGHT,
      payload: {
        blockHeight
      }
    }

    test('setBlockHeight action works', () => {
      expect(setBlockHeight(blockHeight)).toEqual(expectedAction)
    })

    test('metadata reducer should handle SET_HEIGHT', () => {
      const expectedState = {
        ...initialState,
        blockHeight
      }
      expect(metadataReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })

  describe('setBlockExplorer tests', () => {
    const expectedAction = {
      type: SET_EXPLORER,
      payload: {
        blockExplorer
      }
    }

    test('setBlockExplorer action works', () => {
      expect(setBlockExplorer(blockExplorer)).toEqual(expect.any(Function))
    })

    test('metadata reducer should handle SET_EXPLORER', () => {
      const expectedState = {
        ...initialState,
        blockExplorer
      }
      expect(metadataReducer(undefined, expectedAction)).toEqual(expectedState)
    })
  })
})
