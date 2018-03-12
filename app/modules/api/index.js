// @flow
import batch from './batch'
import request from './request'
import { isBatch, isRequest } from '../../util/api/helpers'

export default function (state: Object = {}, action: Object) {
  if (isBatch(action)) {
    return {
      ...state,
      ...batch(state, action)
    }
  } else if (isRequest(action)) {
    return {
      ...state,
      ...request(state, action)
    }
  } else {
    return state
  }
}
