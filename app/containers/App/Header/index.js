// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withActions from '../../../hocs/api/withActions'
import withNetworkData from '../../../hocs/withNetworkData'
import withCurrencyData from '../../../hocs/withCurrencyData'
import networkActions from '../../../actions/networkActions'
import { type Actions } from '../../../values/api'
import { logout, getAddress, getLoggedIn } from '../../../modules/account'
import { getNetworks } from '../../../core/networks'
import { getNEOPrice, getGASPrice } from '../../../modules/price'

import Header from './Header'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  address: getAddress(state),
  neoPrice: getNEOPrice(state),
  gasPrice: getGASPrice(state),
  isLoggedIn: getLoggedIn(state),
  networks: getNetworks()
})

const actionCreators = {
  logout
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapActionsToProps = (actions: Actions, props: Object): Object => ({
  onChangeNetwork: (networkId) => actions.request({ networkId })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNetworkData(),
  withCurrencyData('currencyCode'),
  withActions(networkActions, mapActionsToProps)
)(Header)
