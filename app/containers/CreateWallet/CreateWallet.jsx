// @flow

import React from 'react'
import { ROUTES } from '../../core/constants'

import PasswordInput from '../../components/Inputs/PasswordInput'
import TextInput from '../../components/Inputs/TextInput'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import AddIcon from '../../assets/icons/add.svg'
import HomeLayout from '../Home/HomeLayout'
import styles from '../Home/Home.scss'

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
      <HomeLayout
        headerText={
          option === 'CREATE' ? 'Create a new wallet' : 'Import wallet'
        }
        excludeLogoText
        headerTextUnderline
        renderNavigation={() => (
          <div className={styles.backButton}>
            <BackButton routeTo={ROUTES.HOME} />
          </div>
        )}
      >
        <div className={styles.inputContainer}>
          <div id="createWallet" className={styles.flexContainer}>
            <form onSubmit={this.createWalletAccount}>
              {option === 'IMPORT' && (
                <div className={styles.inputMargin}>
                  <PasswordInput
                    value={wif}
                    onChange={e => this.setState({ wif: e.target.value })}
                    placeholder="Private Key"
                    autoFocus
                  />
                </div>
              )}
              <div className={styles.inputMargin}>
                <TextInput
                  value={walletName}
                  onChange={e => this.setState({ walletName: e.target.value })}
                  placeholder="Wallet Name"
                  autoFocus
                />
              </div>
              <div className={styles.inputMargin}>
                <PasswordInput
                  value={passphrase}
                  onChange={e => this.setState({ passphrase: e.target.value })}
                  placeholder="Password"
                />
              </div>
              <div className={styles.inputMargin}>
                <PasswordInput
                  value={passphrase2}
                  onChange={e => this.setState({ passphrase2: e.target.value })}
                  placeholder="Confirm Password"
                />
              </div>
              <Button
                renderIcon={AddIcon}
                className={styles.loginButtonMargin}
                type="submit"
                primary
                disabled={this.isDisabled()}
              >
                {option === 'IMPORT' ? 'Import Wallet' : 'Create Wallet'}
              </Button>
            </form>
          </div>
        </div>
      </HomeLayout>
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
