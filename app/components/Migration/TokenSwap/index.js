// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { injectIntl } from 'react-intl'

import TokenSwap from './TokenSwap'
import { generateNewWalletAccount } from '../../../modules/generateWallet'
import withAuthData from '../../../hocs/withAuthData'
import withSettingsContext from '../../../hocs/withSettingsContext'

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
)(withSettingsContext(injectIntl(TokenSwap)))
