// @flow

import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'

import DisplayWalletAccountsQrCodes from './DisplayWalletAccountsQrCodes'
import {
  resetKey,
  getWIF,
  getAddress,
  getEncryptedWIF,
  getPassphrase,
  getWalletName,
  getIsImport
} from '../../../modules/generateWallet'
import withCopyCanvasToClipboard from '../../../hocs/withCopyCanvasToClipboard'

const mapStateToProps = (state: Object) => ({
  wif: getWIF(state),
  address: getAddress(state),
  encryptedWIF: getEncryptedWIF(state),
  passphrase: getPassphrase(state),
  walletName: getWalletName(state),
  isImport: getIsImport(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetKey }, dispatch)

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DisplayWalletAccountsQrCodes)
