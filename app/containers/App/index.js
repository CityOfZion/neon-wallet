// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import appActions from '../../actions/appActions'
import authActions from '../../actions/authActions'
import accountActions from '../../actions/accountActions'
import networkActions from '../../actions/networkActions'
import withFetch from '../../hocs/api/withFetch'
import withReload from '../../hocs/api/withReload'
import withProgressComponents from '../../hocs/api/withProgressComponents'
import withLoginRedirect from '../../hocs/auth/withLoginRedirect'
import withLogoutRedirect from '../../hocs/auth/withLogoutRedirect'
import withLogoutReset from '../../hocs/auth/withLogoutReset'
import withNetworkData from '../../hocs/withNetworkData'
import alreadyLoaded from '../../hocs/api/progressStrategies/alreadyLoadedStrategy'
import { checkVersion } from '../../modules/metadata'
import { showErrorNotification } from '../../modules/notifications'
import { LOADING, FAILED } from '../../values/state'

import App from './App'
import Loading from './Loading'
import Failed from './Failed'

const actionCreators = {
  checkVersion,
  showErrorNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default compose(
  // Old way of fetching data, need to refactor this out...
  connect(null, mapDispatchToProps),

  // Fetch the initial network type, and pass it down as a prop.  This must come before other data
  // fetches that depend on knowing the selected network.
  withFetch(networkActions),
  withNetworkData(),
  withProgressComponents(networkActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }, {
    strategy: alreadyLoaded
  }),

  // Fetch application data based upon the selected network.  Reload data when the network changes.
  withFetch(appActions),
  withReload(appActions, ['networkId']),
  withProgressComponents(appActions, {
    [LOADING]: Loading,
    [FAILED]: Failed
  }, {
    strategy: alreadyLoaded
  }),

  // Navigate to the home or dashboard when the user logs in or out.
  withLoginRedirect,
  withLogoutRedirect,

  // Remove stale data from store on logout
  withLogoutReset(authActions),
  withLogoutReset(accountActions)
)(App)
