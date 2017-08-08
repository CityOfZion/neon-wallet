// Constants
const SET_HEIGHT = 'SET_HEIGHT';
const SET_NETWORK = 'SET_NETWORK';

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

// reducer for metadata associated with Neon
export default (state = {blockHeight: 0, network: 'MainNet'}, action) => {
  switch (action.type) {
    case SET_HEIGHT:
      return {...state, blockHeight: action.blockHeight };
    case SET_NETWORK:
        return {...state, network: action.net};
    default:
      return state;
  }
};