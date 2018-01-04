// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadAddresses, saveAddress, deleteAddress, getAddresses } from '../../../modules/addressBook'

import AddressInput from './AddressInput'

const mapStateToProps = (state: Object) => ({
  addresses: getAddresses(state)
})

const actionCreators = {
  loadAddresses,
  saveAddress,
  deleteAddress
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddressInput)
