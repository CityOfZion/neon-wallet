// @flow
import React, { Component } from 'react'
import { Link } from 'react-router'
import storage from 'electron-json-storage'
import { map } from 'lodash'
import FaEye from 'react-icons/lib/fa/eye'
import FaEyeSlash from 'react-icons/lib/fa/eye-slash'
import Page from '../../components/Page'
import { ROUTES } from '../../core/constants'

type Props = {
  setKeys: Function,
  loginNep2: Function,
  history: Object,
  accountKeys: Object
}

type State = {
  showKey: boolean,
  passphrase: string,
  wif: string,
}

export default class LoginLocalStorage extends Component<Props, State> {
  state = {
    showKey: false,
    passphrase: '',
    wif: ''
  }

  componentDidMount () {
    const { setKeys } = this.props
    // eslint-disable-next-line
    storage.get('keys', (error, data) => {
      setKeys(data)
    })
  }

  toggleKeyVisibility = () => {
    this.setState(prevState => ({
      showKey: !prevState.showKey
    }))
  }

  render () {
    const { accountKeys, history, loginNep2 } = this.props
    const { showKey, passphrase, wif } = this.state
    const loginButtonDisabled = Object.keys(accountKeys).length === 0 || wif === '' || passphrase === ''

    return (
      <Page id='loginPage'>
        <div className='login'>
          <div className='loginForm'>
            <input
              type={showKey ? 'text' : 'password'}
              placeholder='Enter your passphrase here'
              value={passphrase}
              onChange={(e) => this.setState({ passphrase: e.target.value })}
              autoFocus
            />

            {showKey
              ? <FaEyeSlash className='viewKey' onClick={this.toggleKeyVisibility} />
              : <FaEye className='viewKey' onClick={this.toggleKeyVisibility} />
            }

            <div className='selectBox'>
              <label>Wallet:</label>
              <select value={wif} onChange={(e) => this.setState({ wif: e.target.value })}>
                <option value=''>Select a wallet</option>
                {map(accountKeys, (value, key) => <option value={value} key={`wallet${key}`}>{key}</option>)}
              </select>
            </div>
          </div>
          <div className='loginButtons'>
            <button
              className={loginButtonDisabled && 'disabled'}
              onClick={() => loginNep2(passphrase, wif, history)}
              disabled={loginButtonDisabled}>Login</button>
            <Link to={ROUTES.HOME}><button className='altButton'>Home</button></Link>
          </div>
        </div>
      </Page>
    )
  }
}
