// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Transaction from './Transaction'
import withNetworkData from '../../../hocs/withNetworkData'
import withAuthData from '../../../hocs/withAuthData'
import { showModal } from '../../../modules/modal'
import { MODAL_TYPES } from '../../../core/constants'

import withSettingsContext from '../../../hocs/withSettingsContext'

const mapDispatchToProps = dispatch => ({
  showAddContactModal: props =>
    dispatch(showModal(MODAL_TYPES.ADD_CONTACT, props)),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withNetworkData(),
)(withSettingsContext(Transaction))
