// @flow
import { connect } from 'react-redux'

import ContactsPanel from './ContactsPanel'
import { deleteAddress } from '../../../modules/addressBook'

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (...args) => dispatch(deleteAddress(...args))
})

export default connect(null, mapDispatchToProps)(ContactsPanel)
