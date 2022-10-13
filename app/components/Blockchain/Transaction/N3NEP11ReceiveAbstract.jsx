// @flow
import React from 'react'
import classNames from 'classnames'
import { injectIntl } from 'react-intl'
import styles from './Transaction.scss'
import ReceiveIcon from '../../../assets/icons/receive-tx.svg'

type Props = {
  image: string,
  isPending: boolean,

  symbol: string,
  tokenName: string,
  txDate: React$Node,
}

class N3NEP11ReceiveAbstract extends React.Component<Props> {
  render = () => {
    const { image, isPending, tokenName, symbol, txDate } = this.props

    const logo = image && (
      <img
        src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        alt={`${symbol}`}
      />
    )

    return (
      <div className={classNames(styles.transactionContainerN3)}>
        <div className={styles.abstractContainerN3}>
          <div className={styles.txTypeIconContainerN3}>
            <div className={styles.sendIconContainer}>
              <ReceiveIcon />
            </div>
          </div>
          {isPending ? 'Pending' : txDate}
          <div className={styles.txLabelContainerN3} style={{ minWidth: 100 }}>
            {' '}
            NFT Transfer
          </div>
        </div>

        <div className={styles.txToContainerN3}>
          <div className={styles.txTransferContainerN3}>
            <div className={styles.txNFTContainerN3}>
              <div className={styles.txNFTImageWrapperN3}>{logo}</div>
            </div>
            <div className={styles.txAmountContainerN3} />
          </div>
        </div>
      </div>
    )
  }
}

export default injectIntl(N3NEP11ReceiveAbstract)
