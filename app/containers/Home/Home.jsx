// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import LoginPrivateKey from '../LoginPrivateKey'
import LoginNep2 from '../LoginNep2'
import LoginLedgerNanoS from '../LoginLedgerNanoS'
import LoginLocalStorage from '../LoginLocalStorage'
import Button from '../../components/Button'
import SelectInput from '../../components/Inputs/SelectInput'
import styles from './Home.scss'
import AddIcon from '../../assets/icons/add.svg'
import WalletIcon from '../../assets/icons/wallet.svg'
import { ROUTES } from '../../core/constants'
import HomeLayout from './HomeLayout'

type State = {
  option: string
}

type Props = {
  loading: boolean
}

const LOGIN_OPTIONS = {
  LOCAL_STORAGE: {
    render: () => <LoginLocalStorage />,
    display: 'Saved Wallet'
  },
  PRIVATE_KEY: {
    render: () => <LoginPrivateKey />,
    display: 'Private Key'
  },
  NEP2: {
    render: () => <LoginNep2 />,
    display: 'Encrypted Key'
  },
  ledger: {
    render: () => <LoginLedgerNanoS />,
    display: 'Ledger Nano S'
  }
}

export default class Home extends React.Component<Props, State> {
  state = {
    option: LOGIN_OPTIONS.LOCAL_STORAGE.display
  }

  options = Object.keys(LOGIN_OPTIONS).map(
    (key: string) => LOGIN_OPTIONS[key].display
  )

  handleSelect = (display: string) => this.setState({ option: display })

  renderLoginBasedOnOption = (display: string) => {
    const selectedOption = Object.values(LOGIN_OPTIONS).find(
      (option: mixed) =>
        option && typeof option === 'object' && option.display === display
    )
    if (selectedOption && typeof selectedOption.render === 'function') {
      return selectedOption.render()
    }
    return console.warn(
      'renderLoginBasedOnOption() invoked with invalid display value!'
    )
  }

  render = () => {
    const { loading } = this.props
    return (
      <HomeLayout>
        <div className={styles.inputContainer}>
          <SelectInput
            className={styles.input}
            onChange={value => this.handleSelect(value)}
            value={this.state.option}
            readOnly
            disabled={loading}
            items={this.options}
            getItemValue={item => item}
          />

          {this.renderLoginBasedOnOption(this.state.option)}

          <div className={styles.buttonRow}>
            <div className={styles.buttonContainer}>
              <Link to={ROUTES.CREATE_WALLET}>
                <Button disabled={loading} renderIcon={AddIcon}>
                  New Wallet
                </Button>
              </Link>
            </div>
            <div className={styles.buttonContainer}>
              <Link to={ROUTES.WALLET_MANAGER}>
                <Button disabled={loading} renderIcon={WalletIcon}>
                  Wallet Manager
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </HomeLayout>
    )
  }
}
