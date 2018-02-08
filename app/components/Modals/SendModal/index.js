// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { omit } from 'lodash'
import { withData } from 'spunky'

import SendModal from './SendModal'
import balancesActions from '../../../actions/balancesActions'
import withAuthData from '../../../hocs/withAuthData'
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
  withNetworkData(),
  withData(balancesActions, mapBalancesDataToProps)
)(SendModal)
