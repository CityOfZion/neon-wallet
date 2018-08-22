// @flow
import React from 'react'

import styles from './styles.scss'

type Props = {
  address: string,
}

const ReceivePanelHeader = ({
  address
}: Props) => {

  return (
    <section className={styles.sendPanelHeader}>
      <div className={styles.sendPanelHeaderInfo}>
        Select Deposit Method
      </div>
    </section>
  )
}

export default ReceivePanelHeader
