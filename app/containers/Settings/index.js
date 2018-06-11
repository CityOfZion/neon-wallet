// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withData, withActions } from 'spunky'

import Settings from './Settings'
import withExplorerData from '../../hocs/withExplorerData'
import withCurrencyData from '../../hocs/withCurrencyData'
import accountsActions, { updateAccountsActions } from '../../actions/accountsActions'
import { updateSettingsActions } from '../../actions/settingsActions'
import { nep2DetailsLoginActions } from '../../actions/authActions'
import { getNetworks } from '../../core/networks'
import { showErrorNotification, showSuccessNotification } from '../../modules/notifications'
import { showModal } from '../../modules/modal'

const mapStateToProps = (state: Object) => ({
  networks: getNetworks()
})

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
  nep2DetailsLoginActions
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

const mapAccountsDataToProps = (accounts) => ({ accounts })

const mapAccountsActionsToProps = (actions) => ({
  setAccounts: (accounts) => actions.call(accounts)
})

const mapSettingsActionsToProps = (actions) => ({
  setCurrency: (currency) => actions.call({ currency }),
  setBlockExplorer: (blockExplorer) => actions.call({ blockExplorer }),
  setUserGeneratedTokens: (tokens) => actions.call({ tokens })
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withData(accountsActions, mapAccountsDataToProps),
  withExplorerData(),
  withCurrencyData(),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateSettingsActions, mapSettingsActionsToProps)
)(Settings)
