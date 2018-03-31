// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { loadAddresses, getAddresses } from '../../../modules/addressBook'

import AddressInput from './AddressInput'

const mapStateToProps = (state: Object) => ({
  addresses: getAddresses(state)
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ loadAddresses }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AddressInput)
