// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Send from './Send'
import { sendTransaction, toggleAsset } from '../../modules/transactions'
import { showErrorNotification } from '../../modules/notification'
import { togglePane } from '../../modules/dashboard'

const mapStateToProps = (state) => ({
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  selectedAsset: state.transactions.selectedAsset,
  confirmPane: state.dashboard.confirmPane
})

const actionCreators = {
  sendTransaction,
  toggleAsset,
  togglePane,
  showErrorNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Send)
