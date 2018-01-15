// @flow
import { connect, type MapStateToProps } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import withActions from '../../../hocs/api/withActions'
import withNetworkData from '../../../hocs/withNetworkData'
import networkActions from '../../../actions/networkActions'
import { type Actions } from '../../../values/api'
import { logout, getAddress, getLoggedIn } from '../../../modules/account'
import { getBlockHeight } from '../../../modules/metadata'
import { getNetworks } from '../../../core/networks'
import { getNEOPrice, getGASPrice, getCurrency } from '../../../modules/price'

import Header from './Header'

const mapStateToProps: MapStateToProps<*, *, *> = (state: Object) => ({
  blockHeight: getBlockHeight(state),
  address: getAddress(state),
  neoPrice: getNEOPrice(state),
  gasPrice: getGASPrice(state),
  currencyCode: getCurrency(state),
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
  withActions(networkActions, mapActionsToProps)
)(Header)
