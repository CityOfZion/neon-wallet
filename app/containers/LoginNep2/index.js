// @flow
import { compose } from 'recompose'

import LoginNep2 from './LoginNep2'
import withActions from '../../hocs/api/withActions'
import withFailureNotification from '../../hocs/withFailureNotification'
import { nep2LoginActions } from '../../actions/authActions'

const mapActionsToProps = (actions) => ({
  loginNep2: (passphrase, encryptedWIF) => actions.request({ passphrase, encryptedWIF })
})

export default compose(
  withActions(nep2LoginActions, mapActionsToProps),
  withFailureNotification(nep2LoginActions)
)(LoginNep2)
