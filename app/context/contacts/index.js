import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { showErrorNotification } from '../../modules/notifications'
import { ContactsContextProvider } from './ContactsContext'

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
)(ContactsContextProvider)
