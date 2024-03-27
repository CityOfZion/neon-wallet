// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'

import { injectIntl } from 'react-intl'
import accountsActions from '../../actions/accountsActions'
import n3AccountsActions from '../../actions/n3AccountsActions'
import withThemeData from '../../hocs/withThemeData'

import MigrateWalletsNeon3Steps from './Steps'

const mapAccountsDataToProps = accounts => ({
  accounts,
})

const mapN3AccountsDataToProps = accounts => ({
  n3Accounts: accounts,
})

export default compose(
  withThemeData(),
  withData(accountsActions, mapAccountsDataToProps),
  withData(n3AccountsActions, mapN3AccountsDataToProps),
  injectIntl,
)(MigrateWalletsNeon3Steps)
