// @flow

import React from 'react'
import classNames from 'classnames'
import { uniqueId } from 'lodash-es'
import { FormattedMessage } from 'react-intl'

import SendRecipientListItem from './SendRecipientListItem'

import styles from './SendRecipientList.scss'

type Props = {
  sendRowDetails: Array<*>,
  sendableAssets: Object,
  contacts: Object,
  showConfirmSend: boolean,
  clearErrors: (index: number, field: string) => any,
  removeRow: (index: number) => any,
  updateRowField: (index: number, field: string, value: any) => any,
  calculateMaxValue: (asset: string, index: number) => string,
  isMigration?: boolean,
}

const SendRecipientList = ({
  sendRowDetails,
  removeRow,
  updateRowField,
  sendableAssets,
  contacts,
  clearErrors,
  showConfirmSend,
  calculateMaxValue,
  isMigration,
}: Props) => {
  const renderRows = () =>
    sendRowDetails.map((row, index) => (
      <SendRecipientListItem
        key={row.id || uniqueId}
        {...row}
        index={index}
        numberOfRecipients={sendRowDetails.length}
        showConfirmSend={showConfirmSend}
        removeRow={removeRow}
        updateRowField={updateRowField}
        sendableAssets={sendableAssets}
        contacts={contacts}
        clearErrors={clearErrors}
        calculateMaxValue={calculateMaxValue}
        isMigration={isMigration}
      />
    ))

  return (
    <section
      className={classNames({
        [styles.sendRecipientListContainer]: sendRowDetails.length > 1,
        [styles.sendRecipientSingleListContainer]: sendRowDetails.length === 1,
        [styles.migrationContainer]: isMigration,
      })}
    >
      <div className={styles.sendRecipientListHeaders}>
        <h3
          className={classNames(styles.sendRecipientListHeader, styles.asset)}
        >
          <FormattedMessage id="sendAssetLabel" />
        </h3>
        <h3
          className={classNames(styles.sendRecipientListHeader, styles.amount)}
        >
          <FormattedMessage id="sendAmountLabel" />
        </h3>
        <h3
          className={classNames(styles.sendRecipientListHeader, styles.address)}
        >
          <FormattedMessage id="sendAddressLabel" />
        </h3>
        {!isMigration && <div className={styles.delete} />}
      </div>
      <ul className={styles.sendRecipientList}>{renderRows()}</ul>
    </section>
  )
}

export default SendRecipientList
