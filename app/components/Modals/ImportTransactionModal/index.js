// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ImportTransactionModal from './ImportTransactionModal'
import {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
} from '../../../modules/notifications'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withThemeData from '../../../hocs/withThemeData'
import { internetConnectionPromptPresented } from '../../../actions/internetConnectivityPromptActions'

const actionCreators = {
  showErrorNotification,
  showSuccessNotification,
  showInfoNotification,
  hideNotification,
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
  withData(internetConnectionPromptPresented),
)(ImportTransactionModal)
