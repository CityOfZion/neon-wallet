// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setKeys, getAccountKeys } from '../../modules/account'
import { setBlockExplorer, getBlockExplorer } from '../../modules/metadata'
import { showModal } from '../../modules/modal'

import Settings from './Settings'

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
