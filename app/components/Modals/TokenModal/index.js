// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withActions, withRecall } from 'spunky'

import TokenModal from './TokenModal'
import accountActions from '../../../actions/accountActions'
import { updateSettingsActions } from '../../../actions/settingsActions'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import withTokensData from '../../../hocs/withTokensData'
import { showErrorNotification } from '../../../modules/notifications'

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showErrorNotification }, dispatch)

const mapSettingsActionsToProps = actions => ({
  setUserGeneratedTokens: tokens => actions.call({ tokens })
})

const mapAccountActionsToProps = (actions, props) => ({
  onSave: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens
    })
})

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withNetworkData(),
  withAuthData(),
  withTokensData(),
  withActions(updateSettingsActions, mapSettingsActionsToProps),
  withActions(accountActions, mapAccountActionsToProps)
)(TokenModal)
