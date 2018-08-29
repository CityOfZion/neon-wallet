// @flow
import React from 'react'
import { noop } from 'lodash'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import styles from './style.scss'
import GridIcon from '../../../assets/icons/grid.svg'

type Props = {
  hideModal: Function,
  walletName: string,
}

const ReceiveModal = ({
  hideModal,
  walletName,
}: Props) => (
  <BaseModal
    title='Your QR Code'
    hideModal={hideModal}
    style={{ content: { width: '700px', height: '750px' } }}

  >
    <div className={styles.header}>
      <GridIcon className={styles.icon}/>
      <div className={styles.title}>
        {'Your QR Code'}
      </div>
    </div>
    <div className={styles.subHeader}>
      <div className={styles.title}>
        {'Receive assets'}
      </div>
      <div className={styles.walletName}>
        {walletName}
      </div>
    </div>
  </BaseModal>
)

export default ReceiveModal
