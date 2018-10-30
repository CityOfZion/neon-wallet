// @flow
import { compose, withProps } from 'recompose'
import { wallet } from 'neon-js'
import { validatePassphraseLength } from '../../core/wallet'

import Encrypt from './Encrypt'

const encryptPrivateKey = (privateKey, passphrase, confirmPassphrase) => {
  if (passphrase !== confirmPassphrase) {
    throw new Error('Passphrases do not match')
  }
  if (!validatePassphraseLength(passphrase)) {
    throw new Error('Please choose a longer passphrase')
  }
  if (privateKey && !wallet.isWIF(privateKey)) {
    throw new Error('The private key is not valid')
  }
  return wallet.encrypt(privateKey, passphrase)
}

export default compose(
  withProps({
    encryptPrivateKey,
    isWIF: wallet.isWIF,
    validatePassphraseLength
  })
)(Encrypt)
