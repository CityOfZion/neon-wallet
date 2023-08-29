// @flow
import { withActions } from 'spunky'
import { compose } from 'recompose'

import Logout from './Logout'
import { logoutActions } from '../../../../actions/authActions'
import { internetConnectionPromptPresented } from '../../../../actions/internetConnectivityPromptActions'
import withAuthData from '../../../../hocs/withAuthData'

type Props = {
  logout: Function,
}

// const mapActionsToProps = (actions): Props => ({
//   logout: () => actions.call(),
// })

const mapPromptActionsToProps = actions => ({
  promptHasBeenDisplayed: boolean => actions.call(boolean),
})

export default compose(
  // withActions(logoutActions, mapActionsToProps),
  withActions(internetConnectionPromptPresented, mapPromptActionsToProps),
  withAuthData,
)(Logout)
