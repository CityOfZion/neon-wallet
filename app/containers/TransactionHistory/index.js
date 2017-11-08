// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TransactionHistory from './TransactionHistory'
import { syncTransactionHistory } from '../../modules/transactions'
import { getAddress } from '../../modules/account'
import { getBlockExplorer, getNetwork } from '../../modules/metadata'
import { getTransactions } from '../../modules/wallet'

const mapStateToProps = (state: Object) => ({
  address: getAddress(state),
  net: getNetwork(state),
  transactions: getTransactions(state),
  explorer: getBlockExplorer(state)
})

const actionCreators = {
  syncTransactionHistory
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
