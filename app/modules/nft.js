// @flow
import axios from 'axios'

export const GET_NFT_DATA = 'GET_NFT_DATA'
export const RESET_NFT_DATA = 'RESET_NFT_DATA'

// export const getNFTData = (address: string) => async (
//   dispatch: DispatchType,
//   getState: GetStateType,
// ): Promise<*> => {
//   console.log('getting nft data')
//   const results = await axios.get(
//     `api.ghostmarket.io/api/v1/assets?chain=n3&owner=${address}&limit=8&offset=0&with_total=1`,
//   )

//   return dispatch({
//     type: GET_NFT_DATA,
//     payload: {
//       nft: results?.data?.assets ?? [].map(asset => asset.nft),
//       loading: false,
//     },
//   })
// }

// export const getNFTData = (address: string) => async (
//   dispatch: DispatchType,
//   getState: GetStateType,
// ) => {
//   console.log({ address })
//   return dispatch({
//     type: GET_NFT_DATA,
//     payload: {
//       nft: [],
//       loading: false,
//     },
//   })
// }

// export function

export function NFTDataLoaded() {
  return {
    type: GET_NFT_DATA,
    payload: {
      nft: [],
      loading: false,
    },
  }
}

export function getNFTData(address: string) {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    // console.log({ address })
    debugger
    return dispatch(NFTDataLoaded())
  }
}

const initialState = {
  nft: [],
  loading: true,
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case GET_NFT_DATA: // eslint-disable-line no-case-declarations
      // eslint-disable-next-line no-case-declarations
      const { nft, loading } = action.payload
      return { nft, loading }
    case RESET_NFT_DATA:
      return initialState
    default:
      return state
  }
}
