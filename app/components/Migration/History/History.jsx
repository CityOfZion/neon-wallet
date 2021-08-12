// @flow
import React from 'react'
import TransactionList from '../../Blockchain/Transaction/TransactionList'
import Transaction from '../../Blockchain/Transaction'

import Nothing from '../../../assets/icons/nothing.svg'
import styles from './History.scss'
import MigrationTransaction from '../../Blockchain/Transaction/MigrationTransaction'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'

type Props = {
  data: {
    addresstxs: [],
    total: number,
  },
  fetchAdditonalData: () => void,
}

type State = {}

export default class History extends React.Component<Props, State> {
  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    // const { handleFetchAdditionalTxData } = this.props
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      this.props.fetchAdditonalData()
    }
  }

  render() {
    const { data } = this.props

    return (
      <div className={styles.container} onScroll={this.handleScroll}>
        <h3> Migration Summary</h3>
        {data.addresstxs.length ? (
          <TransactionList
            rowClassName={styles.rowClass}
            className={styles.migrationTransactionListContainer}
          >
            {data.addresstxs.map((tx, i) => (
              <MigrationTransaction
                tx={tx}
                key={`sentTx${i}`}
                className={styles.sendSuccessBodyListItem}
              />
            ))}
          </TransactionList>
        ) : (
          <div className={styles.emptyHistory}>
            <LogoWithStrikethrough />
          </div>
        )}
      </div>
    )
  }
}
