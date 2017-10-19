// @flow
import { connect } from 'react-redux'
import NetworkSwitch from './NetworkSwitch'
import { setNetwork, checkVersion } from '../../modules/metadata'
import { initiateGetBalance } from '../../modules/wallet'

const mapStateToProps = (state) => ({
  net: state.metadata.network,
  address: state.account.address
})

const mapDispatchToProps = (dispatch: DispatchType) => ({
  initiateGetBalance: (net, address) => dispatch(initiateGetBalance(net, address)),
  setNetwork: (net) => dispatch(setNetwork(net)),
  checkVersion: (net) => dispatch(checkVersion(net))
})

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitch)
