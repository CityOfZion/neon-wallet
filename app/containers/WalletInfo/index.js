// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import WalletInfo from './WalletInfo'
import { initiateGetBalance } from '../../modules/wallet'
import { showErrorNotification, showSuccessNotification, showStickyInfoNotification } from '../../modules/notification'

const mapStateToProps = (state) => ({
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  address: state.account.address,
  net: state.metadata.network,
  price: state.wallet.price
})

const actionCreators = {
  initiateGetBalance,
  showErrorNotification,
  showSuccessNotification,
  showStickyInfoNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WalletInfo)
