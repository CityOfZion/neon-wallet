// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Settings from './Settings'
import { setKeys } from '../../modules/account'
import { setBlockExplorer } from '../../modules/metadata'

const mapStateToProps = (state: Object) => ({
  explorer: state.metadata.blockExplorer,
  wallets: state.account.accountKeys
})

const actionCreators = {
  setKeys,
  setBlockExplorer
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
