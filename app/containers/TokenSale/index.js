// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { pick } from 'lodash'
import { withData } from 'spunky'
import TokenSale from './TokenSale'

import balancesActions from '../../actions/balancesActions'
import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'
import withPricesData from '../../hocs/withPricesData'

import { participateInSale } from '../../modules/sale'
import { getICOTokens } from '../../util/getICOTokens'

const mapPricesDataToProps = (prices: Object) => ({
  prices
})

const mapDispatchToProps = dispatch => ({
  participateInSale: (...args) => dispatch(participateInSale(...args))
})

const mapBalancesDataToProps = balances => ({
  assetBalances: pick(balances, 'NEO', 'GAS'),
  icoTokens: getICOTokens()
})

export default compose(
  withAuthData(),
  withNetworkData(),
  withData(balancesActions, mapBalancesDataToProps),
  withPricesData(mapPricesDataToProps),
  connect(
    null,
    mapDispatchToProps
  )
)(TokenSale)
