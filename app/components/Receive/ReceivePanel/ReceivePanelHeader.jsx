// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'

import CopyToClipboard from '../../CopyToClipboard'

import styles from './styles.scss'

type Props = {
  address: string,
}

const ReceivePanelHeader = ({ address }: Props) => (
  <section className={styles.receivePanelHeader}>
    <div className={styles.receivePanelHeaderInfo}>
      <FormattedMessage id="recieveSelectMethod" />
    </div>
    <div className={styles.walletAddressContainer}>
      <div className={styles.description}>
        <FormattedMessage id="receiveAssetsAddressLabel" />
      </div>
      <div className={styles.address}>{address}</div>
      <CopyToClipboard className={styles.copy} text={address} />
    </div>
  </section>
)

export default ReceivePanelHeader
