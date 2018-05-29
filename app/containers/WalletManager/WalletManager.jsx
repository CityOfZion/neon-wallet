// @flow

import React from 'react'

import { ROUTES } from '../../core/constants'
import styles from './WalletManager.scss'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Import from '../../assets/icons/import.svg'
import Export from '../../assets/icons/export.svg'
import Delete from '../../assets/icons/delete.svg'
import Edit from '../../assets/icons/edit.svg'

type Props = {}

export default class WalletManager extends React.Component<Props> {
  render = () => {
    const { accounts } = this.props
    return (
      <div className={styles.walletManager}>
        <div className={styles.panelHeaderContainer}>
          <div className={styles.navRow}>
            <BackButton routeTo={ROUTES.HOME} />
            Wallet Manager
          </div>
        </div>
        <div className={styles.walletList}>
          {accounts.map(account => <Account {...account} />)}
        </div>

        <div className={styles.buttonRow}>
          <div className={styles.buttonContainer}>
            <Button renderIcon={Import}>Import Wallets</Button>
          </div>
          <div className={styles.buttonContainer}>
            <Button renderIcon={Export}>Export Wallets</Button>
          </div>
        </div>
      </div>
    )
  }
}

const Account = props =>
  console.log(props) || (
    <div className={styles.accountInfoRow}>
      <div className={styles.accountInfo}>
        <div className={styles.accountLabel}> {props.label}</div>
        <div className={styles.address}>{props.address}</div>
      </div>
      <div className={styles.accountButtons}>
        <div className={styles.editAccountButton}>
          <Button renderIcon={Edit} />
        </div>
        <div className={styles.deleteAccountButton}>
          <Button renderIcon={Delete}>Delete Wallet</Button>
        </div>
      </div>
    </div>
  )
