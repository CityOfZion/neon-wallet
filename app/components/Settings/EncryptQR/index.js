// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getEncryptedWIF,
  resetEncryptedWIF,
} from '../../../modules/generateEncryptedWIF'
import EncryptQR from './EncryptQR'

const mapStateToProps = state => ({
  encryptedWIF: getEncryptedWIF(state),
})

const actionCreators = {
  resetEncryptedWIF,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

// $FlowFixMe
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EncryptQR)
