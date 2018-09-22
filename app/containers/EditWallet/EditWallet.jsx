// @flow
import React, { Component } from 'react'
import { reject } from 'lodash-es'

import { getStorage, setStorage } from '../../core/storage'
import { ROUTES, MODAL_TYPES } from '../../core/constants'

import CloseButton from '../../components/CloseButton'
import BackButton from '../../components/BackButton'
import TextInput from '../../components/Inputs/TextInput'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import EditIcon from '../../assets/icons/edit.svg'
import Close from '../../assets/icons/close.svg'
import CheckIcon from '../../assets/icons/check.svg'
import Button from '../../components/Button'

import styles from './EditWallet.scss'

type Props = {
  saveAccount: ({ label: string, address: string }) => any,
  showSuccessNotification: Object => any,
  showErrorNotification: Object => any,
  setAccounts: (Array<Object>) => any,
  showModal: (modalType: string, modalProps: Object) => any,
  match: Object,
  address: string,
  history: Object
}

type State = {
  walletName: string
}

class EditWallet extends Component<Props, State> {
  state = {
    walletName: this.props.match.params.label
  }

  render() {
    const { saveAccount, address } = this.props
    const { key } = this.props.match.params
    const { walletName } = this.state
    const isCurrentAddress = address === key
    return (
      <FullHeightPanel
        headerText="Edit Wallet"
        renderInstructions={() => (
          <div className={styles.editWalletInstructions}>
            <div>Modify Details</div>
            {!isCurrentAddress && (
              <span onClick={this.deleteWalletAccount}>
                <Close /> Remove Wallet
              </span>
            )}
          </div>
        )}
        renderHeaderIcon={() => <EditIcon />}
        renderCloseButton={() => <CloseButton routeTo={ROUTES.DASHBOARD} />}
        renderBackButton={() => <BackButton routeTo={ROUTES.WALLET_MANAGER} />}
      >
        <div className={styles.inputContainer}>
          <TextInput
            value={walletName}
            label="Wallet Name"
            onChange={e => this.setState({ walletName: e.target.value })}
            placeholder="Wallet Name"
          />
          <TextInput value={key} label="Wallet Address" disabled />
        </div>
        <Button
          renderIcon={() => <CheckIcon />}
          className={styles.buttonMargin}
          type="submit"
          primary
          onClick={() =>
            saveAccount({ label: this.state.walletName, address: key })
          }
          disabled={this.isDisabled()}
        >
          Save Changes
        </Button>
      </FullHeightPanel>
    )
  }

  isDisabled = () => {
    const { label } = this.props.match.params
    const { walletName } = this.state
    if (walletName.length && walletName !== label) {
      return false
    }
    return true
  }

  deleteWalletAccount = () => {
    const {
      showSuccessNotification,
      showErrorNotification,
      setAccounts,
      showModal,
      history
    } = this.props

    const { label, key } = this.props.match.params

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
          data.accounts = reject(data.accounts, { address: key })
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
          history.goBack()
        }
      }
    })
  }
}

export default EditWallet
