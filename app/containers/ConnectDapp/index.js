// @flow

import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConnectDapp from './ConnectDapp'
import { showErrorNotification } from '../../modules/notifications'

const actionCreators = {
  showErrorNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withRouter,
)(ConnectDapp)
