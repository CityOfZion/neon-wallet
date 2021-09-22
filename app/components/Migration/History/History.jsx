// @flow
import React from 'react'
import TransactionList from '../../Blockchain/Transaction/TransactionList'
import Transaction from '../../Blockchain/Transaction'

import Nothing from '../../../assets/icons/nothing.svg'
import styles from './History.scss'
import MigrationTransaction from '../../Blockchain/Transaction/MigrationTransaction'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'
// import Details from '../../Modals/MigrationDetails'

const REFRESH_INTERVAL_MS = 30000

type Props = {
  data: {
    transactions: [],
    pageCount: number,
  },
  fetchAdditonalData: (isDemo?: boolean) => void,
  showTxHistoryModal: (tx: Object) => void,
  handleRefreshHistory: () => Promise<*>,
  net: string,
  showSuccessNotification: ({ message: string }) => void,
}

type State = {
  // selectedTransaction: Object | null,
}

export default class History extends React.Component<Props, State> {
  // state = {
  //   selectedTransaction: null,
  // }

  historyDataInterval: IntervalID

  componentDidMount() {
    this.addPolling()
  }

  componentWillUnmount() {
    this.removePolling()
  }

  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      this.props.fetchAdditonalData()
    }
  }

  addPolling = () => {
    const { showSuccessNotification } = this.props
    this.historyDataInterval = setInterval(async () => {
      this.props.handleRefreshHistory().then(() =>
        showSuccessNotification({
          message: 'Received latest migration information.',
        }),
      )
    }, REFRESH_INTERVAL_MS)
  }

  removePolling = () => {
    if (this.historyDataInterval) {
      clearInterval(this.historyDataInterval)
    }
  }

  // handleShowMigrationStatus = tx => {
  //   this.setState({ selectedTransaction: tx })
  // }

  render() {
    const { data, net } = this.props

    return (
      <React.Fragment>
        <div className={styles.container} onScroll={this.handleScroll}>
          <div className={styles.header}>
            <h3> Migration Summary </h3>
            {/* {net === 'TestNet' && (
              <code onClick={() => this.props.fetchAdditonalData(true)}>
                DEMO
              </code>
            )} */}
          </div>
          {data.transactions.length ? (
            <TransactionList
              rowClassName={styles.rowClass}
              className={styles.migrationTransactionListContainer}
              alternateRows
            >
              {data.transactions.map((tx, i) => (
                <div
                  key={`sentTx${i}`}
                  onClick={() => this.props.showTxHistoryModal(tx)}
                  className={styles.txWrapper}
                >
                  <MigrationTransaction
                    tx={tx}
                    className={styles.sendSuccessBodyListItem}
                  />
                </div>
              ))}
            </TransactionList>
          ) : (
            <div className={styles.emptyHistory}>
              <LogoWithStrikethrough />
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}
