// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withFetch from '../../hocs/api/withFetch'
import endpointActions from '../../actions/endpointActions'
import { getNetwork, checkVersion, initSettings } from '../../modules/metadata'
import { showErrorNotification } from '../../modules/notifications'

import App from './App'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state)
})

const actionCreators = {
  checkVersion,
  initSettings,
  showErrorNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withFetch(endpointActions)
)(App)
