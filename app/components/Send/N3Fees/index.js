// @flow
import { compose } from 'recompose'
import { values, omit } from 'lodash-es'

import N3Fees from './N3Fees'
import withBalancesData from '../../../hocs/withBalancesData'
import withPricesData from '../../../hocs/withPricesData'
import withSettingsContext from '../../../hocs/withSettingsContext'

const mapBalanceDataToProps = balances => ({
  GAS: balances.GAS,
})

const mapPricesDataToProps = ({ GAS }) => ({
  gasPrice: GAS,
})

export default compose(
  withPricesData(mapPricesDataToProps),
  withBalancesData(mapBalanceDataToProps),
  withSettingsContext,
)(N3Fees)
