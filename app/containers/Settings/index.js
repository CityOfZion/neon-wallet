// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Settings from './Settings'
import { setKeys, getAccountKeys } from '../../modules/account'
import { setBlockExplorer, getBlockExplorer } from '../../modules/metadata'
import { showModal } from '../../modules/modal'

const mapStateToProps = (state: Object) => ({
  explorer: getBlockExplorer(state),
  wallets: getAccountKeys(state)
})

const actionCreators = {
  setKeys,
  setBlockExplorer,
  showModal
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
