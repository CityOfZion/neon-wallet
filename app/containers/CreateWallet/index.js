// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { generateNewWalletAccount } from '../../modules/generateWallet'

import CreateWallet from './CreateWallet'

const actionCreators = {
  generateNewWalletAccount
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(CreateWallet)
