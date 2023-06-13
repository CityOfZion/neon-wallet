// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl'
import Button from '../../Button'
import styles from './Transaction.scss'
import ReceiveIcon from '../../../assets/icons/receive-tx.svg'
import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import CopyToClipboard from '../../CopyToClipboard'

type Props = {
  image: string,
  isPending: boolean,
  findContact: (address: string) => React$Node | null,
  from: string,
  intl: IntlShape,
  showAddContactModal: (to: string) => void,
  symbol: string,
  to: string,
  tokenName: string,
  txDate: React$Node,
}

class N3NEP11ReceiveAbstract extends React.Component<Props> {
  render = () => {
    const {
      image,
      isPending,
      findContact,
      from,
      intl,
      to,
      tokenName,
      showAddContactModal,
      symbol,
      txDate,
    } = this.props

    console.log({ from, to })

    const logo = image && (
      <img
        src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        alt={`${symbol}`}
      />
    )
    const contactTo = to && findContact(to)
    const contactToExists = contactTo !== to
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
          <div className={styles.txSubjectContainerN3}>
            <p>{contactTo}</p>
            <CopyToClipboard
              className={styles.copy}
              text={contactTo}
              tooltip={intl.formatMessage({ id: 'copyAddressTooltip' })}
            />
          </div>
          <Button
            className={styles.transactionHistoryButton}
            renderIcon={ContactsAdd}
            onClick={() => showAddContactModal(from)}
            disabled={contactToExists}
          >
            <FormattedMessage id="activityAddAddress" />
          </Button>
        </div>
      </div>
    )
  }
}

export default injectIntl(N3NEP11ReceiveAbstract)

// // @flow
// import React from 'react'
// import classNames from 'classnames'
// import { injectIntl } from 'react-intl'
// import styles from './Transaction.scss'
// import ReceiveIcon from '../../../assets/icons/receive-tx.svg'

// type Props = {
//   image: string,
//   isPending: boolean,

//   symbol: string,
//   tokenName: string,
//   txDate: React$Node,
// }

// class N3NEP11ReceiveAbstract extends React.Component<Props> {
//   render = () => {
//     const { image, isPending, tokenName, symbol, txDate } = this.props

//     const logo = image && (
//       <img
//         src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
//         alt={`${symbol}`}
//       />
//     )

//     return (
//       <div className={classNames(styles.transactionContainerN3)}>
//         <div className={styles.abstractContainerN3}>
//           <div className={styles.txTypeIconContainerN3}>
//             <div className={styles.sendIconContainer}>
//               <ReceiveIcon />
//             </div>
//           </div>
//           {isPending ? 'Pending' : txDate}
//           <div className={styles.txLabelContainerN3} style={{ minWidth: 100 }}>
//             {' '}
//             NFT Transfer
//           </div>
//         </div>

//         <div className={styles.txToContainerN3}>
//           <div className={styles.txTransferContainerN3}>
//             <div className={styles.txNFTContainerN3}>
//               <div className={styles.txNFTImageWrapperN3}>{logo}</div>
//             </div>
//             <div className={styles.txAmountContainerN3} />
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default injectIntl(N3NEP11ReceiveAbstract)
