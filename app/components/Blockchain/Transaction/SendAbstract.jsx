// @flow
import React, { Fragment } from 'react'
import classNames from 'classnames'

import Button from '../../Button'
import styles from './Transaction.scss'
import SendIcon from '../../../assets/icons/send-tx.svg'
import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import CopyToClipboard from '../../CopyToClipboard'

type Props = {
  txDate: React$Node,
  logo: React$Node,
  label: string,
  amount: string | number,
  contactTo: React$Node | string,
  to: string,
  contactToExists: boolean,
  showAddContactModal: (to: string) => void,
  isNetworkFee: boolean,
}

export default class SendAbstract extends React.Component<Props> {
  render = () => {
    const {
      txDate,
      logo,
      label,
      amount,
      contactTo,
      to,
      contactToExists,
      showAddContactModal,
      isNetworkFee,
    } = this.props
    return (
      <div className={classNames(styles.transactionContainer)}>
        <div className={styles.abstractContainer}>
          <div className={styles.txTypeIconContainer}>
            <div className={styles.sendIconContainer}>
              <SendIcon />
            </div>
          </div>
          {txDate}
          <div className={styles.txLabelContainer}>
            {logo}
            {label}
          </div>
          <div className={styles.txAmountContainer}>{amount}</div>
          <div className={styles.txToContainer}>
            {isNetworkFee ? (
              to
            ) : (
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
            )}
          </div>
          {isNetworkFee ? (
            <div className={styles.historyButtonPlaceholder} />
          ) : (
            <Button
              className={styles.transactionHistoryButton}
              renderIcon={ContactsAdd}
              onClick={() => showAddContactModal(to)}
              disabled={contactToExists}
            >
              Add
            </Button>
          )}
        </div>
      </div>
    )
  }
}
