// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TransactionHistory from './TransactionHistory'
import { syncTransactionHistory } from '../../modules/transactions'

const mapStateToProps = (state: Object) => ({
  address: state.account.address,
  net: state.metadata.network,
  transactions: state.wallet.transactions,
  explorer: state.metadata.blockExplorer
})

const actionCreators = {
  syncTransactionHistory
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
