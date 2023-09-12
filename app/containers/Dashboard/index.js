// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'
import { getNotifications } from '../../modules/notifications'
import { showModal } from '../../modules/modal'

import Dashboard from './Dashboard'
import withSettingsContext from '../../hocs/withSettingsContext'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  notification: getNotifications(state),
})

const actionCreators = {
  showModal,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

// const mapAccountActionsToProps = (actions, props) => ({
//   loadWalletData: () =>
//     actions.call({
//       net: props.net,
//       address: props.address,
//       tokens: props.tokens,
//       chain: props.chain,
//     }),
// })

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withAuthData,
  withSettingsContext,
  // Expose function for polling & reloading account related data.
  withNetworkData(),

  // withReset(accountActions, ['networkId']),
  // withActions(accountActions, mapAccountActionsToProps),
  // withData(internetConnectionPromptPresented),
  // withAuthData,
)(Dashboard)
