// @flow
import React from 'react'
import { wallet } from '@cityofzion/neon-js'
import { progressValues } from 'spunky'
import classNames from 'classnames'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import Button from '../../components/Button'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'
import Label from '../../components/Inputs/Label'
import LoginIcon from '../../assets/icons/login.svg'
import ConfirmIcon from '../../assets/icons/confirm.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import styles from '../Home/Home.scss'
import { getPublicKeys, MESSAGES } from '../../ledger/neonLedger'

const LEDGER_CONNECTION_STAGES = {
  NOT_CONNECTED: 1,
  OPEN_APP: 2,
  CONNECTED: 3,
}

const { LOADED, FAILED } = progressValues

const { NOT_CONNECTED, OPEN_APP, CONNECTED } = LEDGER_CONNECTION_STAGES

type LedgerConnectionStage = $Values<typeof LEDGER_CONNECTION_STAGES>

type LedgerPublicKey = { account: number, key: string }

type Props = {
  progress: string,
  publicKey: LedgerPublicKey,
  login: Function,
  connect: Function,
  error: ?string,
}

type State = {
  ledgerStage: LedgerConnectionStage,
  isLoading: boolean,
  addressOption: SelectOption | null,
  publicKeys: Array<LedgerPublicKey>,
  loadingPublicKeys: boolean,
  error: string | null,
}

const POLL_FREQUENCY_MS = 1000

const FETCH_ADDITIONAL_KEYS_ERROR = 'Error fetching additional public keys.'

