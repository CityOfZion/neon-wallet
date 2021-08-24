// @flow

import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import withNetworkData from '../../../hocs/withNetworkData'
import { showSuccessNotification } from '../../../modules/notifications'

import History from './History'

const actionCreators = {
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withNetworkData(),
)(History)
