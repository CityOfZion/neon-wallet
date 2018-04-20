// @flow
import { compose } from 'recompose'
import { withData, withReset, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import withInitialCall from './withInitialCall'
import withAuthData from './withAuthData'
import withNetworkData from './withNetworkData'
import withFilteredTokensData from './withFilteredTokensData'
import balancesActions from '../actions/balancesActions'
import Loader from '../components/Loader'
import Failed from '../containers/App/Failed'

const { LOADING, FAILED } = progressValues

export default function withBalancesData (mapBalancesDataToProps: Function) {
  return compose(
    withNetworkData(),
    withAuthData(),
    withFilteredTokensData(),
    withInitialCall(balancesActions),
    withReset(balancesActions, ['net']),
    withProgressComponents(balancesActions, {
      [LOADING]: Loader,
      [FAILED]: Failed
    }, {
      strategy: alreadyLoadedStrategy
    }),
    withData(balancesActions, mapBalancesDataToProps)
  )
}
