// @flow
import { LOGOUT } from './account'

const initialState = {}

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case LOGOUT:
      return initialState
    default:
      return state
  }
}
