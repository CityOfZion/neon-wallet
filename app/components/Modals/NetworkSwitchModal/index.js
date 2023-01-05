// @flow
import { compose } from 'recompose'
import { injectIntl } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withActions, type Actions } from 'spunky'

import Modal from './NetworkSwitchModal'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import networkActions from '../../../actions/networkActions'
import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
} from '../../../modules/notifications'
import accountActions from '../../../actions/accountActions'

const actionCreators = {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
}

const mapActionsToProps = (actions: Actions): Object => ({
  switchNetworks: networkId => actions.call({ networkId }),
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  injectIntl,
  withNetworkData(),
  withAuthData(),
  withActions(networkActions, mapActionsToProps),
  withActions(accountActions, mapAccountActionsToProps),
)(Modal)
