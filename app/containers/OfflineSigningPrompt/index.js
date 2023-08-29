// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { showModal } from '../../modules/modal'
import OfflineSigningPrompt from './OfflineSigningPrompt'
import { logoutActions } from '../../actions/authActions'
import { MODAL_TYPES } from '../../core/constants'
import { internetConnectionPromptPresented } from '../../actions/internetConnectivityPromptActions'
import withAuthData from '../../hocs/withAuthData'
import withSettingsContext from '../../hocs/withSettingsContext'

type Props = {
  logout: Function,
}

const mapDispatchToProps = (dispatch: Function) =>
  bindActionCreators(
    {
      showImportModal: props =>
        dispatch(
          showModal(MODAL_TYPES.IMPORT_TRANSACTION, {
            ...props,
            isOfflineMode: true,
          }),
        ),
    },
    dispatch,
  )

const mapActionsToProps = (actions): Props => ({
  logout: () => actions.call(),
})

const mapPromptActionsToProps = actions => ({
  promptHasBeenDisplayed: boolean => actions.call(boolean),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withActions(logoutActions, mapActionsToProps),
  withActions(internetConnectionPromptPresented, mapPromptActionsToProps),
  withAuthData,
)(withSettingsContext(OfflineSigningPrompt))
