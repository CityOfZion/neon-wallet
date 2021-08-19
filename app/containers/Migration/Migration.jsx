// @flow
import React from 'react'
import axios from 'axios'
import classNames from 'classnames'
import Confetti from 'react-dom-confetti'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'

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
import { MODAL_TYPES } from '../../core/constants'
// import Details from '../../components/Modals/MigrationDetails'

const CREATE_WALLET_STEP = 'CREATE_WALLET_STEP'
const SELECT_TOKEN_STEP = 'SELECT_TOKEN_STEP'
const MIGRATION_HISTORY_STEP = 'MIGRATION_HISTORY_STEP'

const DATA_STUB = [
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash: '',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 1,
    time: 1629293183,
    srcTransactionStatus: 1,
    amount: '10',
  },

  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash:
      'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash:
      '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: '74f2dc36a68fdc4682034178eb2220729231db76',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },

  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
  {
    srcTransactionHash:
      '54c3e4bc90b7005147bc44cdbc49486922393f8aebc94a7cfa00c7416a2d79ca',
    assetHash: 'f46719e2d16bf50cddcef9d4bbfece901f73cbb6',
    destTransactionHash:
      '225793d0a86bd46f303ffa48d936e24fb3db062a6ed72df8c9f8a54cd524894d',
    srcAddress: 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7',
    destAddress: 'NNtgxn9X4oRG1y7UfxDyjef8aFy6eRpApa',
    destTransactionStatus: 0,
    time: 1629293183,
    srcTransactionStatus: 0,
    amount: '10',
  },
]

type Props = {
  address: string,
  showModal: (modalType: string, modalProps: Object) => any,
  wif: string,
  hideModal: () => any,
  logout: () => any,
  newWalletCreated: (name: string) => any,
}

type State = {
  step: string,
  loading: boolean,
  migrationData: {
    transactions: [],
    pageCount: 0,
  },
  paginationData: {
    page: string,
    size: string,
  },
  hasCreatedN3Wallet: boolean,
  isExploding: boolean,
  createdWalletName: string,
  isHistoryDemo: boolean,
}

export default class Migration extends React.Component<Props, State> {
  state = {
    step: '',
    loading: false,
    isHistoryDemo: false,
    migrationData: {
      transactions: [],
      pageCount: 0,
    },
    paginationData: {
      page: '1',
      size: '10',
    },
    hasCreatedN3Wallet: false,
    isExploding: false,
    createdWalletName: '',
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const { address } = this.props
    const HAS_CREATED_WALLET = await localStorage.getItem(
      `hasMigrated-${address}`,
    )

    const migrationData = await this.fetchHistoryData()
    console.log({ migrationData })
    const HAS_MIGRATED = !!migrationData.data.items.length

    if (HAS_MIGRATED) {
      return this.setState({
        step: MIGRATION_HISTORY_STEP,
        loading: false,
        migrationData: {
          transactions: migrationData.data.items,
          pageCount: migrationData.data.pageCount,
        },
        hasCreatedN3Wallet: !!HAS_CREATED_WALLET,
        createdWalletName: HAS_CREATED_WALLET || '',
      })
    }
    if (HAS_CREATED_WALLET) {
      return this.setState({
        step: SELECT_TOKEN_STEP,
        loading: false,
        hasCreatedN3Wallet: !!HAS_CREATED_WALLET,
        createdWalletName: HAS_CREATED_WALLET,
      })
    }

    return this.setState({ step: CREATE_WALLET_STEP, loading: false })
  }

  showTxHistoryModal = (tx: Object) => {
    this.props.showModal(MODAL_TYPES.MIGRATION_DETAILS, { tx })
  }

  handleRefreshHistory = async () => {
    this.setState({ loading: true })
    const paginationData = {
      page: '1',
      size: '10',
    }
    this.setState({ paginationData }, async () => {
      const migrationData = await this.fetchHistoryData()
      const HAS_MIGRATED = migrationData.data.items.length
      const { isHistoryDemo } = this.state
      this.setState({
        loading: false,
      })
      if (HAS_MIGRATED) {
        return this.setState({
          step: MIGRATION_HISTORY_STEP,
          migrationData: {
            // $FlowFixMe
            transactions: isHistoryDemo ? DATA_STUB : migrationData.data.items,
            pageCount: migrationData.data.pageCount,
          },
        })
      }
    })
  }

