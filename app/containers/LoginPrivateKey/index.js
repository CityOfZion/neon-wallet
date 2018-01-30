// @flow
import { compose } from 'recompose'

import LoginPrivateKey from './LoginPrivateKey'
import withActions from '../../hocs/api/withActions'
import withFailureNotification from '../../hocs/withFailureNotification'
import { wifLoginActions } from '../../actions/authActions'

const mapActionsToProps = (actions) => ({
  loginWithPrivateKey: (wif) => actions.request({ wif })
})

export default compose(
  withActions(wifLoginActions, mapActionsToProps),
  withFailureNotification(wifLoginActions)
)(LoginPrivateKey)
