// @flow
import { isEmpty, zipObject, mapValues, invert } from 'lodash'

import withData from './api/withData'
import accountActions from '../actions/accountActions'

type Mapping = {
  address?: string,
  publicKey?: string,
  wif?: string,
  signingFunction?: string
}

const keys: Array<string> = ['address', 'publicKey', 'wif', 'signingFunction']
const defaultMapping: Mapping = zipObject(keys, keys)

export default function withAccountData (mapping: Mapping = defaultMapping) {
  return withData(accountActions, (account) => {
    if (!isEmpty(account)) {
      return mapValues(invert(mapping), (field) => account[field])
    } else {
      return {}
    }
  })
}
