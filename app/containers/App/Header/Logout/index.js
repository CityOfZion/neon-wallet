// @flow
import Logout from './Logout'
import withActions from '../../../../hocs/api/withActions'
import { logoutActions } from '../../../../actions/accountActions'

type Props = {
  logout: Function
}

const mapActionsToProps = (actions): Props => ({
  logout: () => actions.request()
})

export default withActions(logoutActions, mapActionsToProps)(Logout)
