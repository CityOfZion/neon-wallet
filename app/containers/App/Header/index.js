// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withCurrencyData from '../../../hocs/withCurrencyData'
import { logout, getAddress, getLoggedIn } from '../../../modules/account'
import { getNEOPrice, getGASPrice } from '../../../modules/price'

import Header from './Header'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  address: getAddress(state),
  neoPrice: getNEOPrice(state),
  gasPrice: getGASPrice(state),
  isLoggedIn: getLoggedIn(state)
})

const actionCreators = {
  logout
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withCurrencyData('currencyCode')
)(Header)
