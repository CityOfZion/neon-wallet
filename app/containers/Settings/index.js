// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import Settings from './Settings'
import withActions from '../../hocs/api/withActions'
import withExplorerData from '../../hocs/withExplorerData'
import withCurrencyData from '../../hocs/withCurrencyData'
import { setAccounts, getAccounts } from '../../modules/account'
import { updateSettingsActions } from '../../actions/settingsActions'
import { getNetworks } from '../../core/networks'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { showModal } from '../../modules/modal'

const mapStateToProps = (state: Object) => ({
  accounts: getAccounts(state),
  networks: getNetworks()
})

const actionCreators = {
  setAccounts,
  showModal,
  showErrorNotification,
  showSuccessNotification
}

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch)

const mapActionsToProps = (actions) => ({
  setCurrency: (currency) => actions.request({ currency }),
  setBlockExplorer: (blockExplorer) => actions.request({ blockExplorer }),
  setUserGeneratedTokens: (tokens) => actions.request({ tokens })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withExplorerData(),
  withCurrencyData(),
  withActions(updateSettingsActions, mapActionsToProps)
)(Settings)
