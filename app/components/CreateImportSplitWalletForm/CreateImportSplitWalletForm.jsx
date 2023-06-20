// @flow
import React, { Fragment } from 'react'
import { wallet } from '@cityofzion/neon-js-legacy'
import { withRouter } from 'react-router-dom'
import { cloneDeep } from 'lodash-es'
import { IntlShape, injectIntl, FormattedMessage } from 'react-intl'

import PasswordInput from '../Inputs/PasswordInput'
import StyledReactSelect from '../Inputs/StyledReactSelect/StyledReactSelect'
import TextInput from '../Inputs/TextInput'
import Button from '../Button'
import CheckIcon from '../../assets/icons/check.svg'
import BackArrow from '../../assets/icons/arrow.svg'
import ForwardArrow from '../../assets/icons/forward-arrow.svg'
import styles from './CreateImportSplitWalletForm.scss'

type Props = {
  generateNewWalletAccount: Function,
  history: Object,
  authenticated: boolean,
  accounts: Object,
  showErrorNotification: Object => any,
  intl: IntlShape,
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
  step: number,
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
    step: 1,
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

  toggleStep = (e: SyntheticMouseEvent<*>) => {
    if (this.state.step === 1) {
      const { existingPassphrase, selectedAccount, keypart2 } = this.state
      const { showErrorNotification } = this.props

      if (selectedAccount) {
        const accountInStorage = this.props.accounts.find(
          account => account.label === selectedAccount.value,
        )

        this.setState({ submitButtonDisabled: true })
        e.preventDefault()

        wallet
          .decryptAsync(accountInStorage.key, existingPassphrase)
          .then(() => {
            if (keypart2 && !wallet.isWIF(keypart2)) {
              showErrorNotification({
                message: 'Invalid secondary private key WIF',
              })
            } else {
              this.setState({ step: 2 })
            }
          })
          .catch(err => showErrorNotification({ message: err.message }))
          .finally(() => this.setState({ submitButtonDisabled: false }))
      }
    } else {
      this.setState({ step: 1 })
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
      submitButtonDisabled,
    } = this.state

    const { intl } = this.props

    const instructions = intl.formatMessage({
      id: 'splitKeyWalletInstructions',
    })

    if (this.state.step === 2) {
      return (
        <Fragment>
          <p className={styles.splitWalletInstructions}>{instructions}</p>
          <div id="createWallet" className={styles.flexContainer}>
            <form
              className={styles.importWalletForm}
              onSubmit={this.createWalletAccount}
            >
              <TextInput
                value={walletName}
                onChange={e => this.setState({ walletName: e.target.value })}
                label={intl.formatMessage({
                  id: 'walletCreationWalletNamePlaceholder',
                })}
                placeholder={intl.formatMessage({
                  id: 'splitKeyWalletNamePlaceholder',
                })}
              />
              <PasswordInput
                key="np1"
                onChange={this.handleChangePassphrase}
                label={intl.formatMessage({
                  id: 'inputPasswordPlaceholder',
                })}
                placeholder={intl.formatMessage({
                  id: 'inputPasswordPlaceholder',
                })}
                error={passphraseError}
              />
              <PasswordInput
                key="np2"
                onChange={this.handleChangePassphrase2}
                label={intl.formatMessage({
                  id: 'walletCreationWalletPasswordConfirmPlaceholder',
                })}
                placeholder={intl.formatMessage({
                  id: 'walletCreationWalletPasswordConfirmPlaceholder',
                })}
                error={passphrase2Error}
              />
              <div className={styles.buttonContainer}>
                <Button
                  renderIcon={BackArrow}
                  shouldCenterButtonLabelText
                  onClick={this.toggleStep}
                  disabled={false}
                >
                  Previous Step
                </Button>

                <Button
                  renderIcon={CheckIcon}
                  type="submit"
                  shouldCenterButtonLabelText
                  primary
                  disabled={this.isStep2Disabled()}
                >
                  <FormattedMessage id="authImportWallet" />
                </Button>
              </div>
            </form>
          </div>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <p className={styles.splitWalletInstructions}>{instructions}</p>
        <div id="createWallet" className={styles.flexContainer}>
          <form className={styles.importWalletForm}>
            <label className={styles.selectLabel}>
              <FormattedMessage id="chooseAccount" />
            </label>
            <div className={styles.selectMargin}>
              <StyledReactSelect
                value={selectedAccount}
                placeholder={intl.formatMessage({
                  id: 'chooseAccount',
                })}
                onChange={this.handleChange}
                options={mappedAccounts || []}
              />
            </div>
            <PasswordInput
              key="op"
              value={existingPassphrase}
              label={intl.formatMessage({
                id: 'inputPasswordPlaceholder',
              })}
              placeholder={intl.formatMessage({
                id: 'inputPasswordPlaceholder',
              })}
              onChange={e =>
                this.setState({ existingPassphrase: e.target.value })
              }
            />
            <PasswordInput
              key="pk"
              value={keypart2}
              label={intl.formatMessage({
                id: 'privateKey',
              })}
              onChange={e => this.setState({ keypart2: e.target.value })}
              placeholder={intl.formatMessage({
                id: 'privateKey',
              })}
            />
            <div className={styles.loginButtonMargin}>
              <Button
                renderIcon={ForwardArrow}
                type="submit"
                shouldCenterButtonLabelText
                primary
                onClick={this.toggleStep}
                disabled={submitButtonDisabled || this.isStep1Disabled()}
              >
                <FormattedMessage id="nextStep" />
              </Button>
            </div>
          </form>
        </div>
      </Fragment>
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

  isStep1Disabled = () => {
    const { existingPassphrase, selectedAccount, keypart2 } = this.state
    return !(existingPassphrase && !!selectedAccount && !!keypart2)
  }

  isStep2Disabled = () => {
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

// $FlowFixMe
export default withRouter(injectIntl(CreateImportSplitWalletForm))
