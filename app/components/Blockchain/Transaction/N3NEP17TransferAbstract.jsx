// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl'
import Button from '../../Button'
import styles from './Transaction.scss'
import ReceiveIcon from '../../../assets/icons/receive-tx.svg'
import SendIcon from '../../../assets/icons/send-tx.svg'

import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import CopyToClipboard from '../../CopyToClipboard'
import { TX_TYPES } from '../../../core/constants'

type Props = {
  findContact: (address: string) => React$Node | null,
  intl: IntlShape,
  notification: Object,
  showAddContactModal: (to: string) => void,
}

class N3NEP17TransferAbstract extends React.Component<Props> {
  render = () => {

    console.log("nep17 transfer", this.props)
    const { notification, intl, findContact, showAddContactModal } = this.props
    const { parsed, token, vector } = notification
    const { image, symbol } = token
    const { from, to, amount } = parsed

    const logo = image && (
      <img
        src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        alt={`${symbol}`}
      />
    )
    const contactFrom = from && findContact(from)
    const contactFromExists = contactFrom !== from
    return (
        <div className={styles.abstractContainerN3}>
          <div className={styles.sendIconContainer}>
            {notification.vector === TX_TYPES.SEND ? <SendIcon /> : <ReceiveIcon />}
          </div>

          <div className={styles.txLabelContainerN3}> {notification.vector}</div>

          <div className={styles.txTransferContainerN3}>
            <div className={styles.txTokenContainerN3}>
              {logo}
              {symbol}
            </div>
            <div className={styles.txAmountContainerN3}>{amount}</div>
          </div>

          <div className={styles.txSubjectContainerN3}>
            <p>{notification.vector === TX_TYPES.SEND ? to : from}</p>
            <CopyToClipboard
              className={styles.copy}
              text={notification.vector === TX_TYPES.SEND ? to : from}
              tooltip={intl.formatMessage({ id: 'copyAddressTooltip' })}
            />
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

export default injectIntl(N3NEP17TransferAbstract)
