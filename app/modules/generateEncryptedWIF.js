// Constants
// @flow
export const NEW_ENCRYPTED_WIF = 'NEW_ENCRYPTED_WIF'
export const RESET_ENCRYPTED_WIF = 'RESET_ENCRYPTED_WIF'

export const setEncryptedWIF = (encryptedWIF: string) => ({
  type: NEW_ENCRYPTED_WIF,
  payload: { encryptedWIF },
})

export function resetEncryptedWIF() {
  return {
    type: RESET_ENCRYPTED_WIF,
  }
}

// state getters
export const getEncryptedWIF = (state: Object) =>
  state.generateEncryptedWIF.encryptedWIF

const initialState = {
  encryptedWIF: null,
}

export default (state: Object = initialState, action: ReduxAction) => {
  switch (action.type) {
    case NEW_ENCRYPTED_WIF: {
      const { encryptedWIF } = action.payload
      return {
        ...state,

        encryptedWIF,
      }
    }
    case RESET_ENCRYPTED_WIF: {
      return { ...initialState }
    }
    default:
      return state
  }
}
