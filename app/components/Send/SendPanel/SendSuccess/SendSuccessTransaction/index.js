import { compose } from 'recompose'
import { connect } from 'react-redux'
import SendSuccessTransaction from './SendSuccessTransaction'
import withNetworkData from '../../../../../hocs/withNetworkData'

import withExplorerData from '../../../../../hocs/withExplorerData'

import { showModal } from '../../../../../modules/modal'
import { MODAL_TYPES } from '../../../../../core/constants'

const mapDispatchToProps = dispatch => ({
  showAddContactModal: props =>
    dispatch(showModal(MODAL_TYPES.ADD_CONTACT, props))
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withExplorerData(),
  withNetworkData()
)(SendSuccessTransaction)
