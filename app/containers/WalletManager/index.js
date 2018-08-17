// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import accountsActions from '../../actions/accountsActions'

import WalletManager from './WalletManager'

const mapAccountsDataToProps = accounts => ({
  accounts
})

export default compose(withData(accountsActions, mapAccountsDataToProps))(
  WalletManager
)
