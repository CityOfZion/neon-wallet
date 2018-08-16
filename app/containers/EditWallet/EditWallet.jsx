// @flow

import React, { Component } from 'react'
import { reject } from 'lodash'
import fs from 'fs'

import { getStorage, setStorage } from '../../core/storage'
import { ROUTES, MODAL_TYPES } from '../../core/constants'

import CloseButton from '../../components/CloseButton'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'

import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import Import from '../../assets/icons/import.svg'
import Add from '../../assets/icons/add.svg'
import WalletIcon from '../../assets/icons/wallet.svg'

import styles from './EditWallet.scss'

const { dialog } = require('electron').remote

type Props = {
  accounts: Array<Object>,
  saveAccount: ({ label: string, address: string }) => any,
  showSuccessNotification: Object => any,
  showErrorNotification: Object => any,
  setAccounts: (Array<Object>) => any,
  showModal: (modalType: string, modalProps: Object) => any
}

class EditWallet extends Component<Props> {
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
        shouldRenderInstructions={false}
        shouldRenderHeader={false}
        renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
        renderBackButton={() => <BackButton routeTo={ROUTES.WALLET_MANAGER} />}
      >
        <div> hello neon</div>
      </FullHeightPanel>
    )
  }
}

export default EditWallet
