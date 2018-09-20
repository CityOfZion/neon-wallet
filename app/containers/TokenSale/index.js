// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { pick } from 'lodash'
import { withData } from 'spunky'
import TokenSale from './TokenSale'

import balancesActions from '../../actions/balancesActions'
import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'
import { participateInSale } from '../../modules/sale'

import { getICOTokens } from '../../util/getICOTokens'

const mapDispatchToProps = dispatch => ({
  participateInSale: (...args) => dispatch(participateInSale(...args))
})

const mapBalancesDataToProps = balances => ({
  assetBalances: pick(balances, 'NEO', 'GAS'),
  tokenBalances: getICOTokens()
})

export default compose(
  withAuthData(),
  withNetworkData(),
  withData(balancesActions, mapBalancesDataToProps),
  connect(
    null,
    mapDispatchToProps
  )
)(TokenSale)
