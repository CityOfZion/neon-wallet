// @flow
import React from 'react'
import Button from '../../Button'

import Table from '../../Table'
import { Address } from '../../Blockchain'
import { formatBalance } from '../../../core/formatters'

import styles from './ConfirmDisplay.scss'

type Props = {
  address: string,
  entries: Array<SendEntryType>,
  message: string,
  onAddRecipient: Function,
  onConfirm: Function,
  onCancel: Function
}

type State = {
  agree: boolean
}

export default class ConfirmDisplay extends React.Component<Props, State> {
  state = {
    agree: false
  }

  render () {
    const { onConfirm, onCancel, entries, address, message } = this.props
    const { agree } = this.state

    return (
      <div className={styles.confirmDisplay}>
        <div className={styles.table}>
          <Table>
            <thead>
              <tr>
                <th>Asset</th>
                <th>Recipient</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, i) => (
                <tr key={`entry-${i}`}>
                  <td>{formatBalance(entry.symbol, entry.amount)} {entry.symbol}</td>
                  <td><Address address={entry.address} /></td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className={styles.addRecipient}>
            <a onClick={this.props.onAddRecipient}>+ Add Recipient</a>
          </div>
        </div>

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
}
