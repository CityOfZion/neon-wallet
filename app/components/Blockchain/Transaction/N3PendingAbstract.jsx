// @flow
import React, { Fragment } from 'react'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'

import styles from './Transaction.scss'
import SendIcon from '../../../assets/icons/send-tx.svg'
import { pluralize } from '../../../util/pluralize'

type Props = {
  findContact: (address: string) => React$Node | null,
  asset: {
    symbol: string,
    image?: string,
  },
  blocktime: number,
  amount: string | number,
  to: string,
  confirmations: number,

  renderTxDate: (time: number) => React$Node | null,
}

class N3PendingAbstract extends React.Component<Props> {
  render = () => {
    const {
      asset,
      amount,
      to,
      blocktime,
      findContact,
      confirmations,
      renderTxDate,
    } = this.props
    const contactTo = findContact(to)
    const logo = asset.image && (
      <img src={asset.image} alt={`${asset.symbol} logo`} />
    )

    return (
      <Fragment>
        <div className={classNames(styles.transactionContainerN3)}>
          <div className={styles.abstractContainerN3}>
            <div className={styles.txTypeIconContainerN3}>
              <div className={styles.sendIconContainer}>
                <SendIcon />
              </div>
            </div>
            {!blocktime ? (
              <div className={styles.pendingTxDate}>
                awaiting confirmations...
              </div>
            ) : (
              renderTxDate(blocktime)
            )}
            <div className={styles.txLabelContainerN3}>Transfer</div>
          </div>

          <div className={styles.txToContainerN3}>
            <div className={styles.txTransferContainerN3}>
              <div className={styles.txTokenContainerN3}>
                {logo}
                {asset.symbol}
              </div>
              <div className={styles.txAmountContainerN3}>{amount}</div>
            </div>
            <div className={styles.txSubjectContainerN3}>
              <p>{contactTo}</p>
            </div>
          </div>
          <div
            className={styles.confirmationsContainer}
            style={{ marginLeft: 100 }}
          >
            <b>{confirmations || 0}</b>{' '}
            {pluralize('Confirmation', confirmations || 0)}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(N3PendingAbstract)
