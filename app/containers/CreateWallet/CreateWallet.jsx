// @flow
import React from 'react'

import PasswordInput from '../../components/Inputs/PasswordInput'
import HomeButtonLink from '../../components/HomeButtonLink'
import Button from '../../components/Button'
import styles from '../Home/Home.scss'
import neonLogo from '../../images/neon-logo-redesign.png'
import AddIcon from '../../assets/icons/add.svg'

type Props = {
  encryptWIF: boolean,
  generateNewWalletAccount: Function,
  history: Object
}

type State = {
  passphrase: string,
  passphrase2: string,
  wif: string
}

export default class EncryptKey extends React.Component<Props, State> {
  state = {
    passphrase: '',
    passphrase2: '',
    wif: ''
  }

  createWalletAccount = (e: SyntheticMouseEvent<*>) => {
    e.preventDefault()
    const { encryptWIF, history } = this.props
    const { passphrase, passphrase2, wif } = this.state
    const { generateNewWalletAccount } = this.props
    if (
      !generateNewWalletAccount(
        passphrase,
        passphrase2,
        encryptWIF ? wif : null,
        history
      )
    ) {
      // this.resetFields()
    }
  }

  resetFields () {
    this.setState({
      passphrase: '',
      passphrase2: '',
      wif: ''
    })
  }

  render () {
    const { encryptWIF } = this.props
    const { passphrase, passphrase2, wif } = this.state
    let disabledButton

    return (
      <div id="home" className={styles.homeContainer}>
        <div className={styles.innerHomeContainer}>
          <img className={styles.logo} src={neonLogo} />
          <div className={styles.inputContainer}>
            <div id="createWallet" className={styles.flexContainer}>
              <form onSubmit={this.createWalletAccount}>
                <div className={styles.inputMargin}>
                  <PasswordInput
                    value={passphrase}
                    onChange={e =>
                      this.setState({ passphrase: e.target.value })
                    }
                    placeholder="Enter passphrase here"
                    autoFocus
                  />
                </div>
                <div className={styles.inputMargin}>
                  <PasswordInput
                    value={passphrase2}
                    onChange={e =>
                      this.setState({ passphrase2: e.target.value })
                    }
                    placeholder="Enter passphrase again"
                  />
                  {encryptWIF && (
                    <PasswordInput
                      value={wif}
                      onChange={e => this.setState({ wif: e.target.value })}
                      placeholder="Enter existing WIF here"
                    />
                  )}
                </div>
                <Button
                  renderIcon={AddIcon}
                  type="submit"
                  primary
                  disabled={disabledButton}
                >
                  Create Wallet
                </Button>
                <HomeButtonLink />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
