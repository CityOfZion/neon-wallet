// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'

import CreateImportWalletForm from './CreateImportWalletForm'
import { generateNewWalletAccount } from '../../modules/generateWallet'

const actionCreators = {
  generateNewWalletAccount,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

// $FlowFixMe
export default connect(
  null,
  mapDispatchToProps,
)(injectIntl(CreateImportWalletForm))
