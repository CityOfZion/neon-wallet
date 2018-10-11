// @flow
import React from 'react'
import classNames from 'classnames'

import InfoIcon from '../../../assets/icons/info.svg'

import styles from './styles.scss'

export default function ReceiveExplanation() {
  return (
    <div className={styles.receiveExplanation}>
      <div className={styles.header}>
        <InfoIcon className={styles.icon} />
        <div className={styles.title}>Why use a QR code?</div>
      </div>
      <div className={styles.message}>
        <p>
          Ever sent assets to the wrong address because of an errant character
          in the wallet address?
        </p>
        <p>If not, lucky you - but it happens with frightening regularity.</p>
        <p>
          Here at CoZ, we want to ensure people that pay you get your details
          right. You can generate a QR code for requesting assets to help them
          help you.
        </p>
        <p>
          Every code you generate will include your public wallet address, an
          asset amount and a reference - all set by you.
        </p>
      </div>
    </div>
  )
}
