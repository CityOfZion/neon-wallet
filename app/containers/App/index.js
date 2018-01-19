// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

// import withData from '../../hocs/api/withData'
import withFetch from '../../hocs/api/withFetch'
// import withReload from '../../hocs/api/withReload'
import withProgressComponents from '../../hocs/api/withProgressComponents'
// import appActions from '../../actions/appActions'
import withNetworkData from '../../hocs/withNetworkData'
import networkActions from '../../actions/networkActions'
import { checkVersion, initSettings } from '../../modules/metadata'
import { showErrorNotification } from '../../modules/notifications'
import { INITIAL, LOADING } from '../../values/state'

import App from './App'
import Loading from './Loading'

const actionCreators = {
  checkVersion,
  initSettings,
  showErrorNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

// const mapAppDataToProps = ({ height, settings }) => ({ height, settings })

export default compose(
  // Old way of fetching data, need to refactor this out...
  connect(null, mapDispatchToProps),

  // Fetch the initial network type, and pass it down as a prop.  This must come before other data
  // fetches that depend on knowing the selected network.
  withFetch(networkActions),
  withNetworkData(),
  withProgressComponents(networkActions, {
    [INITIAL]: Loading, // TODO: refactor such that LOADING and INITIAL are treated the same
    [LOADING]: Loading
  })

  // // Fetch application data based upon the selected network.  Reload data when the network changes.
  // withFetch(appActions),
  // withData(appActions, mapAppDataToProps),
  // withReload(appActions, ['net']),
  // withProgressComponents(appActions, {
  //   [INITIAL]: Loading,
  //   [LOADING]: Loading
  // })
)(App)
