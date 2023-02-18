// @flow
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { injectIntl } from 'react-intl'

import CreateImportWalletForm from './CreateImportWalletForm'
import { generateNewWalletAccount } from '../../modules/generateWallet'
import withSettingsContext from '../../hocs/withSettingsContext'

const actionCreators = {
  generateNewWalletAccount,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

// $FlowFixMe
export default compose(
  // $FlowFixMe
  connect(
    null,
    mapDispatchToProps,
  ),
)(withSettingsContext(injectIntl(CreateImportWalletForm)))
