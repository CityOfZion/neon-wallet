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
  findContact: React$Node,
  from: string,
  intl: IntlShape,
  showAddContactModal: (to: string) => void,
  symbol: string,
  to: string,
  tokenName: string,
  txDate: React$Node,
}

class N3NEP11SendAbstract extends React.Component<Props> {
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
    const logo = image && <img src={image} alt={`${symbol}`} />
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
          <div className={styles.txLabelContainerN3}> NFT Transfer</div>
        </div>

        <div className={styles.txToContainerN3}>
          <div className={styles.txTransferContainerN3}>
            <div className={styles.txNFTContainerN3}>{logo}</div>
            <div className={styles.txAmountContainerN3}>{tokenName}</div>
          </div>
          <div className={styles.txSubjectContainerN3}>
            {contactTo}
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

export default injectIntl(N3NEP11SendAbstract)
