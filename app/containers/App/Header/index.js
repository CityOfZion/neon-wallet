// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withData from '../../../hocs/api/withData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import pricesActions from '../../../actions/pricesActions'
import { logout, getAddress, getLoggedIn } from '../../../modules/account'

import Header from './Header'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  address: getAddress(state),
  isLoggedIn: getLoggedIn(state)
})

const mapPricesDataToProps = ({ NEO, GAS }) => ({
  neoPrice: NEO,
  gasPrice: GAS
})

const actionCreators = {
  logout
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(pricesActions, mapPricesDataToProps),
  withCurrencyData('currencyCode')
)(Header)
