// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setAccounts, getAccounts } from '../../modules/account'
import {
  setBlockExplorer,
  getBlockExplorer,
  getNetworks,
  getAllTokens,
  setUserGeneratedTokens
} from '../../modules/metadata'
import { setCurrency, getCurrency } from '../../modules/price'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'

import { showModal } from '../../modules/modal'

import Settings from './Settings'

const mapStateToProps = (state: Object) => ({
  explorer: getBlockExplorer(state),
  currency: getCurrency(state),
  accounts: getAccounts(state),
  networks: getNetworks(state),
  allTokens: getAllTokens(state)
})

const actionCreators = {
  setAccounts,
  setBlockExplorer,
  setCurrency,
  showModal,
  showErrorNotification,
  showSuccessNotification,
  setUserGeneratedTokens
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
