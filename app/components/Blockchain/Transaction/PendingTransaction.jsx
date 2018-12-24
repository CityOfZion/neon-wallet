// @flow
import React, { Fragment } from 'react'

import Button from '../../Button'
import styles from './Transaction.scss'
import SendIcon from '../../../assets/icons/send-tx.svg'
import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import CopyToClipboard from '../../CopyToClipboard'
import { pluralize } from '../../../util/pluralize'

type Props = {
  renderTxDate: (time: ?number) => React$Node | null,
  findContact: (address: string) => React$Node | null,
  asset: {
    symbol: string,
    image?: string,
  },
  blocktime: number,
  amount: string,
  to: string,
  confirmations: number,
  showAddContactModal: (address: string) => void,
}

export default class Transaction extends React.Component<Props> {
  render = () => {
    const {
      asset,
      amount,
      to,
      blocktime,
      findContact,
      showAddContactModal,
      confirmations,
    } = this.props
    const contactTo = findContact(to)
    const contactToExists = contactTo !== to
    const logo = asset.image && (
      <img src={asset.image} alt={`${asset.symbol} logo`} />
    )

    return (
      <Fragment>
        <div className={styles.abstractContainer}>
          <div className={styles.txTypeIconContainer}>
            <div className={styles.sendIconContainer}>
              <SendIcon />
            </div>
          </div>
          {!!blocktime && this.props.renderTxDate(blocktime)}
          <div className={styles.txLabelContainer}>
            {logo}
            {asset.symbol}
          </div>
          <div className={styles.txAmountContainer}>{amount}</div>
          <div className={styles.txToContainer}>
            <Fragment>
              <span>{contactTo}</span>
              {!contactToExists && (
                <CopyToClipboard
                  className={styles.copy}
                  text={to}
                  tooltip="Copy Public Address"
                />
              )}
            </Fragment>
          </div>
          <Button
            className={styles.transactionHistoryButton}
            renderIcon={ContactsAdd}
            onClick={() => showAddContactModal(to)}
            disabled={contactToExists}
          >
            Add
          </Button>
        </div>
        <div className={styles.confirmationsContainer}>
          <b>{confirmations || 0}</b>{' '}
          {pluralize('Confirmation', confirmations || 0)}
        </div>
      </Fragment>
    )
  }
}
