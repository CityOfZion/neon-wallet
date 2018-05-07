// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import { showModal } from '../../../modules/modal'
import { MODAL_TYPES } from '../../../core/constants'

const mapDispatchToProps = (dispatch, props) => ({
  showSendModal: () => dispatch(showModal(MODAL_TYPES.SEND)),
  showTokenSaleModal: () => dispatch(showModal(MODAL_TYPES.ICO))
})

export default compose(
  withRouter, // allow `NavLink` components to re-render when the window location changes
  connect(null, mapDispatchToProps)
)(Sidebar)