  fetchHistoryData = async () => {
    this.setState({ loading: true })
    const { address } = this.props
    const { paginationData, isHistoryDemo } = this.state
    const { page, size } = paginationData

    // $FlowFixMe
    const migrationResults = await axios.get(
      `https://migration.ngd.network/transactions?addresses=${
        isHistoryDemo ? 'AG4tZgCjdmjfT8pjXpvXtTM2KpBe6zRkc7' : address
      }&assetHashes=c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b,f46719e2d16bf50cddcef9d4bbfece901f73cbb6,602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7,74f2dc36a68fdc4682034178eb2220729231db76&page=${page}&pageSize=${size}`,
    )
    this.setState({ loading: false })
    return migrationResults
  }

  handlePagination = async (isDemo: boolean) => {
    if (isDemo && !this.state.isHistoryDemo) {
      return this.setState({ isHistoryDemo: true }, async () => {
        const results = await this.fetchHistoryData()
        this.setState({
          migrationData: {
            // $FlowFixMe
            transactions: DATA_STUB,
            pageCount: results.data.pageCount,
          },
        })
      })
    }
    const { page, size } = this.state.paginationData
    const { pageCount, transactions } = this.state.migrationData

    if (Number(page) === Number(pageCount)) {
      // eslint-disable-next-line
      return console.log('All pages have been returned.')
    }

    const nextPaginationData = {
      page: String(Number(page) + 1),
      size,
    }
    this.setState({ paginationData: nextPaginationData }, async () => {
      const migrationData = await this.fetchHistoryData()
      this.setState({
        migrationData: {
          transactions: [...transactions, ...migrationData.data.items],
          pageCount: migrationData.data.pageCount,
        },
      })
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

    const TO_ACCOUNT = new n3Wallet.Account(this.props.wif)

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
      <React.Fragment>
        {/* {true && <Details />} */}

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
                    createdWalletName={this.state.createdWalletName}
                    handleWalletCreatedComplete={(name, showModal) => {
                      this.setState({
                        step: SELECT_TOKEN_STEP,
                        hasCreatedN3Wallet: true,
                        createdWalletName: name,
                      })
                      if (showModal) {
                        this.props.showModal(MODAL_TYPES.CONFIRM, {
                          title: 'Confirm Migration',
                          shouldRenderHeader: false,
                          shouldRenderFooter: false,
                          height: '450px',
                          width: '600px',
                          renderBody: () => (
                            <div className={styles.confirmWalletCreation}>
                              <h2> Congratulations! </h2>
                              <h4>You have created your new Neo N3 wallet.</h4>
                              <div>
                                Your address is: <br />
                                <code> {TO_ACCOUNT.address} </code>
                              </div>
                              <br />
                              <div>Your wallet name is: {name}</div>
                              <br />
                              <div className={styles.modalFooter}>
                                <div>
                                  <Button
                                    elevated
                                    id="cancel"
                                    onClick={() => {
                                      setTimeout(() => {
                                        this.props.newWalletCreated(name)
                                      }, 500)
                                      this.props.logout()
                                      this.props.hideModal()
                                    }}
                                  >
                                    Log into your new wallet
                                  </Button>
                                  <small>
                                    This will log you out of your Neo Legacy
                                    wallet and take you back to the Neon login
                                    screen. You can log back into your Neo
                                    Legacy account and continue with migration
                                    at anytime.{' '}
                                  </small>
                                </div>
                                <Button
                                  id="confirm"
                                  primary
                                  className={styles.actionButton}
                                  onClick={() => {
                                    this.props.hideModal()
                                  }}
                                >
                                  Continue to migration
                                </Button>
                              </div>
                            </div>
                          ),
                        })
                      }
                    }}
                  />
                )}

                {step === SELECT_TOKEN_STEP && (
                  <div className={styles.tokenSwapContainer}>
                    <TokenSwap
                      handleSwapComplete={this.handleMigrationSuccess}
                    />
                  </div>
                )}

                {step === MIGRATION_HISTORY_STEP && (
                  <History
                    data={migrationData}
                    showTxHistoryModal={this.showTxHistoryModal}
                    fetchAdditonalData={this.handlePagination}
                  />
                )}
              </React.Fragment>
            )}
          </Panel>
        </section>
      </React.Fragment>
    )
  }
}