export default class LoginLedgerNanoS extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...this.computeStateFromProps(props),
      addressOption: null,
      publicKeys: [],
      loadingPublicKeys: true,
      error: null,
    }
  }

  intervalId: IntervalID

  static defaultProps = {
    publicKeys: [],
  }

  componentDidMount() {
    this.intervalId = setInterval(this.props.connect, POLL_FREQUENCY_MS)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { progress, error } = this.props

    if (nextProps.publicKey && !this.state.addressOption) {
      this.setState({
        publicKeys: [nextProps.publicKey],
        loadingPublicKeys: false,
        addressOption: {
          value: nextProps.publicKey.key,
          label: this.unencodedHexToAddress(nextProps.publicKey.key),
        },
      })
    }

    if (progress !== nextProps.progress || error !== nextProps.error) {
      this.setState(this.computeStateFromProps(nextProps))
    }
  }

  computeStateFromProps = (props: Props) => {
    if (props.progress === LOADED) {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      return {
        ledgerStage: CONNECTED,
        isLoading: false,
      }
    }
    if (props.progress === FAILED && props.error) {
      return {
        isLoading: true,
        ledgerStage:
          props.error === MESSAGES.APP_CLOSED ? OPEN_APP : NOT_CONNECTED,
      }
    }
    return {
      isLoading: true,
      ledgerStage: NOT_CONNECTED,
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  render() {
    const options = this.createOptionsFromKeys()
    const { loadingPublicKeys, publicKeys } = this.state

    return (
      <div id="loginLedgerNanoS" className={styles.flexContainer}>
        <form>
          {this.renderStatus()}
          <FormattedMessage id="publicAddress">
            {translation => (
              <Label label={translation}>
                {this.renderAdditionalLabelContent()}
              </Label>
            )}
          </FormattedMessage>
          <StyledReactSelect
            value={this.state.addressOption}
            isDisabled={publicKeys.length === 1}
            onChange={addressOption => this.setState({ addressOption })}
            options={options}
            onMenuScrollToBottom={this.fetchAdditionalKeys}
            isSearchable
            isLoading={loadingPublicKeys}
          />
          <Button
            id="loginButton"
            primary
            type="submit"
            className={styles.loginButtonMargin}
            renderIcon={LoginIcon}
            disabled={!this.canLogin()}
            onClick={this.handleLogin}
            shouldCenterButtonLabelText
          >
            <FormattedMessage id="authLogin" />
          </Button>
        </form>
      </div>
    )
  }

  fetchAdditionalKeys = async () => {
    const { publicKeys } = this.state

    this.setState({ loadingPublicKeys: true, error: null })

    const lastAccountLoaded = publicKeys[publicKeys.length - 1].account

    const nextBatchOfKeys = await getPublicKeys(lastAccountLoaded + 1).catch(
      () => {
        console.error(
          'An error occurred getting additional public keys from ledger',
        )
        this.setState({
          error: FETCH_ADDITIONAL_KEYS_ERROR,
          loadingPublicKeys: false,
        })
      },
    )

    if (nextBatchOfKeys) {
      this.setState(state => ({
        publicKeys: [...state.publicKeys, ...nextBatchOfKeys],
        loadingPublicKeys: false,
      }))
    }
  }

  renderAdditionalLabelContent = () => {
    const { loadingPublicKeys, error } = this.state
    if (!loadingPublicKeys && !error) {
      return (
        <a
          onClick={this.fetchAdditionalKeys}
          className={styles.fetchAdditionalLedgerKeysLink}
        >
          <FormattedMessage id="auth.ledger.fetchAddress" />
        </a>
      )
    }
    if (!loadingPublicKeys && error) {
      return (
        <div className={styles.errorLoadingPublicKeysContainer}>
          <p> {error} </p>{' '}
          <a
            onClick={this.fetchAdditionalKeys}
            className={styles.fetchAdditionalLedgerKeysLink}
          >
            <FormattedMessage id="auth.ledger.retry" />
          </a>
        </div>
      )
    }
    return null
  }

  unencodedHexToAddress = (hexString: string) => {
    const encodedKey = wallet.getPublicKeyEncoded(hexString)

    return new wallet.Account(encodedKey).address
  }

  createOptionsFromKeys = () => {
    const options = this.state.publicKeys.map((publicKey: LedgerPublicKey) => ({
      label: this.unencodedHexToAddress(publicKey.key),
      value: publicKey.key,
    }))
    return options
  }

  getStatusIcon = (ledgerStage: LedgerConnectionStage) => {
    if (this.state.isLoading && this.state.ledgerStage === ledgerStage) {
      return <RefreshIcon className={styles.ledgerStageRefreshIcon} />
    }
    if (this.state.ledgerStage > ledgerStage) {
      return <ConfirmIcon className={styles.ledgerStageIcon} />
    }
    return <i />
  }

  renderStatus = () => {
    const { ledgerStage } = this.state

    return (
      <div className={styles.ledgerStagesContainer}>
        <div
          className={classNames(styles.ledgerStage, {
            [styles.ledgerStageActive]: ledgerStage === NOT_CONNECTED,
            [styles.ledgerStageCompleted]: ledgerStage > NOT_CONNECTED,
          })}
        >
          <div className={styles.ledgerStatusIconContainer}>
            {this.getStatusIcon(NOT_CONNECTED)}
          </div>
          <div className={styles.ledgerStageText}>
            <FormattedHTMLMessage id="auth.ledger.connectLedger" />
          </div>
        </div>
        <div
          className={classNames(styles.ledgerStage, {
            [styles.ledgerStageActive]: ledgerStage === OPEN_APP,
            [styles.ledgerStageCompleted]: ledgerStage > OPEN_APP,
          })}
        >
          <div className={styles.ledgerStatusIconContainer}>
            {this.getStatusIcon(OPEN_APP)}
          </div>
          <div className={styles.ledgerStageText}>
            <FormattedHTMLMessage id="auth.ledger.navigateToNeoApp" />
          </div>
        </div>
      </div>
    )
  }

  handleLogin = () => {
    const { addressOption, publicKeys } = this.state
    if (publicKeys.length && addressOption) {
      const keyData = publicKeys.find(
        publicKey => addressOption.value === publicKey.key,
      )
      if (keyData) {
        this.props.login(keyData)
      }
    }
  }

  canLogin = () => this.props.progress === LOADED && this.state.addressOption
}
