// @flow
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import accountsActions from '../../actions/accountsActions'
import { nep2LoginActions } from '../../actions/authActions'

import WalletManager from './WalletManager.jsx'

const mapAccountsDataToProps = accounts => ({
  accounts
})

const mapActionsToProps = actions => ({
  loginNep2: (passphrase, encryptedWIF) =>
    actions.call({ passphrase, encryptedWIF })
})

export default compose(
  withData(accountsActions, mapAccountsDataToProps),
  withActions(nep2LoginActions, mapActionsToProps)
)(WalletManager)

// // @flow
// import { compose } from 'recompose'
// import { withData, withActions } from 'spunky'

// import LoginLocalStorage from './LoginLocalStorage'
// import accountsActions from '../../actions/accountsActions'
// import { nep2LoginActions } from '../../actions/authActions'
// import withLoadingProp from '../../hocs/withLoadingProp'
// import withFailureNotification from '../../hocs/withFailureNotification'
// import pureStrategy from '../../hocs/helpers/pureStrategy'

// const mapAccountsDataToProps = (accounts) => ({
//   accounts
// })

// const mapActionsToProps = (actions) => ({
//   loginNep2: (passphrase, encryptedWIF) => actions.call({ passphrase, encryptedWIF })
// })

// export default compose(
//   withData(accountsActions, mapAccountsDataToProps),
//   withActions(nep2LoginActions, mapActionsToProps),
//   withLoadingProp(nep2LoginActions, { strategy: pureStrategy }),
//   withFailureNotification(nep2LoginActions)
// )(LoginLocalStorage)
