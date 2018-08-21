// @flow
import React from 'react'
import { noop } from 'lodash'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import PasswordInput from '../../Inputs/PasswordInput'
import AddIcon from '../../../assets/icons/add.svg'
import styles from './EncryptForm.scss'

type Props = {
  submitLabel: string,
  formPrivateKey: string,
  formPassphrase: string,
  formConfirmPassphrase: string,
  onSubmit: Function,
  address: string
}

type State = {
  // TODO add in errors
  privateKeyError: string,
  passphraseError: string,
  confirmPassphraseError: string
}

export default class EncryptForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      privateKeyError: '',
      passphraseError: '',
      confirmPassphraseError: ''
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
      confirmPassphraseError
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
          >
            {submitLabel}
          </Button>
        </form>
      </section>
    )
  }

  handleChangePrivateKey = (event: Object) => {
    // this.clearErrors(event.target.name)
    // this.props.setName(event.target.value)
  }

  handleChangePassphrase = (event: Object) => {}

  handleChangeConfirmPassphrase = (event: Object) => {}

  handleSubmit = (event: Object) => {}
}
