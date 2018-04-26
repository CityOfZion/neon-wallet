// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'

import Home from './Home'
import withFailureNotification from '../../hocs/withFailureNotification'
import { wifLoginActions } from '../../actions/authActions'

const mapActionsToProps = actions => ({
  loginWithPrivateKey: wif => actions.call({ wif })
})

export default compose(
  withActions(wifLoginActions, mapActionsToProps),
  withFailureNotification(wifLoginActions)
)(Home)
