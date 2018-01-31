// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'

import Settings from './Settings'
import withData from '../../hocs/api/withData'
import withActions from '../../hocs/api/withActions'
import withExplorerData from '../../hocs/withExplorerData'
import withCurrencyData from '../../hocs/withCurrencyData'
import accountsActions, { updateAccountsActions } from '../../actions/accountsActions'
import { updateSettingsActions } from '../../actions/settingsActions'
import { getNetworks } from '../../core/networks'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { showModal } from '../../modules/modal'

const mapStateToProps = (state: Object) => ({
  networks: getNetworks()
})

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

const mapAccountsDataToProps = (accounts) => ({ accounts })

const mapAccountsActionsToProps = (actions) => ({
  setAccounts: (accounts) => updateAccountsActions.request(accounts)
})

const mapSettingsActionsToProps = (actions) => ({
  setCurrency: (currency) => actions.request({ currency }),
  setBlockExplorer: (blockExplorer) => actions.request({ blockExplorer }),
  setUserGeneratedTokens: (tokens) => actions.request({ tokens })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(accountsActions, mapAccountsDataToProps),
  withExplorerData(),
  withCurrencyData(),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateSettingsActions, mapSettingsActionsToProps)
)(Settings)
