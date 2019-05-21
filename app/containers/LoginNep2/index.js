// @flow
import { compose } from 'recompose'
import { withActions, withProgress } from 'spunky'

import LoginNep2 from './LoginNep2'
import withLoadingProp from '../../hocs/withLoadingProp'
import withFailureNotification from '../../hocs/withFailureNotification'
import pureStrategy from '../../hocs/helpers/pureStrategy'
import { nep2LoginActions } from '../../actions/authActions'
import withCameraAvailability from '../../hocs/withCameraAvailability'

const mapActionsToProps = actions => ({
  loginNep2: (passphrase, encryptedWIF) =>
    actions.call({ passphrase, encryptedWIF }),
})

export default compose(
  withActions(nep2LoginActions, mapActionsToProps),
  withLoadingProp(nep2LoginActions, { strategy: pureStrategy }),
  withFailureNotification(nep2LoginActions),
  withProgress(nep2LoginActions),
  withCameraAvailability,
)(LoginNep2)
