import { connect } from 'react-redux'
import SendSuccessTransaction from './SendSuccessTransaction'

import { showModal } from '../../../../../modules/modal'
import { MODAL_TYPES } from '../../../../../core/constants'

const mapDispatchToProps = dispatch => ({
  showAddContactModal: props =>
    dispatch(showModal(MODAL_TYPES.ADD_CONTACT, props))
})

export default connect(
  null,
  mapDispatchToProps
)(SendSuccessTransaction)
