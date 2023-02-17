// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import {
  withData,
  withActions,
  type Actions,
  withCall,
  withRecall,
  withReset,
} from 'spunky'

import Settings from './Settings'
import accountsActions, {
  updateAccountsActions,
} from '../../actions/accountsActions'
import pricesActions from '../../actions/pricesActions'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import networkActions from '../../actions/networkActions'
import withNetworkData from '../../hocs/withNetworkData'
import nodeStorageActions from '../../actions/nodeStorageActions'
import dashboardActions from '../../actions/dashboardActions'
import { updateAccountsActions as updateN3AccountsActions } from '../../actions/n3AccountsActions'
import withSettingsContext from '../../hocs/withSettingsContext'

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

const mapAccountsDataToProps = accounts => ({
  accounts,
})

const mapAccountsActionsToProps = actions => ({
  setAccounts: accounts => actions.call(accounts),
})

const mapN3AccountsActionsToProps = actions => ({
  setN3Accounts: accounts => actions.call(accounts),
})

const mapActionsToProps = (actions: Actions): Object => ({
  handleNetworkChange: networkId => actions.call({ networkId }),
})

const mapSelectedNodeDataToProps = url => ({
  selectedNode: url,
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withNetworkData(),
  withCall(nodeStorageActions),
  withData(accountsActions, mapAccountsDataToProps),
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  withActions(networkActions, mapActionsToProps),
  withRecall(nodeStorageActions, ['networkId']),
  withActions(updateAccountsActions, mapAccountsActionsToProps),
  withActions(updateN3AccountsActions, mapN3AccountsActionsToProps),
  withReset(dashboardActions, ['currency']),
  withReset(pricesActions, ['currency']),
  withRecall(dashboardActions, ['currency']),
)(withSettingsContext(Settings))
