// @flow
import { compose } from 'recompose'
import { withActions, type Actions } from 'spunky'

import NetworkSwitch from './NetworkSwitch'
import networkActions from '../../../../actions/networkActions'
import withNetworkData from '../../../../hocs/withNetworkData'
import withAuthData from '../../../../hocs/withAuthData'
import accountActions from '../../../../actions/accountActions'
import withFilteredTokensData from '../../../../hocs/withFilteredTokensData'

const mapActionsToProps = (actions: Actions, props: Object): Object => ({
  onChange: networkId => actions.call({ networkId })
})

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
  withActions(networkActions, mapActionsToProps),
  withFilteredTokensData(),
  withActions(accountActions, mapAccountActionsToProps)
)(NetworkSwitch)
