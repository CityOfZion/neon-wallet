// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { syncTransactionHistory, getIsLoadingTransactions } from '../../modules/transactions'
import { getNetwork } from '../../modules/metadata'
import { getAddress } from '../../modules/account'
import { getTransactions } from '../../modules/wallet'
import TransactionHistory from './TransactionHistory'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state),
  address: getAddress(state),
  transactions: getTransactions(state),
  isLoadingTransactions: getIsLoadingTransactions(state)
})

const actionCreators = {
  syncTransactionHistory
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory)
