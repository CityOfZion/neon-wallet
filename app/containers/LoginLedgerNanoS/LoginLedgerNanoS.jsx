// @flow
import React from 'react'
import { progressValues } from 'spunky'
import classNames from 'classnames'

import Button from '../../components/Button'
import LoginIcon from '../../assets/icons/login.svg'
import ConfirmIcon from '../../assets/icons/confirm.svg'
import RefreshIcon from '../../assets/icons/refresh.svg'
import styles from '../Home/Home.scss'

import { MESSAGES } from '../../ledger/neonLedger'

const LEDGER_CONNECTION_STAGES = {
  NOT_CONNECTED: 1,
  OPEN_APP: 2,
  CONNECTED: 3
}

const { LOADED, FAILED } = progressValues

const { NOT_CONNECTED, OPEN_APP, CONNECTED } = LEDGER_CONNECTION_STAGES

type LedgerConnectionStage = $Values<typeof LEDGER_CONNECTION_STAGES>

type Props = {
  progress: string,
  login: Function,
  connect: Function,
  publicKey: ?string,
  error: ?string
}

type State = {
  ledgerStage: LedgerConnectionStage,
  isLoading: boolean
}

const POLL_FREQUENCY_MS = 1000

export default class LoginLedgerNanoS extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = this.computeStateFromProps(props)
  }

  intervalId: ?number

  componentDidMount() {
    // $FlowFixMe
    this.intervalId = setInterval(this.props.connect, POLL_FREQUENCY_MS)
  }

  componentWillReceiveProps(nextProps: Props) {
    const { progress, error } = this.props

    if (progress !== nextProps.progress || error !== nextProps.error) {
      this.setState(this.computeStateFromProps(nextProps))
    }
  }

  computeStateFromProps = (props: Props) => {
    if (props.progress === LOADED) {
      return { ledgerStage: CONNECTED, isLoading: false }
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
      // $FlowFixMe
      clearInterval(this.intervalId)
    }
  }

  render() {
    return (
      <div id="loginLedgerNanoS" className={styles.flexContainer}>
        <form>
          {this.renderStatus()}
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
      <div>
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
    this.props.login(this.props.publicKey)
  }

  canLogin = () => this.props.progress === LOADED
}
