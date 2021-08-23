// @flow
import classNames from 'classnames'
import React from 'react'
import { intlShape } from 'react-intl'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'

import n3Logo from '../../../assets/images/n3_logo.png'
import Address from '../../Blockchain/Address/Address'
import Button from '../../Button'
import PasswordInput from '../../Inputs/PasswordInput'
import TextInput from '../../Inputs/TextInput'
// import CreateImportWalletForm from '../../CreateImportWalletForm'
import styles from './CreateMigrationWallet.scss'
import { EXPLORERS } from '../../../core/constants'

const PASS_MIN_LENGTH = 4

type Props = {
  generateNewWalletAccount: Function,
  history: Object,
  walletCreationDetected: boolean,
  authenticated: boolean,
  intl: intlShape,
  address: string,

  wif: string,
  handleWalletCreatedComplete: (name?: string, showModal?: boolean) => void,
  networkId: string,
  createdWalletName: string,
}

type State = {
  passphrase: string,
  passphrase2: string,
  passphraseValid: boolean,
  passphrase2Valid: boolean,
  passphraseError: string,
  passphrase2Error: string,
  key: string,
  walletName: string,
  submitButtonDisabled: boolean,
  createNewWallet: boolean,
}

export default class CreateMigrationWallet extends React.Component<
  Props,
  State,
