// @flow
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { bindActionCreators } from 'redux'
import { withActions, withData } from 'spunky'

import withAuthData from '../../hocs/withAuthData'
import { showModal, hideModal } from '../../modules/modal'
import { logoutActions } from '../../actions/authActions'

import Migration from './Migration'
import newMigrationWalletActions from '../../actions/newMigrationWalletActions'

type Props = {
  logout: Function,
}

type NewWalletProps = {
  newWalletCreated: Function,
}

const mapLogoutActionsToProps = (actions): Props => ({
  logout: () => actions.call(),
})

const mapNewWalletActionsToProps = (actions): NewWalletProps => ({
  newWalletCreated: name => actions.call({ name }),
})

const mapDispatchToProps = (dispatch: Function) =>
  bindActionCreators(
    {
      showModal,
      hideModal,
    },
    dispatch,
  )

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withActions(newMigrationWalletActions, mapNewWalletActionsToProps),
  withActions(logoutActions, mapLogoutActionsToProps),
  withAuthData(),
  withData(newMigrationWalletActions),
)(Migration)
