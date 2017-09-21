// Constants
const SET_HEIGHT = 'SET_HEIGHT';
const SET_NETWORK = 'SET_NETWORK';
const SET_EXPLORER = 'SET_EXPLORER';

// Actions
export function setNetwork(net){
  const network = net === "MainNet" ? "MainNet" : "TestNet";
  return {
    type: SET_NETWORK,
    net: network
  }
};

export function setBlockHeight(blockHeight){
  return {
    type: SET_HEIGHT,
    blockHeight: blockHeight
  };
}

export function setBlockExplorer(blockExplorer){
  return {
    type: SET_EXPLORER,
    blockExplorer
  };
}

// reducer for metadata associated with Neon
export default (state = {blockHeight: 0, network: 'MainNet', blockExplorer: 'Neotracker'}, action) => {
  switch (action.type) {
    case SET_HEIGHT:
      return {...state, blockHeight: action.blockHeight };
    case SET_EXPLORER:
      console.log(action.blockExplorer);
      return {...state, blockExplorer: action.blockExplorer };
    case SET_NETWORK:
        return {...state, network: action.net};
    default:
      return state;
  }
};
