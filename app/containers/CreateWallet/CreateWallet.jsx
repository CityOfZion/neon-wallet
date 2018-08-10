// @flow

import React from 'react'
import { ROUTES } from '../../core/constants'

import PasswordInput from '../../components/Inputs/PasswordInput'
import TextInput from '../../components/Inputs/TextInput'
import CloseButton from '../../components/CloseButton'
import Button from '../../components/Button'
import CheckIcon from '../../assets/icons/check.svg'
import AddIcon from '../../assets/icons/add.svg'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'
import styles from './CreateWallet.scss'

type Option = 'CREATE' | 'IMPORT'

type Props = {
  generateNewWalletAccount: Function,
  history: Object,
  option: Option
}

type State = {
  passphrase: string,
  passphrase2: string,
  wif: string,
  walletName: string
}

export default class CreateWallet extends React.Component<Props, State> {
  state = {
    passphrase: '',
    passphrase2: '',
    wif: '',
    walletName: ''
  }

  createWalletAccount = (e: SyntheticMouseEvent<*>) => {
    e.preventDefault()
    const { history, option } = this.props
    const { passphrase, passphrase2, wif, walletName } = this.state
    const { generateNewWalletAccount } = this.props
    generateNewWalletAccount(
      passphrase,
      passphrase2,
      option === 'IMPORT' ? wif : null,
      history,
      walletName
    )
  }

  render = () => {
    const { passphrase, passphrase2, wif, walletName } = this.state
    const { option } = this.props

    return (
      <FullHeightPanel
        headerText={option === 'CREATE' ? 'Create New Wallet' : 'Import Wallet'}
        renderHeaderIcon={() =>
          option === 'IMPORT' ? (
            <div className={styles.iconDisplay}>
              <CheckIcon />
            </div>
          ) : (
            <div className={styles.iconDisplay}>
              <AddIcon />
            </div>
          )
        }
        renderCloseButton={() => <CloseButton routeTo={ROUTES.HOME} />}
      >
        <div className={styles.inputContainer}>
          <div id="createWallet" className={styles.flexContainer}>
            <form onSubmit={this.createWalletAccount}>
              {option === 'IMPORT' && (
                <PasswordInput
                  value={wif}
                  label="Private Key"
                  onChange={e => this.setState({ wif: e.target.value })}
                  placeholder="Private Key"
                  autoFocus
                />
              )}
              <TextInput
                value={walletName}
                label="Wallet Name"
                onChange={e => this.setState({ walletName: e.target.value })}
                placeholder="Wallet Name"
                autoFocus={option !== 'IMPORT'}
              />
              <PasswordInput
                label="Passphrase"
                value={passphrase}
                onChange={e => this.setState({ passphrase: e.target.value })}
                placeholder="Password"
              />
              <PasswordInput
                label="Confirm Passphrase"
                value={passphrase2}
                onChange={e => this.setState({ passphrase2: e.target.value })}
                placeholder="Confirm Password"
              />
              <div className={styles.loginButtonMargin}>
                <Button
                  renderIcon={option === 'IMPORT' ? CheckIcon : AddIcon}
                  type="submit"
                  primary
                  disabled={this.isDisabled()}
                >
                  {option === 'IMPORT' ? 'Import Wallet' : 'Create Wallet'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </FullHeightPanel>
    )
  }

  isDisabled = () => {
    const { passphrase, passphrase2, wif, walletName } = this.state
    const { option } = this.props
    const validPassphrase = passphrase === passphrase2 && passphrase.length >= 4
    if (option === 'CREATE') {
      return !(validPassphrase && !!walletName)
    }
    return !(validPassphrase && !!walletName && !!wif)
  }
}
