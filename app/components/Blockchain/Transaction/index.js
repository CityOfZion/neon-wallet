// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withData } from 'spunky'

import Transaction from './Transaction'
import withNetworkData from '../../../hocs/withNetworkData'
import withExplorerData from '../../../hocs/withExplorerData'
import withAuthData from '../../../hocs/withAuthData'
import { showModal } from '../../../modules/modal'
import { MODAL_TYPES } from '../../../core/constants'

import contactsActions from '../../../actions/contactsActions'

const mapDispatchToProps = dispatch => ({
  showAddContactModal: props =>
    dispatch(showModal(MODAL_TYPES.ADD_CONTACT, props))
})

const mapContactsDataToProps = (contacts: Object) => ({ contacts })

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withAuthData(),
  withData(contactsActions, mapContactsDataToProps),
  withNetworkData(),
  withExplorerData()
)(Transaction)
