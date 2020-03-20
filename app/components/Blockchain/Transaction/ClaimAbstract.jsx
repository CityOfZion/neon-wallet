// @flow
import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import classNames from 'classnames'
import Button from '../../Button'
import ClaimIcon from '../../../assets/icons/claim.svg'
import ContactsAdd from '../../../assets/icons/contacts-add.svg'
import CopyToClipboard from '../../CopyToClipboard'

import styles from './Transaction.scss'

type Props = {
  txDate: React$Node,
  logo: React$Node,
  label: string,
  amount: string | number,
  contactTo: React$Node | string,
  to: string,
  contactToExists: boolean,
  showAddContactModal: (from: string) => void,
}

export default class ClaimAbstract extends React.Component<Props> {
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
    } = this.props
    return (
      <div className={classNames(styles.transactionContainer)}>
        <div className={styles.abstractContainer}>
          <div className={styles.txTypeIconContainer}>
            <div className={styles.claimIconContainer}>
              <ClaimIcon />
            </div>
          </div>
          {txDate}
          <div className={styles.txLabelContainer}>
            {logo}
            {label}
          </div>
          <div className={styles.txAmountContainer}>{amount}</div>
          <div className={styles.txToContainer}>
            <Fragment>
              <span>{contactTo}</span>
              <CopyToClipboard
                className={styles.copy}
                text={to}
                tooltip="Copy Public Address"
              />
            </Fragment>
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
