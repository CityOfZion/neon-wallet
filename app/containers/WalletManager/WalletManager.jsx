// @flow

import React from 'react'
import storage from 'electron-json-storage'
import { reject } from 'lodash'

import { ROUTES, MODAL_TYPES } from '../../core/constants'
import Wallet from './Wallet.jsx'
import styles from './WalletManager.scss'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Import from '../../assets/icons/import.svg'
import Export from '../../assets/icons/export.svg'

type Props = {
  accounts: any,
  showSuccessNotification: Function,
  showErrorNotification: Function,
  setAccounts: (Array<Object>) => any,
  showModal: Function
}

export default class WalletManager extends React.Component<Props> {
  deleteWalletAccount = (label: string, key: string) => {
    const {
      showSuccessNotification,
      showErrorNotification,
      setAccounts,
      showModal
    } = this.props

    showModal(MODAL_TYPES.CONFIRM, {
      title: 'Confirm Delete',
      text: `Please confirm deleting saved wallet - ${label}`,
      onClick: () => {
        storage.get('userWallet', (readError, data) => {
          if (readError) {
            showErrorNotification({
              message: `An error occurred reading previously stored wallet: ${
                readError.message
              }`
            })
            return
          }

          data.accounts = reject(data.accounts, { key })

          storage.set('userWallet', data, saveError => {
            if (saveError) {
              showErrorNotification({
                message: `An error occurred updating the wallet: ${
                  saveError.message
                }`
              })
            } else {
              showSuccessNotification({
                message: 'Account deletion was successful.'
              })
              setAccounts(data.accounts)
            }
          })
        })
      }
    })
  }

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
          {accounts.map(account => (
            <Wallet
              {...account}
              handleDelete={() =>
                this.deleteWalletAccount(account.label, account.key)
              }
            />
          ))}
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
