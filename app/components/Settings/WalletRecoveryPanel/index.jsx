// @flow
import React from 'react'
import classNames from 'classnames'

import Button from '../../Button'

import styles from './WalletRecoveryPanel.scss'

import ImportIcon from '../../../assets/icons/import.svg'
import ExportIcon from '../../../assets/icons/export.svg'

type Props = {
  className?: string,
  childClassName?: string,
  title: string,
  saveWalletRecovery: Function,
  loadWalletRecovery: Function
}

const WalletRecoveryPanel = ({
  className,
  childClassName,
  title,
  saveWalletRecovery,
  loadWalletRecovery
}: Props) => (
  <div className={classNames(styles.walletWell, className)}>
    <h4 className={childClassName}>{title}</h4>
    <div className={styles.walletWellButtonsContainer}>
      <Button
        renderIcon={ImportIcon}
        className={styles.walletWellButton}
        onClick={loadWalletRecovery}
      >
        Import File
      </Button>
      <Button
        renderIcon={ExportIcon}
        className={styles.walletWellButton}
        onClick={saveWalletRecovery}
      >
        Export File
      </Button>
    </div>
  </div>
)

export default WalletRecoveryPanel
