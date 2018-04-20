// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withCall, withRecall, withProgressComponents, alreadyLoadedStrategy, progressValues } from 'spunky'

import appActions from '../../actions/appActions'
import authActions from '../../actions/authActions'
import accountActions from '../../actions/accountActions'
import accountsActions from '../../actions/accountsActions'
import blockHeightActions from '../../actions/blockHeightActions'
import contactsActions from '../../actions/contactsActions'
import networkActions from '../../actions/networkActions'
import withLoginRedirect from '../../hocs/auth/withLoginRedirect'
import withLogoutRedirect from '../../hocs/auth/withLogoutRedirect'
import withLogoutReset from '../../hocs/auth/withLogoutReset'
import withInitialCall from '../../hocs/withInitialCall'
import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'
import { checkVersion } from '../../modules/metadata'
import { showErrorNotification } from '../../modules/notifications'

import App from './App'
import Loading from './Loading'
import Failed from './Failed'

const { LOADING, FAILED } = progressValues

const actionCreators = {
  checkVersion,
  showErrorNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default compose(
  // Old way of fetching data, need to refactor this out...
  connect(null, mapDispatchToProps),

  // Fetch contacts
  withCall(contactsActions),

  // Provide authenticated state so dashboard knows what layout to use.
  withAuthData(),

  // Fetch the initial settings.
  withInitialCall(accountsActions),
  withProgressComponents(accountsActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }, {
    strategy: alreadyLoadedStrategy
  }),

  // Fetch the initial network type, and pass it down as a prop.  This must come before other data
  // fetches that depend on knowing the selected network.
  withInitialCall(networkActions),
  withNetworkData(),
  withProgressComponents(networkActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }, {
    strategy: alreadyLoadedStrategy
  }),

  // Fetch application data based upon the selected network.  Reload data when the network changes.
  withInitialCall(appActions),
  withRecall(blockHeightActions, ['networkId']),

  // Navigate to the home or dashboard when the user logs in or out.
  withLoginRedirect,
  withLogoutRedirect,

  // Remove stale data from store on logout
  withLogoutReset(authActions),
  withLogoutReset(accountActions)
)(App)
