// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { FormattedMessage, intlShape } from 'react-intl'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import PasswordInput from '../../Inputs/PasswordInput'
import AddIcon from '../../../assets/icons/add.svg'
import styles from './EncryptForm.scss'
import { MIN_PASSPHRASE_LEN } from '../../../core/wallet'

type Props = {
  submitLabel: string,
  formPrivateKey: string,
  formPassphrase: string,
  formConfirmPassphrase: string,
  validatePassphraseLength: Function,
  isWIF: Function,
  onSubmit: Function,
  intl: intlShape,
}

type State = {
  privateKeyError: string,
  passphraseError: string,
  confirmPassphraseError: string,
  isDisabled: boolean,
  privateKey: string,
  passphrase: string,
  confirmPassphrase: string,
}

export default class EncryptForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      privateKeyError: '',
      passphraseError: '',
      confirmPassphraseError: '',
      isDisabled: true,
      privateKey: '',
      passphrase: '',
      confirmPassphrase: '',
    }
  }

  static defaultProps = {
    submitLabel: 'Generate Encrypted key',
    onSubmit: noop,
    isWIF: noop,
    validatePassphraseLength: noop,
  }

  render() {
    const {
      submitLabel,
      formPrivateKey,
      formPassphrase,
      formConfirmPassphrase,
      intl,
    } = this.props
    const {
      privateKeyError,
      passphraseError,
      confirmPassphraseError,
      isDisabled,
    } = this.state

    return (
      <section className={styles.formContainer}>
        <form className={styles.encryptForm} onSubmit={this.handleSubmit}>
          <TextInput
            id="privateKey"
            name="privateKey"
            label={<FormattedMessage id="encryptStep1Label" />}
            placeholder={intl.formatMessage({ id: 'encryptStep1Placeholder' })}
            value={formPrivateKey}
            onChange={this.handleChangePrivateKey}
            error={privateKeyError}
          />
          <PasswordInput
            id="passphrase"
            name="passphrase"
            label={<FormattedMessage id="encryptStep2Label" />}
            placeholder={intl.formatMessage({ id: 'encryptStep2Placeholder' })}
            value={formPassphrase}
            onChange={this.handleChangePassphrase}
            error={passphraseError}
          />
          <PasswordInput
            id="confirmPassphrase"
            name="confirmPassphrase"
            label={<FormattedMessage id="encryptStep3Label" />}
            placeholder={intl.formatMessage({ id: 'encryptStep3Placeholder' })}
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
    const { isWIF, intl } = this.props
    if (privateKey && !isWIF(privateKey)) {
      this.setState({
        privateKeyError: intl.formatMessage({ id: 'errors.encrypt.valid' }),
      })
      return false
    }
    return true
  }

  validatePassphrase = (passphrase: string, confirmPassphrase: string) => {
    const { validatePassphraseLength, intl } = this.props
    if (passphrase !== confirmPassphrase) {
      this.setState({
        confirmPassphrase: intl.formatMessage({ id: 'errors.password.match' }),
      })
      return false
    }

    if (!validatePassphraseLength(passphrase)) {
      this.setState({
        passphraseError: intl.formatMessage(
          { id: 'errors.password.length' },
          { MIN_PASSPHRASE_LEN },
        ),
      })
      return false
    }
    return true
  }

  validate = (
    privateKey: string,
    passphrase: string,
    confirmPassphrase: string,
  ) => {
    const validPrivateKey = this.validatePrivateKey(privateKey)
    const validatePassphrase = this.validatePassphrase(
      passphrase,
      confirmPassphrase,
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

  setButtonIsDisabled = (
    privateKey: string,
    passphrase: string,
    confirmPassphrase: string,
  ) => {
    this.setState({
      isDisabled: !privateKey || !passphrase || !confirmPassphrase,
    })
  }

  handleChangePrivateKey = (event: Object) => {
    const newPrivateKey = event.target.value
    const { passphrase, confirmPassphrase } = this.state

    this.setState({ privateKey: newPrivateKey })
    this.clearErrors(event.target.name)
    this.setButtonIsDisabled(newPrivateKey, passphrase, confirmPassphrase)
  }

  handleChangePassphrase = (event: Object) => {
    const newPassphrase = event.target.value
    const { privateKey, confirmPassphrase } = this.state

    this.setState({ passphrase: newPassphrase })
    this.clearErrors(event.target.name)
    this.setButtonIsDisabled(privateKey, newPassphrase, confirmPassphrase)
  }

  handleChangeConfirmPassphrase = (event: Object) => {
    const newConfirmPassphrase = event.target.value
    const { privateKey, passphrase } = this.state

    this.setState({ confirmPassphrase: newConfirmPassphrase })
    this.clearErrors(event.target.name)
    this.setButtonIsDisabled(privateKey, passphrase, newConfirmPassphrase)
  }

  handleSubmit = (event: Object) => {
    event.preventDefault()
    const { onSubmit } = this.props
    const { privateKey, passphrase, confirmPassphrase } = this.state

    const validInput = this.validate(privateKey, passphrase, confirmPassphrase)

    if (!validInput) return

    onSubmit(privateKey, passphrase, confirmPassphrase)
  }
}
