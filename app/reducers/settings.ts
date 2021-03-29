import { AnyAction } from 'redux'

const GET_SETTINGS = 'GET_SETTINGS'

type State = {
  foo: 'bar'
}

export default (state = { foo: 'bar' } as State, action: AnyAction): State => {
  switch (action.type) {
    case GET_SETTINGS:
      return Object.assign({}, state, {})
    default:
      return state
  }
}
