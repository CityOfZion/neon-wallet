// @flow
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ImportTransactionModal from './ImportTransactionModal'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withThemeData from '../../../hocs/withThemeData'

const actionCreators = {
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withNetworkData(),
  withThemeData(),
)(ImportTransactionModal)
