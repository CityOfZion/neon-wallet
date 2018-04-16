// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ContactsPanel from './ContactsPanel'
import { deleteAddress } from '../../../modules/addressBook'

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (...args) => dispatch(deleteAddress(...args))
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(ContactsPanel)
