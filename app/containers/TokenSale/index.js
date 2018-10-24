// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { pick } from 'lodash'
import { withData, withCall } from 'spunky'
import TokenSale from './TokenSale'

import balancesActions from '../../actions/balancesActions'
import icoTokensActions from '../../actions/icoTokensActions'
import withAuthData from '../../hocs/withAuthData'
import withNetworkData from '../../hocs/withNetworkData'
import withPricesData from '../../hocs/withPricesData'
import withTokensData from '../../hocs/withTokensData'
import withSuccessNotification from '../../hocs/withSuccessNotification'
import { showModal } from '../../modules/modal'

import { participateInSale } from '../../modules/sale'

const mapPricesDataToProps = (prices: Object) => ({
  prices
})

const mapDispatchToProps = dispatch => ({
  participateInSale: (...args) => dispatch(participateInSale(...args)),
  showModal: (...args) => dispatch(showModal(...args))
})

const mapBalancesDataToProps = balances => ({
  assetBalances: pick(balances, 'NEO', 'GAS')
})

const mapIcoTokensToProps = icoTokens => ({ icoTokens })

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withAuthData(),
  withNetworkData(),
  withTokensData(),
  withData(balancesActions, mapBalancesDataToProps),
  withPricesData(mapPricesDataToProps),
  withCall(icoTokensActions),
  withData(icoTokensActions, mapIcoTokensToProps),
  withSuccessNotification(
    balancesActions,
    'Received latest blockchain information.'
  ),
  connect(
    null,
    mapDispatchToProps
  )
)(TokenSale)
