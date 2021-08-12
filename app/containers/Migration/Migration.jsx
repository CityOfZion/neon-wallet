// @flow
import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import Confetti from 'react-dom-confetti'

import Button from '../../components/Button'
import HeaderBar from '../../components/HeaderBar'
import CreateMigrationWallet from '../../components/Migration/CreateMigrationWallet'
import TokenSwap from '../../components/Migration/TokenSwap'
import History from '../../components/Migration/History'
import Explanation from '../../components/Migration/Explanation'
import Panel from '../../components/Panel'
import Loader from '../../components/Loader'
import RefreshIcon from '../../assets/icons/refresh.svg'

import styles from './Migration.scss'

const CREATE_WALLET_STEP = 'CREATE_WALLET_STEP'
const SELECT_TOKEN_STEP = 'SELECT_TOKEN_STEP'
const MIGRATION_HISTORY_STEP = 'MIGRATION_HISTORY_STEP'

type Props = {
  address: string,
}

type State = {
  step: string,
  loading: boolean,
  migrationData: {
    addresstxs: [],
    total: number,
  },
  paginationData: {
    start: string,
    end: string,
    address: string,
    chain: string,
  },
  hasCreatedN3Wallet: boolean,
  isExploding: boolean,
}

export default class Migration extends React.Component<Props, State> {
  state = {
    step: '',
    loading: false,
    migrationData: {
      addresstxs: [],
      total: 0,
    },
    paginationData: {
      start: '1',
      end: '10',
      chain: '5',
      address: this.props.address,
    },
    hasCreatedN3Wallet: false,
    isExploding: false,
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const { address } = this.props
    const HAS_CREATED_WALLET = await localStorage.getItem(
      `hasMigrated-${address}`,
    )

    const migrationData = await this.fetchHistoryData()
    const HAS_MIGRATED = migrationData.addresstxs.length

    if (HAS_MIGRATED) {
      return this.setState({
        step: MIGRATION_HISTORY_STEP,
        loading: false,
        migrationData,
        hasCreatedN3Wallet: !!HAS_CREATED_WALLET,
      })
    }
    if (HAS_CREATED_WALLET) {
      return this.setState({
        step: SELECT_TOKEN_STEP,
        loading: false,
        hasCreatedN3Wallet: !!HAS_CREATED_WALLET,
      })
    }

    return this.setState({ step: CREATE_WALLET_STEP, loading: false })
  }

  handleRefreshHistory = async () => {
    this.setState({ loading: true })
    const paginationData = {
      start: '1',
      end: '10',
      chain: '5',
      address: this.props.address,
    }

    this.setState({ paginationData }, async () => {
      const migrationData = await this.fetchHistoryData()
      const HAS_MIGRATED = migrationData.addresstxs.length
      this.setState({
        loading: false,
      })
      if (HAS_MIGRATED) {
        return this.setState({
          step: MIGRATION_HISTORY_STEP,

          migrationData,
        })
      }
    })
  }

  fetchHistoryData = async () => {
    const migrationResults = await axios.post(
      'https://explorer.poly.network/testnet/api/v1/getaddresstxlist',
      this.state.paginationData,
    )

    const migrationData = migrationResults.data
      ? JSON.parse(migrationResults.data.result)
      : {
          addresstxs: [],
          total: 0,
        }

    // const HAS_MIGRATED = migrationData.addresstxs.length

    // if (HAS_MIGRATED) {
    //   for (const tx of migrationData.addresstxs) {
    //     const crossChainStatus = await axios.get(
    //       `https://explorer.poly.network/testnet/api/v1/getcrosstx?txhash=${
    //         tx.txhash
    //       }`,
    //     )
    //     tx.migrationData = JSON.parse(crossChainStatus.data.result)
    //   }
    // }

    return migrationData
  }

  handlePagination = async () => {
    const { start, end, address, chain } = this.state.paginationData

    const { migrationData } = this.state

    const nextPaginationData = {
      address,
      chain,
      start: String(Number(start) + 10),
      end: String(Number(end) + 10),
    }
    this.setState({ paginationData: nextPaginationData }, async () => {
      if (
        this.state.migrationData.addresstxs.length <
        this.state.migrationData.total
      ) {
        const data = await this.fetchHistoryData()
        this.setState({
          migrationData: {
            total: migrationData.total,
            addresstxs: [...migrationData.addresstxs, ...data.addresstxs],
          },
        })
      }
    })
  }

  handleMigrationSuccess = () => {
    this.setState({ isExploding: true })

    setTimeout(() => {
      this.setState({ isExploding: false, step: MIGRATION_HISTORY_STEP })
    }, 5000)
  }

  render() {
    const { step, migrationData, loading, hasCreatedN3Wallet } = this.state

    const config = {
      angle: 90,
      spread: 360,
      startVelocity: 40,
      elementCount: 70,
      dragFriction: 0.12,
      duration: 5000,
      stagger: 3,
      width: '10px',
      height: '10px',
      perspective: '1000px',
      colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
    }

    return (
      <section className={styles.section}>
        <HeaderBar shouldRenderRefresh={false} />

        <Panel
          renderHeader={() => (
            <div className={styles.header}>
              <h3>Token Migration</h3>

              <div
                className={styles.refreshButton}
                // onClick={loading ? null : loadWalletData}
              >
                {step === MIGRATION_HISTORY_STEP && (
                  <RefreshIcon
                    onClick={this.handleRefreshHistory}
                    id="refresh"
                    className={classNames(styles.refresh, {
                      [styles.loading]: loading,
                    })}
                  />
                )}
              </div>
            </div>
          )}
          contentClassName={styles.migrationPanelContent}
          className={styles.migrationPanel}
        >
          <Explanation
            currentStep={step}
            handleStepChange={step => !loading && this.setState({ step })}
          />

          <Confetti active={this.state.isExploding} config={config} />

          {this.state.loading ? (
            <div className={styles.loadingContainer}>
              <Loader className={styles.loader} />
            </div>
          ) : (
            <React.Fragment>
              {step === CREATE_WALLET_STEP && (
                <CreateMigrationWallet
                  walletCreationDetected={hasCreatedN3Wallet}
                  handleWalletCreatedComplete={() =>
                    this.setState({ step: SELECT_TOKEN_STEP })
                  }
                />
              )}

              {step === SELECT_TOKEN_STEP && (
                <div className={styles.tokenSwapContainer}>
                  <TokenSwap handleSwapComplete={this.handleMigrationSuccess} />
                </div>
              )}

              {step === MIGRATION_HISTORY_STEP && (
                <History
                  data={migrationData}
                  fetchAdditonalData={this.handlePagination}
                />
              )}
            </React.Fragment>
          )}
        </Panel>
      </section>
    )
  }
}

// @flow
// import React, { Component } from 'react'
// import classNames from 'classnames'
// import { FormattedMessage } from 'react-intl'

// import RefreshIcon from '../../../assets/icons/refresh.svg'

// import styles from './RefreshButton.scss'

// type Props = {
//   loadWalletData?: () => void,
//   loading?: boolean,
// }

// class RefreshButton extends Component<Props> {
//   render() {
//     const { loadWalletData, loading } = this.props

//     return (
//       <div
//         className={styles.refreshButton}
//         onClick={loading ? null : loadWalletData}
//       >
// <RefreshIcon
//   id="refresh"
//   className={classNames(styles.refresh, {
//     [styles.loading]: loading,
//   })}
// />
// <span className={styles.refreshButtonSpan}>
//   <FormattedMessage id="dashboardRefresh" />
// </span>
//       </div>
//     )
//   }
// }

// export default RefreshButton
