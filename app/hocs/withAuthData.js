// @flow
import { withData } from 'spunky'

import authActions from '../actions/authActions'

type Mapping = {
  address?: string,
  publicKey?: string,
  wif?: string,
  signingFunction?: string,
  isWatchOnly?: boolean,
  isHardwareLogin: boolean,
}

export default function withAuthData(): Mapping {
  return withData(authActions, auth => auth || {})
}
