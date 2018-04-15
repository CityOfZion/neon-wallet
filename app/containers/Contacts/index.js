// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Contacts from './Contacts'
import { loadAddresses, getAddresses } from '../../modules/addressBook'

const mapStateToProps = (state: Object) => ({
  contacts: getAddresses(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ loadAddresses }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
