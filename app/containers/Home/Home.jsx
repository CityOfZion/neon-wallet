// @flow
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LoginPrivateKey from '../LoginPrivateKey'
import LoginNep2 from '../LoginNep2'
import LoginLedgerNanoS from '../LoginLedgerNanoS'
import LoginLocalStorage from '../LoginLocalStorage'
import Button from '../../components/Button'
import SelectInput from '../../components/Inputs/SelectInput'
import styles from './Home.scss'
import neonLogo from '../../images/neon-logo-redesign.png'
import AddIcon from '../../assets/icons/add.svg'
import WalletIcon from '../../assets/icons/wallet.svg'
import { ROUTES } from '../../core/constants'

type State = {
  option: string
}

type Props = {}

const LOGIN_OPTIONS = {
  LOCAL_STORAGE: {
    render: () => <LoginLocalStorage />,
    display: 'Saved wallet'
  },
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
  }
}

class Home extends Component<Props, State> {
  state = {
    option: LOGIN_OPTIONS.LOCAL_STORAGE.display
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
    <div id="home" className={styles.homeContainer}>
      <div className={styles.innerHomeContainer}>
        <img className={styles.logo} src={neonLogo} />
        <div className={styles.loginText}>Login</div>

        <div className={styles.inputContainer}>
          <SelectInput
            className={styles.input}
            onChange={value => this.handleSelect(value)}
            value={this.state.option}
            readOnly
            items={this.options}
            getItemValue={item => item}
          />

          {this.renderLoginBasedOnOption(this.state.option)}

          <div className={styles.buttonRow}>
            <div className={styles.buttonContainer}>
              <Link to={ROUTES.CREATE_WALLET}>
                <Button renderIcon={AddIcon}>New Wallet</Button>
              </Link>
            </div>
            <div className={styles.buttonContainer}>
              <Button renderIcon={WalletIcon}>Wallet Manager</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

// // @flow
// import React from 'react'
// import classNames from 'classnames'
// import { Link } from 'react-router-dom'
//
// import { ROUTES } from '../../core/constants'
//
// import styles from './Home.scss'
//
// const Home = () => (
//   <div id='home'>
//     <Link to={ROUTES.LOGIN_LOCAL_STORAGE}>
//       <div className={classNames('linkBox', styles.linkBox)}>
//         Login using a saved wallet
//       </div>
//     </Link>
//     <Link to={ROUTES.LOGIN_NEP2}>
//       <div className={classNames('linkBox', styles.linkBox)}>
//         Login using an encrypted key
//       </div>
//     </Link>
//     <Link to={ROUTES.LOGIN_PRIVATE_KEY}>
//       <div className={classNames('linkBox', styles.linkBox)}>
//         Login using a private key
//       </div>
//     </Link>
//     <Link to={ROUTES.LOGIN_LEDGER_NANO_S}>
//       <div className={classNames('linkBox', styles.linkBox)}>
//         Login using a Ledger
//       </div>
//     </Link>
//     <Link to={ROUTES.CREATE_WALLET}>
//       <div className={classNames('linkBox', styles.linkBox, styles.linkBoxAlt)}>
//         Create a new wallet
//       </div>
//     </Link>
//     <Link to={ROUTES.ENCRYPT_KEY}>
//       <div className={classNames('linkBox', styles.linkBox, styles.linkBoxAlt)}>
//         Encrypt an existing key
//       </div>
//     </Link>
//     <Link to={ROUTES.SETTINGS}>
//       <div className={classNames('linkBox', styles.linkBox, styles.linkBoxAlt)}>
//         Manage Neon settings
//       </div>
//     </Link>
//   </div>
// )
//
// export default Home
