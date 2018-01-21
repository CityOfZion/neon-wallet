// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withData from '../../hocs/api/withData'
import withFetch from '../../hocs/api/withFetch'
import withReload from '../../hocs/api/withReload'
import withProgressComponents from '../../hocs/api/withProgressComponents'
import appActions from '../../actions/appActions'
import alreadyLoaded from '../../hocs/api/progressStrategies/alreadyLoadedStrategy'
import withNetworkData from '../../hocs/withNetworkData'
import networkActions from '../../actions/networkActions'
import { checkVersion } from '../../modules/metadata'
import { showErrorNotification } from '../../modules/notifications'
import { LOADING } from '../../values/state'

import App from './App'
import Loading from './Loading'

const actionCreators = {
  checkVersion,
  showErrorNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapAppDataToProps = ({ height, settings }) => ({ height, settings })

export default compose(
  // Old way of fetching data, need to refactor this out...
  connect(null, mapDispatchToProps),

  // Fetch the initial network type, and pass it down as a prop.  This must come before other data
  // fetches that depend on knowing the selected network.
  withFetch(networkActions),
  withNetworkData(),
  withProgressComponents(networkActions, {
    [LOADING]: Loading
  }, {
    strategy: alreadyLoaded
  }),

  // Fetch application data based upon the selected network.  Reload data when the network changes.
  withFetch(appActions),
  withData(appActions, mapAppDataToProps),
  withReload(appActions, ['networkId']),
  withProgressComponents(appActions, {
    [LOADING]: Loading
  }, {
    strategy: alreadyLoaded
  })
)(App)
