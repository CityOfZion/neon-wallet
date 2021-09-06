// @flow
import React from 'react'

import classNames from 'classnames'

import styles from './AlertBox.scss'
import WarningIcon from '../../assets/icons/warning.svg'

const electron = require('electron').remote

const AlertBox = () => (
  <section className={classNames(styles.alertBox, 'alertBox')}>
    <table>
      <tbody>
        <tr>
          <td>
            <WarningIcon />
          </td>
          <td>
            <div>
              <h2>Scam Warning !!!</h2>
            </div>
            <span>
              <b>You cannot migrate your tokens from this page. </b>
              Anyone who is telling you otherwise is trying to scam you and is
              not your friend. Any tokens you transfer from the SEND tab are
              going to someone else's wallet. Migration can only be performed
              through the MIGRATION tab, which will be enabled for Ledger when
              Ledger migration support is available. Click this link to visit
              the COZ the COZ Twitter for more information:{' '}
              <a
                onClick={() => {
                  electron.shell.openExternal(
                    'https://twitter.com/coz_official',
                  )
                }}
              >
                https://twitter.com/coz_official
              </a>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
)

export default AlertBox
