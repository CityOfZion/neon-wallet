// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import RefreshButton from './RefreshButton'

import accountActions from '../../../actions/accountActions'
import withLoadingProp from '../../../hocs/withLoadingProp'
import balancesActions from '../../../actions/balancesActions'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withFilteredTokensData from '../../../hocs/withFilteredTokensData'

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens
    })
})

export default compose(
  withAuthData(),
  withNetworkData(),
  withFilteredTokensData(),
  withActions(accountActions, mapAccountActionsToProps),
  withLoadingProp(balancesActions)
)(RefreshButton)
