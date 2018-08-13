// @flow

import React, { Component } from 'react'
import { reject } from 'lodash'
import fs from 'fs'

import { NavLink } from 'react-router-dom'
import { getStorage, setStorage } from '../../core/storage'
import { ROUTES, MODAL_TYPES } from '../../core/constants'
import Wallet from './Wallet.jsx'
import CloseButton from '../../components/CloseButton'
import Button from '../../components/Button'
import { recoverWallet } from '../../modules/generateWallet'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import Import from '../../assets/icons/import.svg'
import Add from '../../assets/icons/add.svg'
import WalletIcon from '../../assets/icons/wallet.svg'

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

  render() {
    const { accounts, saveAccount } = this.props
    return (
      <FullHeightPanel
        // headerText={option === 'CREATE' ? 'Create New Wallet' : 'Import Wallet'}
        // renderHeaderIcon={() =>
        //   option === 'IMPORT' ? <CheckIcon /> : <AddIcon />
        // }
        shouldRenderInstructions={false}
        shouldRenderHeader={false}
        renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
      >
        <div className={styles.contentContainer}>
          <div className={styles.walletManagerDetails}>
            <div className={styles.iconAndHeader}>
              <div className={styles.walletIcon}>
                <WalletIcon id="manage-wallets" />
              </div>
              <h2>Manage Wallets</h2>
            </div>
            <div className={styles.buttonRow}>
              {/* <div className={styles.buttonRow}>
              <div className={styles.buttonContainer}> */}
              <NavLink
                id="history"
                exact
                to={ROUTES.IMPORT_WALLET_AUTHENTICATED}
              >
                <Button renderIcon={Import}>Import</Button>
              </NavLink>
              {/* </div>
              <div className={styles.buttonContainer}> */}
              <NavLink
                id="history"
                exact
                to={ROUTES.CREATE_WALLET_AUTHENTICATED}
              >
                <Button renderIcon={Add}>Create</Button>
              </NavLink>
              {/* </div>
            </div> */}
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
        </div>
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
  // <div className={styles.walletList}>
  //   {accounts.map(account => (
  //     <Wallet
  //       {...account}
  //       handleDelete={() =>
  //         this.deleteWalletAccount(account.label, account.key)
  //       }
  //       handleSave={saveAccount}
  //     />
  //   ))}
  // </div>

  // <div className={styles.buttonRow}>
  //   <div className={styles.buttonContainer}>
  //     <Button onClick={this.loadWalletRecovery} renderIcon={Import}>
  //       Import Wallets
  //     </Button>
  //   </div>
  //   <div className={styles.buttonContainer}>
  //     <Button onClick={this.saveWalletRecovery} renderIcon={Export}>
  //       Export Wallets
  //     </Button>
  //   </div>
  // </div>
  //     </div>
  //   )
  // }
}

export default WalletManager
