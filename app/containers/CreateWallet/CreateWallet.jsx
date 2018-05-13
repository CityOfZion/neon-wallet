// @flow

import React from 'react'
import { ROUTES } from '../../core/constants'

import PasswordInput from '../../components/Inputs/PasswordInput'
import TextInput from '../../components/Inputs/TextInput'
import BackButton from '../../components/BackButton'
import Button from '../../components/Button'
import AddIcon from '../../assets/icons/add.svg'
import HomeLayout from '../Home/HomeLayout'
import OptionButton from './OptionButton'
import styles from '../Home/Home.scss'

type Props = {
  generateNewWalletAccount: Function,
  history: Object
}

type State = {
  passphrase: string,
  passphrase2: string,
  wif: string,
  option: string,
  walletName: string
}

export default class CreateWallet extends React.Component<Props, State> {
  state = {
    passphrase: '',
    passphrase2: '',
    wif: '',
    walletName: '',
    option: 'CREATE'
  }

  createWalletAccount = (e: SyntheticMouseEvent<*>, options: Object) => {
    e.preventDefault()
    const { history } = this.props
    const { passphrase, passphrase2, wif, walletName, option } = this.state
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
    const { passphrase, passphrase2, wif, option, walletName } = this.state
    let disabledButton

    return (
      <HomeLayout
        renderNavigation={() => (
          <div className={styles.backButton}>
            <BackButton routeTo={ROUTES.HOME} />
          </div>
        )}
      >
        <div className={styles.inputContainer}>
          <div className={styles.createWalletOptionRow}>
            <OptionButton
              handleClick={() => this.setState({ option: 'CREATE' })}
              active={option === 'CREATE'}
            >
              CREATE NEW
            </OptionButton>

            <OptionButton
              handleClick={() => this.setState({ option: 'IMPORT' })}
              active={option === 'IMPORT'}
            >
              IMPORT EXISTING
            </OptionButton>
          </div>
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
                  placeholder="Enter passphrase here"
                />
              </div>
              <div className={styles.inputMargin}>
                <PasswordInput
                  value={passphrase2}
                  onChange={e => this.setState({ passphrase2: e.target.value })}
                  placeholder="Enter passphrase again"
                />
              </div>
              <Button
                renderIcon={AddIcon}
                className={styles.loginButtonMargin}
                type="submit"
                primary
                disabled={disabledButton}
              >
                {option === 'IMPORT' ? 'Import Wallet' : 'Create Wallet'}
              </Button>
            </form>
          </div>
        </div>
      </HomeLayout>
    )
  }
}
