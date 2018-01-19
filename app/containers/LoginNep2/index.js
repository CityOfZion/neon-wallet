// @flow
import LoginNep2 from './LoginNep2'
import withActions from '../../hocs/api/withActions'
import { nep2LoginActions } from '../../actions/accountActions'

const mapActionsToProps = (actions) => ({
  loginNep2: (passphrase, encryptedWIF) => actions.request({ passphrase, encryptedWIF })
})

export default withActions(nep2LoginActions, mapActionsToProps)(LoginNep2)
