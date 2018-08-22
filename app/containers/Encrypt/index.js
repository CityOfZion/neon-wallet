// @flow
import { compose } from 'recompose'
import { withActions } from 'spunky'

import Encrypt from './Encrypt'

import { encryptPrivateKey } from '../../actions/settingsActions'

const mapEncryptActionsToProps = actions => ({
  encryptPrivateKey: (privateKey, passphrase, confirmPassphrase) =>
    actions.call({ privateKey, passphrase, confirmPassphrase })
})

export default compose(
  withActions(encryptPrivateKey, mapEncryptActionsToProps)
)(Encrypt)
