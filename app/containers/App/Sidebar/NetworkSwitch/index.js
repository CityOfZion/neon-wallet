// @flow
import { compose } from 'recompose'
import { withActions, type Actions, withReset } from 'spunky'

import NetworkSwitch from './NetworkSwitch'
import networkActions from '../../../../actions/networkActions'
import withNetworkData from '../../../../hocs/withNetworkData'
import withAuthData from '../../../../hocs/withAuthData'
import accountActions from '../../../../actions/accountActions'
import withFilteredTokensData from '../../../../hocs/withFilteredTokensData'
import withChainData from '../../../../hocs/withChainData'

const mapActionsToProps = (actions: Actions): Object => ({
  onChange: networkId => actions.call({ networkId }),
})

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: (net: string) =>
    actions.call({
      net,
      address: props.address,
      tokens: props.tokens,
      chain: props.chain,
    }),
})

export default compose(
  withAuthData(),
  withNetworkData(),
  withChainData(),
  withActions(networkActions, mapActionsToProps),
  withFilteredTokensData(),
  withActions(accountActions, mapAccountActionsToProps),
  withReset(accountActions, ['networkId']),
)(NetworkSwitch)
