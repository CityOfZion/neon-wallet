// @flow
import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { wallet } from '@cityofzion/neon-js'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import PasswordInput from '../../Inputs/PasswordInput'
import AddIcon from '../../../assets/icons/add.svg'
import styles from './EncryptForm.scss'
import { MIN_PASSPHRASE_LEN } from '../../../core/wallet'

type Props = {
  validatePassphraseLength(text: string): void,
  setEncryptedWIF(encryptedWif: string): void,
  chain: string,
}

const EncryptForm = ({
  chain,
  validatePassphraseLength,
  setEncryptedWIF,
}: Props) => {
  const intl = useIntl()

  const [privateKey, setPrivateKey] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [confirmPassphrase, setConfirmPassphrase] = useState('')
  const [privateKeyError, setPrivateKeyError] = useState('')
  const [passphraseError, setPassphraseError] = useState('')
  const [confirmPassphraseError, setConfirmPassphraseError] = useState('')
  const [isDisabled, setIsDisabled] = useState(true)

  const validatePrivateKey = () => {
    const isWIF = chain === 'neo3' ? n3Wallet.isWIF : wallet.isWIF

    if (privateKey && !isWIF(privateKey)) {
      setPrivateKeyError(intl.formatMessage({ id: 'errors.encrypt.valid' }))

      return false
    }

    return true
  }

  const validatePassphrase = () => {
    if (!validatePassphraseLength(passphrase)) {
      setPassphraseError(
        intl.formatMessage(
          { id: 'errors.password.length' },
          { MIN_PASSPHRASE_LEN },
        ),
      )
      return false
    }

    return true
  }

  const validateConfirmPassphrase = () => {
    if (passphrase !== confirmPassphrase) {
      setConfirmPassphraseError(
        intl.formatMessage({ id: 'errors.password.match' }),
      )
      return false
    }

    return true
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const privateKeyIsValid = validatePrivateKey()
    const passphraseisValid = validatePassphrase()
    const confirmPassphraseIsValid = validateConfirmPassphrase()

    if (!privateKeyIsValid || !passphraseisValid || !confirmPassphraseIsValid)
      return

    const encryptedWIF =
      chain === 'neo3'
        ? await n3Wallet.encrypt(privateKey, passphrase)
        : wallet.encrypt(privateKey, passphrase)

    setEncryptedWIF(encryptedWIF)
  }

  useEffect(
    () => {
      setIsDisabled(!privateKey || !passphrase || !confirmPassphrase)
    },
    [privateKey, passphrase, confirmPassphrase],
  )

  useEffect(
    () => {
      setPassphraseError('')
      setConfirmPassphraseError('')
    },
    [passphrase, confirmPassphrase],
  )

  useEffect(
    () => {
      setPrivateKeyError('')
    },
    [privateKey],
  )

  return (
    <section className={styles.formContainer}>
      <form className={styles.encryptForm} onSubmit={handleSubmit}>
        <TextInput
          id="privateKey"
          name="privateKey"
          label={intl.formatMessage({ id: 'encryptStep1Label' })}
          placeholder={intl.formatMessage({ id: 'encryptStep1Placeholder' })}
          value={privateKey}
          onChange={event => setPrivateKey(event.target.value)}
          error={privateKeyError}
        />
        <PasswordInput
          id="passphrase"
          name="passphrase"
          label={intl.formatMessage({ id: 'encryptStep2Label' })}
          placeholder={intl.formatMessage({ id: 'encryptStep2Placeholder' })}
          value={passphrase}
          onChange={event => setPassphrase(event.target.value)}
          error={passphraseError}
        />
        <PasswordInput
          id="confirmPassphrase"
          name="confirmPassphrase"
          label={intl.formatMessage({ id: 'encryptStep3Label' })}
          placeholder={intl.formatMessage({ id: 'encryptStep3Placeholder' })}
          value={confirmPassphrase}
          onChange={event => setConfirmPassphrase(event.target.value)}
          error={confirmPassphraseError}
        />
        <Button
          primary
          type="submit"
          renderIcon={AddIcon}
          disabled={isDisabled}
        >
          {intl.formatMessage({ id: 'encryptButton' })}
        </Button>
      </form>
    </section>
  )
}

export default EncryptForm
