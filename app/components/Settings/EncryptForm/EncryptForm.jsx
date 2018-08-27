// @flow
import React from 'react'
import { noop } from 'lodash'
import { wallet } from 'neon-js'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import PasswordInput from '../../Inputs/PasswordInput'
import AddIcon from '../../../assets/icons/add.svg'
import styles from './EncryptForm.scss'
import { validatePassphraseLength } from '../../../core/wallet'

type Props = {
  submitLabel: string,
  formPrivateKey: string,
  formPassphrase: string,
  formConfirmPassphrase: string,
  onSubmit: Function
}

type State = {
  privateKeyError: string,
  passphraseError: string,
  confirmPassphraseError: string,
  isDisabled: boolean
}

export default class EncryptForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      privateKeyError: '',
      passphraseError: '',
      confirmPassphraseError: '',
      isDisabled: true
    }
  }

  static defaultProps = {
    submitLabel: 'Generate Encrypted key',
    onSubmit: noop
  }

  render() {
    const {
      submitLabel,
      formPrivateKey,
      formPassphrase,
      formConfirmPassphrase
    } = this.props
    const {
      privateKeyError,
      passphraseError,
      confirmPassphraseError,
      isDisabled
    } = this.state

    return (
      <section>
        <form className={styles.encryptForm} onSubmit={this.handleSubmit}>
          <TextInput
            id="privateKey"
            name="privateKey"
            label="Enter the private key you want to encrypt"
            placeholder="Enter key"
            value={formPrivateKey}
            onChange={this.handleChangePrivateKey}
            error={privateKeyError}
          />
          <PasswordInput
            id="passphrase"
            name="passphrase"
            label="Create a passphrase"
            placeholder="Enter Passphrase"
            value={formPassphrase}
            onChange={this.handleChangePassphrase}
            error={passphraseError}
          />
          <PasswordInput
            id="confirmPassphrase"
            name="confirmPassphrase"
            label="Confim your passphrase"
            placeholder="Confirm Passphrase"
            value={formConfirmPassphrase}
            onChange={this.handleChangeConfirmPassphrase}
            error={confirmPassphraseError}
          />
          <Button
            className={styles.submitButton}
            primary
            type="submit"
            renderIcon={AddIcon}
            disabled={isDisabled}
          >
            {submitLabel}
          </Button>
        </form>
      </section>
    )
  }

  validatePrivateKey = (privateKey: string) => {
    if (privateKey && !wallet.isWIF(privateKey)) {
      this.setState({ privateKeyError: 'The private key is not valid' })
      return false
    }
    return true
  }

  validatePassphrase = (passphrase: string, confirmPassphrase: string) => {
    if (passphrase !== confirmPassphrase) {
      this.setState({ passphraseError: 'Passphrases do not match' })
      return false
    }
    if (!validatePassphraseLength(passphrase)) {
      this.setState({ passphraseError: 'Please choose a longer passphrase' })
      return false
    }
    return true
  }

  validate = (
    privateKey: string,
    passphrase: string,
    confirmPassphrase: string
  ) => {
    const validPrivateKey = this.validatePrivateKey(privateKey)
    const validatePassphrase = this.validatePassphrase(
      passphrase,
      confirmPassphrase
    )

    return validPrivateKey && validatePassphrase
  }

  clearErrors = (name: string) => {
    if (name === 'passphrase' || name === 'confirmPassphrase') {
      this.setState({ passphraseError: '' })
      this.setState({ confirmPassphraseError: '' })
    } else if (name === 'privateKey') {
      this.setState({ privateKeyError: '' })
    }
  }

  setButtonIsDisabled = () => {
    const { privateKey, passphrase, confirmPassphrase } = this.state
    this.setState({
      isDisabled: !privateKey || !passphrase || !confirmPassphrase
    })
  }

  handleChangePrivateKey = (event: Object) => {
    this.setState({ privateKey: event.target.value })
    this.clearErrors(event.target.name)
    this.setButtonIsDisabled()
  }

  handleChangePassphrase = (event: Object) => {
    this.setState({ passphrase: event.target.value })
    this.clearErrors(event.target.name)
    this.setButtonIsDisabled()
  }

  handleChangeConfirmPassphrase = (event: Object) => {
    this.setState({ confirmPassphrase: event.target.value })
    this.clearErrors(event.target.name)
    this.setButtonIsDisabled()
  }

  handleSubmit = (event: Object) => {
    event.preventDefault()
    const { onSubmit } = this.props
    const { privateKey, passphrase, confirmPassphrase } = this.state

    const validInput = this.validate(privateKey, passphrase, confirmPassphrase)
    if (validInput) {
      this.setState({ isDisabled: true })
      onSubmit(privateKey, passphrase, confirmPassphrase)
      this.setState({ isDisabled: false })
    }
  }
}
