const GET_SETTINGS = 'GET_SETTINGS'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return Object.assign({}, state, {})
    default:
      return state
  }
}
