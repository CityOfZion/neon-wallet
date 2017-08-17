// Constants
import { find } from 'lodash';

const SET_EXPLORER = 'SET_EXPLORER';
const availableExplorers = [
    {
        label: 'Antcha',
        mainnet_url: 'http://antcha.in',
        testnet_url: 'http://testnet.antcha.in',
        hash_path:   '/tx/hash/' 
    },
    {
        label: 'NeoTracker',
        mainnet_url: 'https://neotracker.io',
        testnet_url: 'http://testnet.neotracker.io',
        hash_path:   '/tx/' 
    }
];

// Actions
export function setExplorer(item){    
  const explorer = find(availableExplorers, ['label', item]);
  return {
    type: SET_EXPLORER,
    explorer: explorer
  }
};


export default (state = { selected: availableExplorers[0] }, action) => {
  switch (action.type) {
    case SET_EXPLORER:
      return { 
          selected: action.explorer 
    };
    default:
      return state;
  }
};