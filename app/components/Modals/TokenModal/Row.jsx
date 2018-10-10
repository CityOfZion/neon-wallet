// @flow
import React, { Component } from 'react'
import classNames from 'classnames'

import Delete from 'react-icons/lib/md/delete'
import LockOutline from 'react-icons/lib/md/lock-outline'
import Tooltip from '../../Tooltip'

import styles from './Row.scss'
import TextInput from '../../Inputs/TextInput'

type Props = {
  token: TokenItemType,
  onChangeScriptHash: Function,
  onDelete: Function,
  isScriptHashInvalid: boolean
}

class Row extends Component<Props> {
  render() {
    const {
      token,
      onChangeScriptHash,
      onDelete,
      isScriptHashInvalid
    } = this.props
    return (
      <div className={styles.row}>
        <TextInput
          className={classNames(styles.rowURL, {
            [styles.rowError]: isScriptHashInvalid
          })}
          type="text"
          readOnly={!token.isUserGenerated}
          disabled={!token.isUserGenerated}
          placeholder="script hash"
          defaultValue={token.scriptHash}
          onChange={e =>
            token.isUserGenerated && onChangeScriptHash(e.target.value)
          }
        />
        <Tooltip title="Delete">
          <Delete onClick={onDelete} className={styles.icon} />
        </Tooltip>
      </div>
    )
  }
}

export default Row
