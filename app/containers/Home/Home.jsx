// @flow
import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import SelectInput from '../../components/Inputs/SelectInput/SelectInput'
import styles from './Home.scss'
import neonLogo from '../../images/neon-logo-redesign.png'
import LoginPrivateKey from '../LoginPrivateKey'
import LoginNep2 from '../LoginNep2'
import LoginLedgerNanoS from '../LoginLedgerNanoS'
import LoginLocalStorage from '../LoginLocalStorage'
import Plus from '../../images/icons/Plus.svg'
import Wallet from '../../images/icons/Wallet.svg'

type State = {
  option: string
}

type Props = {}

const LOGIN_OPTIONS = {
  PRIVATE_KEY: {
    render: () => <LoginPrivateKey />,
    display: 'Private key'
  },
  NEP2: {
    render: () => <LoginNep2 />,
    display: 'Encrypted key'
  },
  LEDGER: {
    render: () => <LoginLedgerNanoS />,
    display: 'Ledger Nano S'
  },
  LOCAL_STORAGE: {
    render: () => <LoginLocalStorage />,
    display: 'Saved wallet'
  }
}

class Home extends Component<Props, State> {
  state = {
    option: LOGIN_OPTIONS.PRIVATE_KEY.display
  }

  options = Object.keys(LOGIN_OPTIONS).map(
    (key: string) => LOGIN_OPTIONS[key].display
  )

  handleSelect = (display: string) => this.setState({ option: display })

  renderLoginBasedOnOption = (display: string) => {
    const selectedOption = Object.values(LOGIN_OPTIONS).find(
      (option: mixed) => {
        return (
          option && typeof option === 'object' && option.display === display
        )
      }
    )
    if (selectedOption && typeof selectedOption.render === 'function') {
      return selectedOption.render()
    }
    return console.warn(
      'renderLoginBasedOnOption() invoked with invalid display value!'
    )
  }

  render = () => (
    <div id="home" className={styles.home}>
      <div className={styles.loginContainer}>
        <img className={styles.logo} src={neonLogo} />
        <div className={styles.loginText}>Login</div>

        <div className={styles.inputContainer}>
          <SelectInput
            className={styles.input}
            onChange={value => this.handleSelect(value)}
            value={this.state.option}
            items={this.options}
            getItemValue={item => item}
          />

          {this.renderLoginBasedOnOption(this.state.option)}

          <div className={styles.buttonRow}>
            <div style={{ flex: 0.45 }}>
              <Button renderIcon={() => <Plus />}>New Wallet</Button>
            </div>
            <div style={{ flex: 0.45 }}>
              <Button renderIcon={() => <Wallet />}>Wallet Manager</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
