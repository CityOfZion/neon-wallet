import metadataReducer, { setNetwork, setBlockHeight, setBlockExplorer, SET_HEIGHT, SET_NETWORK, SET_EXPLORER } from '../../app/modules/metadata';

describe('metadata module tests', () => {
  const net = 'TestNet';
  const blockHeight = 10;
  const blockExplorer = 'Neoscan';

  const initialState = {
    blockHeight: 0,
    network: 'MainNet',
    blockExplorer: 'Neotracker'
  };

  describe('setNetwork tests', () => {
    const expectedAction = {
      type: SET_NETWORK,
      net
    };

    test('setNetwork action works', () => {
      expect(setNetwork(net)).toEqual(expectedAction);
    });

    test('setNetwork reducer should return the initial state', () => {
      expect(metadataReducer(undefined, {})).toEqual(initialState);
    });

    test('metadata reducer should handle SET_NETWORK', () => {
      const expectedState = {
        ...initialState,
        network: net
      };
      expect(metadataReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('setBlockHeight tests', () => {
    const expectedAction = {
      type: SET_HEIGHT,
      blockHeight
    };

    test('setBlockHeight action works', () => {
      expect(setBlockHeight(blockHeight)).toEqual(expectedAction);
    });

    test('metadata reducer should handle SET_HEIGHT', () => {
      const expectedState = {
        ...initialState,
        blockHeight
      };
      expect(metadataReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });

  describe('setBlockExplorer tests', () => {
    const expectedAction = {
      type: SET_EXPLORER,
      blockExplorer
    };

    test('setBlockExplorer action works', () => {
      expect(setBlockExplorer(blockExplorer)).toEqual(expectedAction);
    });

    test('metadata reducer should handle SET_EXPLORER', () => {
      const expectedState = {
        ...initialState,
        blockExplorer
      };
      expect(metadataReducer(undefined, expectedAction)).toEqual(expectedState);
    });
  });
});