> {
  state = {
    passphrase: '',
    passphrase2: '',
    passphraseValid: false,
    passphrase2Valid: false,
    passphraseError: '',
    passphrase2Error: '',
    key: '',
    walletName: '',
    submitButtonDisabled: false,
    createNewWallet: false,
  }

  handleChangePassphrase = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ passphrase: e.target.value }, this.validatePassphrase)
  }

  handleChangePassphrase2 = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ passphrase2: e.target.value }, this.validatePassphrase2)
  }

  validatePassphrase = () => {
    const { passphrase: p } = this.state
    const { intl } = this.props
    // validate min char count
    const errorMessage =
      p && p.length < PASS_MIN_LENGTH
        ? intl.formatMessage(
            {
              id: 'errors.password.length',
            },
            { PASS_MIN_LENGTH },
          )
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
    const { intl } = this.props
    // validate phrases match
    const errorMessage =
      p1 && p2 && p1 !== p2 && passphraseValid
        ? intl.formatMessage({ id: 'errors.password.match' })
        : ''
    this.setState({
      passphrase2Error: errorMessage,
      passphrase2Valid: !!(p2 && !errorMessage),
    })
  }

  getTranslations = () => {
    const { intl } = this.props
    const walletCreationWalletNamePlaceholder = intl.formatMessage({
      id: 'walletCreationWalletNamePlaceholder',
    })
    const walletCreationWalletNameLabel = intl.formatMessage({
      id: 'walletCreationWalletNameLabel',
    })

    const walletCreationWalletPasswordLabel = intl.formatMessage({
      id: 'walletCreationWalletPasswordLabel',
    })

    const walletCreationWalletPasswordPlaceholder = intl.formatMessage({
      id: 'walletCreationWalletPasswordPlaceholder',
    })

    const walletCreationWalletPasswordConfirmLabel = intl.formatMessage({
      id: 'walletCreationWalletPasswordConfirmLabel',
    })

    const walletCreationWalletPasswordConfirmPlaceholder = intl.formatMessage({
      id: 'walletCreationWalletPasswordConfirmPlaceholder',
    })

    return {
      walletCreationWalletNamePlaceholder,
      walletCreationWalletNameLabel,
      walletCreationWalletPasswordLabel,
      walletCreationWalletPasswordPlaceholder,
      walletCreationWalletPasswordConfirmLabel,
      walletCreationWalletPasswordConfirmPlaceholder,
    }
  }

  isDisabled = () => {
    const {
      passphraseValid,
      passphrase2Valid,
      key,
      walletName,
      submitButtonDisabled,
    } = this.state
    const validPassphrase = passphraseValid && passphrase2Valid
    if (submitButtonDisabled) return true

    const isDisabled = !(validPassphrase && !!walletName && !!key)

    return isDisabled
  }

  createWalletAccount = (e: SyntheticMouseEvent<*>) => {
    this.setState({ submitButtonDisabled: true })
    e.preventDefault()
    const { history, address } = this.props
    const { passphrase, passphrase2, key, walletName } = this.state
    const {
      generateNewWalletAccount,
      authenticated,
      handleWalletCreatedComplete,
    } = this.props

    generateNewWalletAccount(
      passphrase,
      passphrase2,
      key,
      null,
      'WIF',
      history,
      walletName,
      authenticated,
      () => this.setState({ submitButtonDisabled: false }),
      'neo3',
      {
        legacyAddress: address,
        walletCreatedCallback: () =>
          handleWalletCreatedComplete(walletName, true),
      },
    )
  }

  componentDidMount() {
    this.setState({
      key: this.props.wif,
    })
  }

  render() {
    const {
      walletCreationWalletNamePlaceholder,
      walletCreationWalletNameLabel,
      walletCreationWalletPasswordLabel,
      walletCreationWalletPasswordPlaceholder,
      walletCreationWalletPasswordConfirmLabel,
      walletCreationWalletPasswordConfirmPlaceholder,
    } = this.getTranslations()

    const { passphraseError, passphrase2Error, key, walletName } = this.state

    this.isDisabled()

    const TO_ACCOUNT = new n3Wallet.Account(this.props.wif)

    return (
      <div className={styles.container}>
        <div className={styles.explanation}>
          <img src={n3Logo} />
          <div>
            <h3> Create your N3 wallet</h3>
            <p>
              Let's get started by creating your new N3 wallet. Your private key
              will remain the same, but the derived address will be new! All you
              have to do is give your N3 wallet a name and password. We'll take
              care of the rest!
            </p>
          </div>
        </div>
        {this.props.walletCreationDetected && !this.state.createNewWallet ? (
          <React.Fragment>
            <div className={styles.walletFound}>
              {' '}
              It looks like you have already created a wallet for your
              corresponding address on N3...
              <br />
              <br />
              <div>
                Your N3 address is:{' '}
                <Address
                  address={TO_ACCOUNT.address}
                  asWrapper
                  chain="neo3"
                  explorer={EXPLORERS.DORA}
                  networkId={this.props.networkId}
                >
                  {/* $FlowFixMe */}
                  <div className={styles.addressLink}>{TO_ACCOUNT.address}</div>
                </Address>
              </div>
              <br />
              <div>
                Your N3 wallet name is: <br />
                {this.props.createdWalletName}
              </div>
            </div>

            {/* <div className={styles.formContainer}>
              <form className={styles.importWalletForm}>
                <div className={styles.inputContainer} /> */}
            <div
              className={classNames([styles.buttonContainer, styles.noMargin])}
            >
              <Button
                type="submit"
                shouldCenterButtonLabelText
                primary
                onClick={() => this.setState({ createNewWallet: true })}
                // disabled={this.isDisabled()}
              >
                Create New Wallet
              </Button>
              <Button
                type="submit"
                shouldCenterButtonLabelText
                primary
                onClick={() =>
                  this.props.handleWalletCreatedComplete(
                    this.props.createdWalletName,
                  )
                }
                // disabled={this.isDisabled()}
              >
                Continue
              </Button>
            </div>
            {/* </div>
              </form>
            </div> */}
          </React.Fragment>
        ) : (
          <div className={styles.formContainer}>
            <form
              className={styles.importWalletForm}
              onSubmit={this.createWalletAccount}
            >
              <div className={styles.inputContainer}>
                <TextInput
                  value={walletName}
                  label={walletCreationWalletNameLabel}
                  onChange={e => this.setState({ walletName: e.target.value })}
                  placeholder={walletCreationWalletNamePlaceholder}
                  autoFocus
                />
                <PasswordInput
                  label={walletCreationWalletPasswordLabel}
                  onChange={this.handleChangePassphrase}
                  placeholder={walletCreationWalletPasswordPlaceholder}
                  error={passphraseError}
                />
                <PasswordInput
                  label={walletCreationWalletPasswordConfirmLabel}
                  onChange={this.handleChangePassphrase2}
                  placeholder={walletCreationWalletPasswordConfirmPlaceholder}
                  error={passphrase2Error}
                />
              </div>
              <div className={styles.buttonContainer}>
                <Button
                  type="submit"
                  shouldCenterButtonLabelText
                  primary
                  disabled={this.isDisabled()}
                >
                  Continue
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    )
  }
}
