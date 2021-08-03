// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withCall, withData } from 'spunky'
import { injectIntl } from 'react-intl'

import NetworkConfigurationTooltip from './NetworkConfigurationTooltip'
import withExplorerData from '../../hocs/withExplorerData'
import { getNetworks } from '../../core/networks'
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import withNetworkData from '../../hocs/withNetworkData'
import nodeStorageActions from '../../actions/nodeStorageActions'
import accountsActions from '../../actions/accountsActions'
import withAuthData from '../../hocs/withAuthData'
import withThemeData from '../../hocs/withThemeData'
import withChainData from '../../hocs/withChainData'

const mapStateToProps = state => ({
  networks: getNetworks(state.spunky.settings.data.chain),
})

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

const mapSelectedNodeDataToProps = url => ({
  selectedNode: url,
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withChainData(),
  withNetworkData(),
  withCall(nodeStorageActions),
  withData(accountsActions, mapAccountsDataToProps),
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  withExplorerData(),
  withAuthData(),
  withThemeData(),
  injectIntl,
)(NetworkConfigurationTooltip)
