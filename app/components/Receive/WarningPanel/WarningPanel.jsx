// @flow
import React from 'react'
import classNames from 'classnames'

import Panel from '../../Panel'
import WarningIcon from '../../../assets/icons/warning.svg'

import styles from './WarningPanel.scss'

type Props = {
  className: ?string
}

export default function WarningPanel (props: Props) {
  return (
    <Panel className={classNames(styles.warningPanel, props.className)}>
      <div className={styles.container}>
        <WarningIcon className={styles.icon} />
        <div className={styles.message}>
          <p>
            Only send assets such as NEO, GAS, and NEP-5 tokens that are compatible with the NEO
            Blockchain.
          </p>
          <p>
            Sending any other digital asset or token to this address will result in permanent loss.
          </p>
        </div>
      </div>
    </Panel>
  )
}
