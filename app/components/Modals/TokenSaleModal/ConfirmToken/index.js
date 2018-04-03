// @flow
import { compose } from 'recompose'
import { withCall, withData, withProgressComponents, progressValues } from 'spunky'

import ConfirmToken from './ConfirmToken'
import Loading from './Loading'
import Failed from './Failed'
import tokenActions from '../../../../actions/tokenActions'
import withNetworkData from '../../../../hocs/withNetworkData'

const { LOADING, FAILED } = progressValues

const mapTokenDataToProps = (token) => ({ token })

export default compose(
  withNetworkData(),
  withCall(tokenActions),
  withProgressComponents(tokenActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }),
  withData(tokenActions, mapTokenDataToProps)
)(ConfirmToken)
