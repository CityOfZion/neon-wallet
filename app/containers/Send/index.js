// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Send from './Send'
import { sendTransaction, toggleAsset, getSelectedAsset } from '../../modules/transactions'
import { showErrorNotification } from '../../modules/notifications'
import { togglePane, getConfirmPane } from '../../modules/dashboard'
import { getNeo, getGas } from '../../modules/wallet'

const mapStateToProps = (state) => ({
  neo: getNeo(state),
  gas: getGas(state),
  selectedAsset: getSelectedAsset(state),
  confirmPane: getConfirmPane(state)
})

const actionCreators = {
  sendTransaction,
  toggleAsset,
  togglePane,
  showErrorNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Send)
