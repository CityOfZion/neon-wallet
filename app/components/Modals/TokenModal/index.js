// @flow
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { compose } from 'recompose'
import { withActions } from 'spunky'

import TokenModal from './TokenModal'
import accountActions from '../../../actions/accountActions'
import withAuthData from '../../../hocs/withAuthData'
import withNetworkData from '../../../hocs/withNetworkData'
import { showErrorNotification } from '../../../modules/notifications'
import withSettingsContext from '../../../hocs/withSettingsContext'

const mapDispatchToProps = dispatch =>
  bindActionCreators({ showErrorNotification }, dispatch)

const mapAccountActionsToProps = (actions, props) => ({
  onSave: () =>
    actions.call({
      net: props.net,
      address: props.address,
      tokens: props.tokens,
    }),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withNetworkData(),
  withAuthData,
  withActions(accountActions, mapAccountActionsToProps),
)(withSettingsContext(TokenModal))
