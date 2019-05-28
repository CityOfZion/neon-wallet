// @flow
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GeneratedTransactionModal from './GeneratedTransactionModal'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../../modules/notifications'

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
  )(GeneratedTransactionModal),
)
