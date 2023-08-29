// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'

import Mobile from './Mobile'
import { showModal } from '../../modules/modal'
import { MODAL_TYPES } from '../../core/constants'
import withAuthData from '../../hocs/withAuthData'
import withSettingsContext from '../../hocs/withSettingsContext'

const mapDispatchToProps = dispatch => ({
  showQrForExportModal: props =>
    dispatch(showModal(MODAL_TYPES.SHOW_QR_FOR_EXPORT, props)),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData,
)(withSettingsContext(Mobile))
