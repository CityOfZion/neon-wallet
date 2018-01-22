// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withNetworkData from '../../hocs/withNetworkData'
import { syncTransactionHistory, getIsLoadingTransactions } from '../../modules/transactions'
import { getAddress } from '../../modules/account'
import { getTransactions } from '../../modules/wallet'
import TransactionHistory from './TransactionHistory'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  address: getAddress(state),
  transactions: getTransactions(state),
  isLoadingTransactions: getIsLoadingTransactions(state)
})

const actionCreators = {
  syncTransactionHistory
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData()
)(TransactionHistory)
