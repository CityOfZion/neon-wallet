import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SendModal from './SendModal'
import {
  showErrorNotification,
  hideNotification
} from '../../../modules/notifications'

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showErrorNotification, hideNotification }, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(SendModal)
