// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import NetworkSwitch from './NetworkSwitch'
import { setNetwork, checkVersion } from '../../modules/metadata'
import { initiateGetBalance } from '../../modules/wallet'

const mapStateToProps = (state) => ({
  net: state.metadata.network,
  address: state.account.address
})

const actionCreators = {
  initiateGetBalance,
  setNetwork,
  checkVersion
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NetworkSwitch)
