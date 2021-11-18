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
  sender: string,
  showAddContactModal: (to: string) => void,
  symbol: string,
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
      sender,
      tokenName,
      showAddContactModal,
      symbol,
      txDate,
    } = this.props
    const logo = image && <img src={image} alt={`${symbol}`} />
    const contactFrom = sender && findContact(sender)
    const contactFromExists = contactFrom !== sender
    return (
      <div className={classNames(styles.transactionContainerN3)}>
        <div className={styles.abstractContainerN3}>
          <div className={styles.txTypeIconContainerN3}>
            <div className={styles.sendIconContainer}>
              <ReceiveIcon />
            </div>
          </div>
          {isPending ? 'Pending' : txDate}
          <div className={styles.txLabelContainerN3}> NFT Transfer</div>
        </div>

        <div className={styles.txToContainerN3}>
          <div className={styles.txTransferContainerN3}>
            <div className={styles.txNFTContainerN3}>{logo}</div>
            <div className={styles.txAmountContainerN3}>{tokenName}</div>
          </div>
          <div className={styles.txSubjectContainerN3}>
            <p>{contactFrom}</p>
            <CopyToClipboard
              className={styles.copy}
              text={contactFrom}
              tooltip={intl.formatMessage({ id: 'copyAddressTooltip' })}
            />
          </div>
          <Button
            className={styles.transactionHistoryButton}
            renderIcon={ContactsAdd}
            onClick={() => showAddContactModal(from)}
            disabled={contactFromExists}
          >
            <FormattedMessage id="activityAddAddress" />
          </Button>
        </div>
      </div>
    )
  }
}

export default injectIntl(N3NEP11ReceiveAbstract)
