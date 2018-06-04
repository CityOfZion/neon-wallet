// @flow

import React from 'react'
import storage from 'electron-json-storage'
import { reject } from 'lodash'
import fs from 'fs'

import { ROUTES, MODAL_TYPES } from '../../core/constants'
import Wallet from './Wallet.jsx'
import styles from './WalletManager.scss'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import Import from '../../assets/icons/import.svg'
import Export from '../../assets/icons/export.svg'
import { recoverWallet } from '../../modules/generateWallet'

const { dialog } = require('electron').remote

type Props = {
  accounts: any,
  saveAccount: Function,
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

  saveWalletRecovery = () => {
    const { showSuccessNotification, showErrorNotification } = this.props

    storage.get('userWallet', (errorReading, data) => {
      if (errorReading) {
        showErrorNotification({
          message: `An error occurred reading wallet file: ${
            errorReading.message
          }`
        })
        return
      }
      const content = JSON.stringify(data)
      dialog.showSaveDialog(
        {
          filters: [{ name: 'JSON', extensions: ['json'] }]
        },
        fileName => {
          if (fileName === undefined) {
            return
          }
          // fileName is a string that contains the path and filename created in the save file dialog.
          fs.writeFile(fileName, content, errorWriting => {
            if (errorWriting) {
              showErrorNotification({
                message: `An error occurred creating the file: ${
                  errorWriting.message
                }`
              })
            } else {
              showSuccessNotification({
                message: 'The file has been succesfully saved'
              })
            }
          })
        }
      )
    })
  }

  loadWalletRecovery = () => {
    const {
      showSuccessNotification,
      showErrorNotification,
      setAccounts
    } = this.props

    dialog.showOpenDialog(fileNames => {
      // fileNames is an array that contains all the selected
      if (!fileNames) {
        return
      }
      const filepath = fileNames[0]
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
          showErrorNotification({
            message: `An error occurred reading the file: ${err.message}`
          })
          return
        }
        const walletData = JSON.parse(data)

        recoverWallet(walletData)
          .then(data => {
            showSuccessNotification({ message: 'Recovery was successful.' })
            setAccounts(data.accounts)
          })
          .catch(err => {
            showErrorNotification({
              message: `An error occurred recovering wallet: ${err.message}`
            })
          })
      })
    })
  }

  render = () => {
    const { accounts, saveAccount } = this.props
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
              handleSave={saveAccount}
            />
          ))}
        </div>

        <div className={styles.buttonRow}>
          <div className={styles.buttonContainer}>
            <Button renderIcon={Import}>Import Wallets</Button>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={this.saveWalletRecovery} renderIcon={Export}>
              Export Wallets
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
