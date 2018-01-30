// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import Tooltip from '../../Tooltip'

import Delete from 'react-icons/lib/md/delete'
import LockOutline from 'react-icons/lib/md/lock-outline'

import styles from './Row.scss'

type Props = {
  token: TokenItemType,
  onChangeScriptHash: Function,
  onDelete: Function,
  isScriptHashInvalid: boolean
}

class Row extends Component<Props> {
  scriptHashInput: ?HTMLInputElement;

  componentWillReceiveProps (nextProps: Props) {
    if (nextProps.isScriptHashInvalid && this.scriptHashInput) {
      this.scriptHashInput.focus()
    }
  }

  render () {
    const {
      token,
      onChangeScriptHash,
      onDelete,
      isScriptHashInvalid
    } = this.props
    return (
      <div className={styles.row}>
        <input
          className={classNames(styles.rowURL, {
            [styles.rowError]: isScriptHashInvalid
          })}
          type='text'
          readOnly={!token.isUserGenerated}
          disabled={!token.isUserGenerated}
          placeholder='script hash'
          ref={node => {
            this.scriptHashInput = node
          }}
          defaultValue={token.scriptHash}
          onChange={e =>
            token.isUserGenerated && onChangeScriptHash(e.target.value)
          }
        />
        {token.isUserGenerated ? (
          <Tooltip title='Delete'>
            <Delete onClick={onDelete} className={styles.icon} />
          </Tooltip>
        ) : (
          <Tooltip title='This token cannot be changed'>
            <LockOutline className={styles.icon} />
          </Tooltip>
        )}
      </div>
    )
  }
}

export default Row
