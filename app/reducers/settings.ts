import { AnyAction } from 'redux'

const GET_SETTINGS = 'GET_SETTINGS'

export default (state = {}, action: AnyAction) => {
  switch (action.type) {
    case GET_SETTINGS:
      return Object.assign({}, state, {})
    default:
      return state
  }
}
