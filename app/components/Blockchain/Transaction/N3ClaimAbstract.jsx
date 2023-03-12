// @flow
import React from 'react'
import classNames from 'classnames'
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl'
import Button from '../../Button'
import styles from './Transaction.scss'
import ClaimIcon from '../../../assets/icons/claim.svg'
import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import CopyToClipboard from '../../CopyToClipboard'

type Props = {
  amount: number,
  image: string,
  isPending: boolean,
  findContact: (address: string) => React$Node | null,
  from: string,
  intl: IntlShape,
  showAddContactModal: (to: string) => void,
  symbol: string,
  txDate: React$Node,
}

class N3ClaimAbstract extends React.Component<Props> {
  render = () => {
    const {
      amount,
      image,
      isPending,
      findContact,
      from,
      intl,
      showAddContactModal,
      symbol,
      txDate,
    } = this.props
    const logo = image && (
      <img
        src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
        alt={`${symbol}`}
      />
    )
    const contactFrom = from && findContact(from)
    const contactFromExists = contactFrom !== from
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
              {logo}
              {symbol}
            </div>
            <div className={styles.txAmountContainerN3}>{amount}</div>
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

export default injectIntl(N3ClaimAbstract)
