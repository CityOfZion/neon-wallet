// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { generateNewWallet } from '../../modules/generateWallet'

import CreateWallet from './CreateWallet'

const actionCreators = {
  generateNewWallet
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(null, mapDispatchToProps)(CreateWallet)
