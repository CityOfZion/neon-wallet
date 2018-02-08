// @flow
import { withActions } from 'spunky'

import Logout from './Logout'
import { logoutActions } from '../../../../actions/authActions'

type Props = {
  logout: Function
}

const mapActionsToProps = (actions): Props => ({
  logout: () => actions.call()
})

export default withActions(logoutActions, mapActionsToProps)(Logout)
