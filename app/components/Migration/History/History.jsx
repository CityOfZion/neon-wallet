// @flow
import React from 'react'
import TransactionList from '../../Blockchain/Transaction/TransactionList'
import Transaction from '../../Blockchain/Transaction'

import Nothing from '../../../assets/icons/nothing.svg'
import styles from './History.scss'
import MigrationTransaction from '../../Blockchain/Transaction/MigrationTransaction'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'
// import Details from '../../Modals/MigrationDetails'

type Props = {
  data: {
    transactions: [],
    pageCount: number,
  },
  fetchAdditonalData: (isDemo?: boolean) => void,
  showTxHistoryModal: (tx: Object) => void,
  net: string,
}

type State = {
  // selectedTransaction: Object | null,
}

export default class History extends React.Component<Props, State> {
  // state = {
  //   selectedTransaction: null,
  // }

  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      this.props.fetchAdditonalData()
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
            {net === 'TestNet' && (
              <code onClick={() => this.props.fetchAdditonalData(true)}>
                DEMO
              </code>
            )}
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
