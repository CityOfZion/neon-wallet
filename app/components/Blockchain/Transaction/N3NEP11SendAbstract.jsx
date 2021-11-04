// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl'
import Button from '../../Button'
import styles from './Transaction.scss'
import SendIcon from '../../../assets/icons/send-tx.svg'
import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import CopyToClipboard from '../../CopyToClipboard'

type Props = {
  amount: string | number,
  findContact: React$Node,
  image: string,
  intl: IntlShape,
  isPending: boolean,
  to: string,
  showAddContactModal: (to: string) => void,
  symbol: string,
  txDate: React$Node,
}

class N3NEP11SendAbstract extends React.Component<Props> {
  render = () => {
    const {
      amount,
      findContact,
      image,
      intl,
      isPending,
      to,
      showAddContactModal,
      symbol,
      txDate,
    } = this.props
    //console.log("NEP 11 Send: ", this.props)
    const logo = image && <img src={image} alt={`${symbol}`} />
    const contactTo = findContact(to)
    const contactToExists = contactTo !== to
    return (
      <div className={classNames(styles.transactionContainerN3)}>
        <div className={styles.abstractContainerN3}>
          <div className={styles.txTypeIconContainerN3}>
            <div className={styles.sendIconContainer}>
              <SendIcon />
            </div>
          </div>
          {isPending ? 'Pending' : txDate}
          <div className={styles.txLabelContainerN3}>Transfer</div>
        </div>

        <div className={styles.txToContainerN3}>
          <div className={styles.txTransferContainerN3}>
            <div className={styles.txTokenContainerN3}>
              {logo}
              {symbol}
            </div>
            <div className={styles.txAmountContainerN3}>{amount}</div>
          </div>
          <div className={styles.txToContainerN3}>
            <span>{contactTo}</span>
            <CopyToClipboard
              className={styles.copy}
              text={contactTo}
              tooltip={intl.formatMessage({ id: 'copyAddressTooltip' })}
            />
          </div>
          <Button
            className={styles.transactionHistoryButton}
            renderIcon={ContactsAdd}
            onClick={() => showAddContactModal(to)}
            disabled={contactToExists}
          >
            <FormattedMessage id="activityAddAddress" />
          </Button>
        </div>
      </div>
    )
  }
}

export default injectIntl(N3NEP11SendAbstract)
