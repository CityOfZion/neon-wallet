// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withData } from 'spunky'

import CreateImportSplitWalletForm from './CreateImportSplitWalletForm'
import { generateNewWalletAccount } from '../../modules/generateWallet'
import { showErrorNotification } from '../../modules/notifications'
import withAccountsData from '../../hocs/withAccountsData'

const actionCreators = {
  generateNewWalletAccount,
  showErrorNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
)(withAccountsData(CreateImportSplitWalletForm))
