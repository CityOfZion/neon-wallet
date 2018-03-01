// @flow
import { compose } from 'recompose'
import { withData } from 'spunky'
import { pick, omit } from 'lodash'

import PortfolioPanel from './PortfolioPanel'
import balancesActions from '../../../actions/balancesActions'
import withCurrencyData from '../../../hocs/withCurrencyData'
import { getTokenBalancesMap } from '../../../core/wallet'
import { ASSETS } from '../../../core/constants'

const mapBalancesDataToProps = (balances) => ({
  balances: {
    ...pick(balances, ASSETS.NEO, ASSETS.GAS),
    ...getTokenBalancesMap(omit(balances, 'NEO', 'GAS'))
  }
})

export default compose(
  withData(balancesActions, mapBalancesDataToProps),
  withCurrencyData()
)(PortfolioPanel)
