// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withCall, withData } from 'spunky'
import { injectIntl } from 'react-intl'

import NetworkConfigurationTooltip from './NetworkConfigurationTooltip'

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../modules/notifications'
import { showModal } from '../../modules/modal'
import withNetworkData from '../../hocs/withNetworkData'
import nodeStorageActions from '../../actions/nodeStorageActions'

import withAuthData from '../../hocs/withAuthData'

const actionCreators = {
  showModal,
  showErrorNotification,
  showSuccessNotification,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionCreators, dispatch)

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
  withData(nodeStorageActions, mapSelectedNodeDataToProps),
  injectIntl,
  withAuthData,
)(NetworkConfigurationTooltip)
