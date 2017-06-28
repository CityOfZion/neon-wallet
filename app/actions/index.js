import * as types from './types';

export function updateCoins(coins){
  return {
    type: types.UPDATE_COINS,
    coins: coins
  }
}
