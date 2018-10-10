import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SendModal from './SendModal'
import { showErrorNotification } from '../../../modules/notifications'

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showErrorNotification }, dispatch)

export default connect(null, mapDispatchToProps)(SendModal)
