// @flow
import React from 'react'

import classNames from 'classnames'

import styles from './AlertBox.scss'
import WarningIcon from '../../assets/icons/warning.svg'

const electron = require('electron').remote

const AlertBox = () => (
  <section className={classNames(styles.alertBox, 'alertBox')}>
    <div className={styles.iconContainer}>
      <WarningIcon />
    </div>
    <div>
      <div>
        <h2>SCAM WARNING</h2>
      </div>
      <div className={styles.warning}>
        <b>You cannot migrate your tokens from this page. </b>
        Anyone who is telling you otherwise is trying to scam you and is not
        your friend. Any tokens you transfer from the SEND tab are going to
        someone else's wallet. Migration can only be performed through the
        MIGRATION tab, which will be enabled for Ledger when Ledger migration
        support is available. Click this link to visit the COZ the COZ Twitter
        for more information:{' '}
        <a
          onClick={() => {
            electron.shell.openExternal('https://twitter.com/coz_official')
          }}
        >
          https://twitter.com/coz_official
        </a>
      </div>
    </div>
  </section>
)

export default AlertBox
