// @flow
import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import SelectInput from '../../components/Inputs/SelectInput/SelectInput'
import styles from './Home.scss'
import neonLogo from '../../images/neon-logo-redesign.png'
// Icons
import Plus from '../../images/icons/Plus.svg'
import Wallet from '../../images/icons/Wallet.svg'

import LoginPrivateKey from '../LoginPrivateKey/index'

type State = {
  option: string
}

type Props = {}

const LOGIN_OPTIONS = {
  PRIVATE_KEY: {
    render: () => <LoginPrivateKey />,
    displayValue: 'Private Key'
  }
}

class Home extends Component<Props, State> {
  state = {
    option: LOGIN_OPTIONS.PRIVATE_KEY.displayValue
  }

  options = Object.keys(LOGIN_OPTIONS).map(
    (key: string) => LOGIN_OPTIONS[key].displayValue
  )

  handleSelect = (displayValue: string) =>
    this.setState({ option: displayValue })

  returnComponentBasedOnOption = (displayValue: string) => {
    const selectedOption = Object.values(LOGIN_OPTIONS).find(
      (option: mixed) => {
        return (
          option &&
          typeof option === 'object' &&
          option.displayValue === displayValue
        )
      }
    )
    if (selectedOption && typeof selectedOption.render === 'function') {
      return selectedOption.render()
    }
    return console.warn(
      'returnComponentBasedOnOption() invoked with invalid display value!'
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
            getItemValue={() => this.state.option}
          />

          {this.returnComponentBasedOnOption(this.state.option)}

          <div className={styles.buttonRow}>
            <div style={{ flex: 0.45 }}>
              <Button primary renderIcon={() => <Plus />}>
                New Wallet
              </Button>
            </div>
            <div style={{ flex: 0.45 }}>
              <Button primary renderIcon={() => <Wallet />}>
                Wallet Manager
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
