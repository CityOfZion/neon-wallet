// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { syncTransactionHistory, getIsLoadingTransactions } from '../../modules/transactions'
import { getAddress } from '../../modules/account'
import { getTransactions } from '../../modules/wallet'
import TransactionHistory from './TransactionHistory'

const mapStateToProps = (state: Object) => ({
  address: getAddress(state),
  transactions: getTransactions(state),
  isLoadingTransactions: getIsLoadingTransactions(state)
})

const actionCreators = {
  syncTransactionHistory
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
