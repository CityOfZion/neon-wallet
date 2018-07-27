// @flow

import React, { Component } from 'react'
import { reject } from 'lodash'
import fs from 'fs'

import { getStorage, setStorage } from '../../core/storage'
import { ROUTES, MODAL_TYPES } from '../../core/constants'
import Wallet from './Wallet.jsx'
import CloseButton from '../../components/CloseButton'
import Button from '../../components/Button'
import { recoverWallet } from '../../modules/generateWallet'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import Import from '../../assets/icons/import.svg'
import Export from '../../assets/icons/export.svg'

import styles from './WalletManager.scss'

const { dialog } = require('electron').remote

type Props = {
  accounts: Array<Object>,
  saveAccount: ({ label: string, address: string }) => any,
  showSuccessNotification: Object => any,
  showErrorNotification: Object => any,
  setAccounts: (Array<Object>) => any,
  showModal: (modalType: string, modalProps: Object) => any
}

class WalletManager extends Component<Props> {
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
      onClick: async () => {
        const data = await getStorage('userWallet').catch(readError =>
          showErrorNotification({
            message: `An error occurred reading previously stored wallet: ${
              readError.message
            }`
          })
        )
        if (data) {
          data.accounts = reject(data.accounts, { key })
          await setStorage('userWallet', data).catch(saveError =>
            showErrorNotification({
              message: `An error occurred updating the wallet: ${
                saveError.message
              }`
            })
          )
          showSuccessNotification({
            message: 'Account deletion was successful.'
          })
          setAccounts(data.accounts)
        }
      }
    })
  }

  saveWalletRecovery = async () => {
    const { showSuccessNotification, showErrorNotification } = this.props
    const data = await getStorage('userWallet').catch(readError =>
      showErrorNotification({
        message: `An error occurred reading previously stored wallet: ${
          readError.message
        }`
      })
    )
    if (data) {
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
    }
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

  render() {
    return (
      <FullHeightPanel
        // headerText={option === 'CREATE' ? 'Create New Wallet' : 'Import Wallet'}
        // renderHeaderIcon={() =>
        //   option === 'IMPORT' ? <CheckIcon /> : <AddIcon />
        // }
        shouldRenderInstructions={false}
        renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
      >
        <div />
      </FullHeightPanel>
    )
  }

  // render() {
  //   const { accounts, saveAccount } = this.props
  //   return (
  //     <div className={styles.walletManager}>
  //       <div className={styles.panelHeaderContainer}>
  //         <div className={styles.navRow}>
  //           <BackButton routeTo={ROUTES.DASHBOARD} />
  //           Wallet Manager
  //         </div>
  //       </div>
  //       <div className={styles.walletList}>
  //         {accounts.map(account => (
  //           <Wallet
  //             {...account}
  //             handleDelete={() =>
  //               this.deleteWalletAccount(account.label, account.key)
  //             }
  //             handleSave={saveAccount}
  //           />
  //         ))}
  //       </div>

  //       <div className={styles.buttonRow}>
  //         <div className={styles.buttonContainer}>
  //           <Button onClick={this.loadWalletRecovery} renderIcon={Import}>
  //             Import Wallets
  //           </Button>
  //         </div>
  //         <div className={styles.buttonContainer}>
  //           <Button onClick={this.saveWalletRecovery} renderIcon={Export}>
  //             Export Wallets
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }
}

export default WalletManager
