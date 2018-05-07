// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { omit } from 'lodash'

import SendModal from './SendModal'
import withAuthData from '../../../hocs/withAuthData'
import withBalancesData from '../../../hocs/withBalancesData'
import withNetworkData from '../../../hocs/withNetworkData'
import { sendTransaction } from '../../../modules/transactions'

const mapBalancesDataToProps = (balances) => ({
  NEO: balances.NEO,
  GAS: balances.GAS,
  tokenBalances: omit(balances, 'NEO', 'GAS')
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ sendTransaction }, dispatch)

export default compose(
  connect(null, mapDispatchToProps),
  withAuthData(),
  withBalancesData(mapBalancesDataToProps),
  withNetworkData()
)(SendModal)
