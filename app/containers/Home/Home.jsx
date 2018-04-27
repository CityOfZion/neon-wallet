// @flow
import React, { Component } from 'react'

import Button from '../../components/Button/Button'
import TextInput from '../../components/Inputs/TextInput/TextInput'
import SelectInput from '../../components/Inputs/SelectInput/SelectInput'
import styles from './Home.scss'
import neonLogo from '../../images/neon-logo-redesign.png'
// Icons
import Login from '../../images/icons/Login.svg'
import Plus from '../../images/icons/Plus.svg'
import Wallet from '../../images/icons/Wallet.svg'

type State = {
  option: string,
  password: string
}

type Props = {
  loginWithPrivateKey: Function
}

class Home extends Component<Props, State> {
  state = {
    option: 'Private Key',
    password: ''
  }

  handleSelect = (option: string) => this.setState({ option })

  handleSubmit = () => {
    const { loginWithPrivateKey } = this.props
    switch (this.state.option) {
      case 'Private Key':
        return loginWithPrivateKey(this.state.password)
      default:
        console.log('foo')
    }
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
            items={['Private Key']}
            renderItem={() => undefined}
            renderAfter={() => undefined}
            getItemValue={() => undefined}
            getSearchResults={() => undefined}
          />

          <TextInput
            className={styles.input}
            onChange={(e: Object) =>
              this.setState({ password: e.target.value })
            }
            placeholder="Password"
            type="password"
          />

          <Button
            renderIcon={() => <Login />}
            icon="login"
            style={{ marginTop: 20 }}
            onClick={() => this.handleSubmit()}
          >
            Login
          </Button>

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
