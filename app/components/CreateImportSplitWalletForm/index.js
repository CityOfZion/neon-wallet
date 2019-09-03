// @flow
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withData } from 'spunky'
import accountsActions from '../../actions/accountsActions'
import CreateImportSplitWalletForm from './CreateImportSplitWalletForm'
import { generateNewWalletAccount } from '../../modules/generateWallet'

const actionCreators = {
  generateNewWalletAccount,
}

const mapAccountsDataToProps = accounts => ({
  accounts,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withData(accountsActions, mapAccountsDataToProps),
)(CreateImportSplitWalletForm)
