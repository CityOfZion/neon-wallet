// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CreateImportWalletForm from './CreateImportWalletForm'
import { generateNewWalletAccount } from '../../modules/generateWallet'

const actionCreators = {
  generateNewWalletAccount,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default connect(
  null,
  mapDispatchToProps,
)(CreateImportWalletForm)
