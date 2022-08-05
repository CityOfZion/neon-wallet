// @flow
import React from 'react'

import classNames from 'classnames'

import styles from './TotalGasBeingSentAlert.scss'
import WarningIcon from '../../assets/icons/warning.svg'

const electron = require('electron')

const TotalGasBeingSentAlert = () => (
  <section className={classNames(styles.alertBox, 'alertBox')}>
    <div className={styles.iconContainer}>
      <WarningIcon />
    </div>
    <div>
      <div>
        <h2>WARNING</h2>
      </div>
      <div className={styles.warning}>
        <b>You are about to send all of your GAS out of this wallet. </b>
        You will not be able to perform any additional future transactions on N3
        without a GAS balance to pay transaction fees.
      </div>
    </div>
  </section>
)

export default TotalGasBeingSentAlert
