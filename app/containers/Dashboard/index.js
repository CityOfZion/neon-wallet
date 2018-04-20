// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withRecall, withActions } from 'spunky'

import accountActions from '../../actions/accountActions'
import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'
import withFilteredTokensData from '../../hocs/withFilteredTokensData'
import withSettingsCall from '../../hocs/withSettingsCall'
import { getNotifications } from '../../modules/notifications'
import { showModal } from '../../modules/modal'

import Dashboard from './Dashboard'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  notification: getNotifications(state)
})

const actionCreators = {
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapAccountActionsToProps = (actions, props) => ({
  loadWalletData: () => actions.call({ net: props.net, address: props.address, tokens: props.tokens })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData(),
  withAuthData(),

  // Expose function for polling & reloading account related data.
  withSettingsCall(),
  withFilteredTokensData(),
  withRecall(accountActions, ['networkId']),
  withActions(accountActions, mapAccountActionsToProps)
)(Dashboard)
