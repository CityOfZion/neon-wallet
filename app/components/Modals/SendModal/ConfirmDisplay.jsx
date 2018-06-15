// @flow
import React from 'react'
import Button from '../../Button'
import Delete from 'react-icons/lib/md/delete'

import NumberInput from '../../NumberInput'
import Table from '../../Table'
import { Address } from '../../Blockchain'
import { ASSETS } from '../../../core/constants'
import { formatBalance, COIN_DECIMAL_LENGTH } from '../../../core/formatters'

import styles from './ConfirmDisplay.scss'
import addRecipientDisplayStyles from './AddRecipientDisplay.scss'

type BalancesType = {
  [key: SymbolType]: string
}

type Props = {
  address: string,
  balances: BalancesType,
  entries: Array<SendEntryType>,
  message: string,
  onAddRecipient: Function,
  onDelete: Function,
  onConfirm: Function,
  onCancel: Function,
  priorityFee: string,
  onUpdatePriorityFee: Function,
  onToggleFeeInfo: Function,
  priorityFeeCollapsed: boolean
}

type State = {
  agree: boolean,

}

export default class ConfirmDisplay extends React.Component<Props, State> {
  state = {
    agree: false
  }

  render () {
    const {
      onConfirm,
      onCancel,
      entries,
      address,
      message,
      balances,
      priorityFee,
      onUpdatePriorityFee,
      onToggleFeeInfo,
      priorityFeeCollapsed
    } = this.props
    const { agree } = this.state

    return (
      <div className={styles.confirmDisplay}>
        <div className={styles.table}>
          <Table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Recipient</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={`entry-${i}`}>
                  <td>{formatBalance(entry.symbol, entry.amount)} {entry.symbol}</td>
                  <td><Address address={entry.address} /></td>
                  <td>
                    <Delete className={styles.entryAction} onClick={this.handleDelete(entry)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className={styles.addRecipient}>
          <a onClick={this.props.onAddRecipient}>+ Add Recipient</a>
        </div>

        <div className={styles.priorityFeeActions}>
          <Button cancel={!priorityFeeCollapsed} onClick={onToggleFeeInfo}>
            {!priorityFeeCollapsed ? 'Remove Priority Fee' : 'Add Priority Fee'}
          </Button>
        </div>

        {!priorityFeeCollapsed && (
          <div className={addRecipientDisplayStyles.inputs}>
            <div className={addRecipientDisplayStyles.row}>
              <div id='sendAmount' className={addRecipientDisplayStyles.column}>
                <label className={addRecipientDisplayStyles.label}>Priority Fee:</label>
                <NumberInput
                  value={priorityFee}
                  placeholder='Priority Fee'
                  options={{ numeralDecimalScale: COIN_DECIMAL_LENGTH }}
                  onChange={onUpdatePriorityFee} />
                <label className={addRecipientDisplayStyles.label}>
                  ({balances[ASSETS.GAS]} GAS Available)
                </label>
              </div>
            </div>
            <div className={styles.addSmallestFee}>
              <a onClick={() => onUpdatePriorityFee('0.00000001')}>+ Add smallest fee possible</a>
            </div>
          </div>
        )}

        {message && (
          <div className={styles.messages}>{message}</div>
        )}

        <div className={styles.agree}>
          <input id='agree' type='checkbox' checked={agree} onChange={() => this.setState({ agree: !agree })} />
          <label htmlFor='agree'>
            I agree to transfer the above assets & tokens from{' '}
            <Address address={address} />.
          </label>
        </div>

        <div className={styles.actions}>
          <Button cancel onClick={onCancel}>Cancel</Button>
          <Button disabled={!agree} onClick={onConfirm}>Send Assets</Button>
        </div>
      </div>
    )
  }

  handleDelete = (entry: SendEntryType) => {
    return () => this.props.onDelete(entry)
  }
}
