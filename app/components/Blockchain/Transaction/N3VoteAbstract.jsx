// @flow
import React from 'react'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import styles from './Transaction.scss'
import VoteIcon from '../../../assets/icons/vote-tx.svg'

type Props = {
  isPending: boolean,
  summary: string,
  txDate: React$Node,
}

class N3VoteAbstract extends React.Component<Props> {
  render = () => {
    const { isPending, summary, txDate } = this.props
    return (
      <div className={classNames(styles.transactionContainerN3)}>
        <div className={styles.abstractContainerN3}>
          <div className={styles.txTypeIconContainerN3}>
            <div className={styles.sendIconContainer}>
              <VoteIcon />
            </div>
          </div>
          {isPending ? 'Pending' : txDate}
          <div className={styles.txLabelContainerN3}>Vote</div>
        </div>
        <div className={styles.txToContainerN3}>{summary}</div>
      </div>
    )
  }
}

export default injectIntl(N3VoteAbstract)
