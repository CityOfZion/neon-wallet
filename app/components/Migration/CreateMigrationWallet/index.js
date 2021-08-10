// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'

import CreateMigrationWallet from './CreateMigrationWallet'
import { generateNewWalletAccount } from '../../../modules/generateWallet'
import withChainData from '../../../hocs/withChainData'
import withAuthData from '../../../hocs/withAuthData'

const actionCreators = {
  generateNewWalletAccount,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withAuthData(),
  withChainData(),
)(injectIntl(CreateMigrationWallet))
