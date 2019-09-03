// @flow
import React from 'react'
import { wallet } from '@cityofzion/neon-js'
import { withRouter } from 'react-router-dom'
import { cloneDeep } from 'lodash-es'
import PasswordInput from '../Inputs/PasswordInput'
import StyledReactSelect from '../Inputs/StyledReactSelect/StyledReactSelect'
import TextInput from '../Inputs/TextInput'
import Button from '../Button'
import CheckIcon from '../../assets/icons/check.svg'
import styles from './CreateImportSplitWalletForm.scss'

type Props = {
  generateNewWalletAccount: Function,
  history: Object,
  authenticated: boolean,
  accounts: Object,
}

type State = {
  existingPassphrase: string,
  passphrase: string,
  passphrase2: string,
  passphraseValid: boolean,
  passphrase2Valid: boolean,
  passphraseError: string,
  passphrase2Error: string,
  keypart2: string,
  walletName: string,
  submitButtonDisabled: boolean,
  selectedAccount: Object | null,
  mappedAccounts: Array<Object>,
}

const PASS_MIN_LENGTH = 4

class CreateImportSplitWalletForm extends React.Component<Props, State> {
  static defaultProps = {
    accounts: [],
  }

  state = {
    existingPassphrase: '',
    passphrase: '',
    passphrase2: '',
    passphraseValid: false,
    passphrase2Valid: false,
    passphraseError: '',
    passphrase2Error: '',
    keypart2: '',
    walletName: '',
    submitButtonDisabled: false,
    selectedAccount: null,
    mappedAccounts:
      this.props.accounts.length &&
      this.props.accounts.map(account => {
        const clonedAccount = cloneDeep(account)
        clonedAccount.value = account.label
        return clonedAccount
      }),
  }

  createWalletAccount = async (e: SyntheticMouseEvent<*>) => {
    this.setState({ submitButtonDisabled: true })
    e.preventDefault()
    const {
      passphrase,
      passphrase2,
      keypart2,
      walletName,
      existingPassphrase,
      selectedAccount,
    } = this.state
    const {
      generateNewWalletAccount,
      authenticated,
      history,
      accounts,
    } = this.props

    if (selectedAccount) {
      const accountInStorage = accounts.find(
        account => account.label === selectedAccount.value,
      )

      const key = await wallet.decryptAsync(
        accountInStorage.key,
        existingPassphrase,
      )
      generateNewWalletAccount(
        passphrase,
        passphrase2,
        key,
        keypart2,
        'SPLIT',
        history,
        walletName,
        authenticated,
        () => this.setState({ submitButtonDisabled: false }),
      )
    }
  }

  render = () => {
    const {
      passphraseError,
      passphrase2Error,
      keypart2,
      walletName,
      existingPassphrase,
      selectedAccount,
      mappedAccounts,
    } = this.state

    return (
      <div id="createWallet" className={styles.flexContainer}>
        <form
          className={styles.importWalletForm}
          onSubmit={this.createWalletAccount}
        >
          <div className={styles.selectMargin}>
            <StyledReactSelect
              value={selectedAccount}
              placeholder="Existing Private Key"
              onChange={this.handleChange}
              options={mappedAccounts || []}
            />
          </div>
          <PasswordInput
            placeholder="Existing Password"
            value={existingPassphrase}
            onChange={e =>
              this.setState({ existingPassphrase: e.target.value })
            }
          />

          <PasswordInput
            value={keypart2}
            onChange={e => this.setState({ keypart2: e.target.value })}
            placeholder="Second Private Key"
          />

          <TextInput
            value={walletName}
            onChange={e => this.setState({ walletName: e.target.value })}
            placeholder="Wallet Name"
          />
          <PasswordInput
            onChange={this.handleChangePassphrase}
            placeholder="Password"
            error={passphraseError}
          />
          <PasswordInput
            onChange={this.handleChangePassphrase2}
            placeholder="Confirm Password"
            error={passphrase2Error}
          />
          <div className={styles.loginButtonMargin}>
            <Button
              renderIcon={CheckIcon}
              type="submit"
              shouldCenterButtonLabelText
              primary
              disabled={this.isDisabled()}
            >
              Import Wallet
            </Button>
          </div>
        </form>
      </div>
    )
  }

  handleChangePassphrase = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ passphrase: e.target.value }, this.validatePassphrase)
  }

  handleChangePassphrase2 = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ passphrase2: e.target.value }, this.validatePassphrase2)
  }

  validatePassphrase = () => {
    const { passphrase: p } = this.state
    // validate min char count
    const errorMessage =
      p && p.length < PASS_MIN_LENGTH
        ? `Passphrase must contain at least ${PASS_MIN_LENGTH} characters`
        : ''
    this.setState(
      {
        passphraseError: errorMessage,
        passphraseValid: !!(p && !errorMessage),
      },
      this.validatePassphrase2,
    )
  }

  validatePassphrase2 = () => {
    const { passphrase: p1, passphrase2: p2, passphraseValid } = this.state
    // validate phrases match
    const errorMessage =
      p1 && p2 && p1 !== p2 && passphraseValid ? 'Passphrases must match' : ''
    this.setState({
      passphrase2Error: errorMessage,
      passphrase2Valid: !!(p2 && !errorMessage),
    })
  }

  isDisabled = () => {
    const {
      passphraseValid,
      passphrase2Valid,
      selectedAccount,
      keypart2,
      walletName,
      submitButtonDisabled,
    } = this.state
    const validPassphrase = passphraseValid && passphrase2Valid
    if (submitButtonDisabled) return true
    return !(validPassphrase && !!walletName && !!selectedAccount && !!keypart2)
  }

  handleChange = (selectedAccount: Object) => {
    this.setState({ selectedAccount })
  }
}

export default withRouter(CreateImportSplitWalletForm)
