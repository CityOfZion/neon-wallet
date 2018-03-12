// @flow
import { isEmpty, zipObject, mapValues, invert } from 'lodash'

import withData from './api/withData'
import authActions from '../actions/authActions'

type Mapping = {
  address?: string,
  publicKey?: string,
  wif?: string,
  signingFunction?: string
}

const keys: Array<string> = ['address', 'publicKey', 'wif', 'signingFunction']
const defaultMapping: Mapping = zipObject(keys, keys)

export default function withAuthData (mapping: Mapping = defaultMapping) {
  return withData(authActions, (auth) => {
    if (!isEmpty(auth)) {
      return mapValues(invert(mapping), (field) => auth[field])
    } else {
      return {}
    }
  })
}
