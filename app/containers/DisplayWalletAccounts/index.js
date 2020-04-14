// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { withActions } from 'spunky'
import { injectIntl } from 'react-intl'

import DisplayWalletAccounts from './DisplayWalletAccounts'
import { saveAccountActions } from '../../actions/accountsActions'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import withFailureNotification from '../../hocs/withFailureNotification'
import {
  resetKey,
  getWIF,
  getAddress,
  getEncryptedWIF,
  getPassphrase,
  getWalletName,
  getIsImport,
} from '../../modules/generateWallet'

const mapStateToProps = (state: Object) => ({
  wif: getWIF(state),
  address: getAddress(state),
  encryptedWIF: getEncryptedWIF(state),
  passphrase: getPassphrase(state),
  walletName: getWalletName(state),
  isImport: getIsImport(state),
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ resetKey }, dispatch)

const mapAccountActionsToProps = actions => ({
  saveAccount: (label, address, key) => actions.call({ label, address, key }),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withActions(saveAccountActions, mapAccountActionsToProps),
  withSuccessNotification(
    saveAccountActions,
    'notifications.success.accountSaved',
    {},
    true,
  ),
  withFailureNotification(
    saveAccountActions,
    message => `Error saving account: ${message}`,
  ),
  injectIntl,
)(DisplayWalletAccounts)
