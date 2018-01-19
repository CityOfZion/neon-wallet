// @flow
import LoginPrivateKey from './LoginPrivateKey'
import withActions from '../../hocs/api/withActions'
import { wifLoginActions } from '../../actions/accountActions'

const mapActionsToProps = (actions) => ({
  loginWithPrivateKey: (wif) => actions.request({ wif })
})

export default withActions(wifLoginActions, mapActionsToProps)(LoginPrivateKey)
