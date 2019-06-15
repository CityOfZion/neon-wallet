// @flow

import { connect } from 'react-redux'
import { compose } from 'recompose'
// import { bindActionCreators } from 'redux'
import { getEncryptedWIF } from '../../../modules/generateEncryptedWIF'

import EncryptQR from './EncryptQR'

const mapStateToProps = (state: Object) => ({
  //  wif: getWIF(state),
  //  address: getAddress(state),
  encryptedWIF: getEncryptedWIF(state),
  //  passphrase: getPassphrase(state),
})

// const mapDispatchToProps = dispatch =>
// bindActionCreators({ ()=> {} }, dispatch)

export default compose(
  connect(
    mapStateToProps,
    //  mapDispatchToProps,
  ),
)(EncryptQR)
