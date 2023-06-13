// @flow
import React from 'react'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import styles from './Transaction.scss'
import ClaimIcon from '../../../assets/icons/claim.svg'

type Props = {
  amount: number,
  image: string,
  isPending: boolean,
  symbol: string,
  txDate: React$Node,
}

class N3ClaimAbstract extends React.Component<Props> {
  render = () => {
    const { amount, image, isPending, symbol, txDate } = this.props
    return (
      <div className={classNames(styles.transactionContainerN3)}>
        <div className={styles.abstractContainerN3}>
          <div className={styles.txTypeIconContainerN3}>
            <div className={styles.sendIconContainer}>
              <ClaimIcon />
            </div>
          </div>
          {isPending ? 'Pending' : txDate}
          <div className={styles.txLabelContainerN3}>GAS Claim</div>
        </div>

        <div className={styles.txToContainerN3}>
          <div className={styles.txTransferContainerN3}>
            <div className={styles.txTokenContainerN3}>
              <img src={image} />
              {symbol}
            </div>
            <div className={styles.txAmountContainerN3}>
              {/* eslint-disable-next-line no-restricted-globals */}
              {!isNaN(amount) && amount}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(N3ClaimAbstract)
