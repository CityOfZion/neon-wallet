// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withNetworkData from '../../hocs/withNetworkData'
import withAccountData from '../../hocs/withAccountData'
import { syncTransactionHistory, getIsLoadingTransactions } from '../../modules/transactions'
import { getTransactions } from '../../modules/wallet'
import TransactionHistory from './TransactionHistory'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  transactions: getTransactions(state),
  isLoadingTransactions: getIsLoadingTransactions(state)
})

const actionCreators = {
  syncTransactionHistory
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData(),
  withAccountData()
)(TransactionHistory)
