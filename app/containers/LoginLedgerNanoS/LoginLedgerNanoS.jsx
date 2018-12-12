// @flow
import React from 'react'
import { wallet } from 'neon-js'
import { progressValues } from 'spunky'
import classNames from 'classnames'
import { get } from 'lodash-es'

import Button from '../../components/Button'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'
import Label from '../../components/Inputs/Label'
import LoginIcon from '../../assets/icons/login.svg'
import ConfirmIcon from '../../assets/icons/confirm.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import styles from '../Home/Home.scss'
import { getPublicKeys } from '../../ledger/ledgerNanoS'

import { MESSAGES } from '../../ledger/neonLedger'

const LEDGER_CONNECTION_STAGES = {
  NOT_CONNECTED: 1,
  OPEN_APP: 2,
  CONNECTED: 3
}

const { LOADED, FAILED } = progressValues

const { NOT_CONNECTED, OPEN_APP, CONNECTED } = LEDGER_CONNECTION_STAGES

type LedgerConnectionStage = $Values<typeof LEDGER_CONNECTION_STAGES>

type LedgerPublicKey = { account: number, key: string }

type Props = {
  progress: string,
  login: Function,
  connect: Function,
  error: ?string
}

type SelectOption = {
  label: string,
  value: string
}

type State = {
  ledgerStage: LedgerConnectionStage,
  isLoading: boolean,
  addressOption: SelectOption | null,
  publicKeys: Array<LedgerPublicKey>,
  loadingPublicKeys: boolean
}

const POLL_FREQUENCY_MS = 1000

export default class LoginLedgerNanoS extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...this.computeStateFromProps(props),
      addressOption: null,
      publicKeys: [],
      loadingPublicKeys: true
    }
  }

  intervalId: IntervalID

  static defaultProps = {
    publicKeys: []
  }

  componentDidMount() {
    this.intervalId = setInterval(this.props.connect, POLL_FREQUENCY_MS)
    if (this.props.progress === LOADED) {
      this.fetchInitialKeys()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { progress, error } = this.props

    if (progress !== nextProps.progress || error !== nextProps.error) {
      this.setState(this.computeStateFromProps(nextProps))
    }

    if (this.props !== LOADED && nextProps.progress === LOADED) {
      this.fetchInitialKeys()
    }
  }

  computeStateFromProps = (props: Props) => {
    if (props.progress === LOADED) {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
      return {
        ledgerStage: CONNECTED,
        isLoading: false
      }
    }
    if (props.progress === FAILED && props.error) {
      return {
        isLoading: true,
        ledgerStage:
          props.error === MESSAGES.APP_CLOSED ? OPEN_APP : NOT_CONNECTED
      }
    }
    return {
      isLoading: true,
      ledgerStage: NOT_CONNECTED
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  render() {
    const options = this.createOptionsFromKeys()
    const { loadingPublicKeys } = this.state

    return (
      <div id="loginLedgerNanoS" className={styles.flexContainer}>
        <form>
          {this.renderStatus()}
          <div className={styles.publicAddressLabelContainer}>
            <Label label="public address:" />
            {loadingPublicKeys && (
              <RefreshIcon className={styles.ledgerStageRefreshIcon} />
            )}
          </div>

          <StyledReactSelect
            value={this.state.addressOption}
            onChange={addressOption => this.setState({ addressOption })}
            options={options}
            onMenuScrollToBottom={this.fetchAdditionalKeys}
            isSearchable
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
            Login
          </Button>
        </form>
      </div>
    )
  }

  fetchInitialKeys = async () => {
    const publicKeys = await getPublicKeys()

    const initialPublicKey = publicKeys[0]

    this.setState({
      publicKeys,
      loadingPublicKeys: false,
      addressOption: {
        value: initialPublicKey.key,
        label: this.unencodedHexToAddress(initialPublicKey.key)
      }
    })
  }

  fetchAdditionalKeys = async () => {
    const { publicKeys } = this.state

    this.setState({ loadingPublicKeys: true })

    const lastAccountLoaded = publicKeys[publicKeys.length - 1].account

    const nextBatchOfKeys = await getPublicKeys(lastAccountLoaded)

    this.setState(state => ({
      publicKeys: [...state.publicKeys, ...nextBatchOfKeys],
      loadingPublicKeys: false
    }))
  }

  unencodedHexToAddress = (hexString: string) => {
    const encodedKey = wallet.getPublicKeyEncoded(hexString)

    return new wallet.Account(encodedKey).address
  }

  createOptionsFromKeys = () => {
    const options = this.state.publicKeys.map((publicKey: LedgerPublicKey) => ({
      label: this.unencodedHexToAddress(publicKey.key),
      value: publicKey.key
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
            [styles.ledgerStageCompleted]: ledgerStage > NOT_CONNECTED
          })}
        >
          {this.getStatusIcon(NOT_CONNECTED)}
          <div>
            Connect and unlock your <strong>Ledger device</strong>
          </div>
        </div>
        <div
          className={classNames(styles.ledgerStage, {
            [styles.ledgerStageActive]: ledgerStage === OPEN_APP,
            [styles.ledgerStageCompleted]: ledgerStage > OPEN_APP
          })}
        >
          {this.getStatusIcon(OPEN_APP)}
          <div>
            Navigate to the <strong>NEO app</strong> on your device
          </div>
        </div>
      </div>
    )
  }

  handleLogin = () => {
    if (this.state.publicKeys.length && this.state.addressOption) {
      const keyData = this.state.publicKeys.find(
        publicKey =>
          this.state.addressOption &&
          this.state.addressOption.value === publicKey.key
      )
      if (keyData) {
        this.props.login(keyData)
      }
    }
  }

  canLogin = () => this.props.progress === LOADED && this.state.addressOption
}
