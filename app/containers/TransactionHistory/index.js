// @flow
import { connect } from 'react-redux'
import TransactionHistory from './TransactionHistory'
import { syncTransactionHistory } from '../../modules/transactions'

const mapStateToProps = (state: Object) => ({
  address: state.account.address,
  net: state.metadata.network,
  transactions: state.wallet.transactions,
  explorer: state.metadata.blockExplorer
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  syncTransactionHistory: (net, address) => dispatch(syncTransactionHistory(net, address))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
