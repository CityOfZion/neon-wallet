// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NetworkSwitch from './NetworkSwitch'
import { setNetwork, checkVersion, getNetwork } from '../../modules/metadata'
import { loadWalletData } from '../../modules/wallet'
import { getAddress } from '../../modules/account'

const mapStateToProps = (state: Object) => ({
  net: getNetwork(state),
  address: getAddress(state)
})

const actionCreators = {
  loadWalletData,
  setNetwork,
  checkVersion
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitch)
