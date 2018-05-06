// @flow
import { withData } from 'spunky'

import balancesActions from '../actions/balancesActions'

export default function withBalancesData (mapBalancesDataToProps: Function) {
  return withData(balancesActions, mapBalancesDataToProps)
}
