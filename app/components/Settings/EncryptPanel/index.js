// @flow

import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'

import {
  getEncryptedWIF,
  resetEncryptedWIF,
} from '../../../modules/generateEncryptedWIF'

import EncryptPanel from './EncryptPanel'

const mapStateToProps = (state: Object) => ({
  //  wif: getWIF(state),
  //  address: getAddress(state),
  encryptedWIF: getEncryptedWIF(state),
  //  passphrase: getPassphrase(state),
})

const actionCreators = {
  resetEncryptedWIF,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(EncryptPanel)
