// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import Loader from '../../Loader'
import styles from './EncryptedLoginModal.scss'
import PasswordField from '../../PasswordField'

type Props = {
  title: string,
  text: string,
  hideModal: Function,
  width: string,
  height: string,
  onClick: Function
}

type State = {
  passphrase: string,
  errorMsg: string,
  pendingLogin: boolean
}

export default class EncryptedLoginModal extends Component<Props, State> {
  static defaultProps = {
    width: '450px',
    height: '225px'
  }

  state = {
    passphrase: '',
    errorMsg: '',
    pendingLogin: false
  }

  handleLoginSubmit: Function

  componentWillMount () {
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  handleLoginSubmit (e: Object) {
    e.preventDefault()
    const {onClick, hideModal} = this.props
    const {passphrase} = this.state
    this.setState({ pendingLogin: true })

    // Run on separate thread so that state change can pass through
    setTimeout(() => {
      onClick(passphrase)
        .then(hideModal)
        .catch(err => {
          this.setState({
            errorMsg: err && err.message,
            pendingLogin: false
          })
        })
    }, 100)
  }

  render () {
    const { hideModal, title, text, width, height } = this.props
    const { errorMsg, passphrase, pendingLogin } = this.state
    const loginButtonDisabled = passphrase === ''
    const { handleLoginSubmit } = this

    return (
      <BaseModal
        title={title}
        hideModal={hideModal}
        style={{
          content: {
            width,
            height
          }
        }}
      >
        <div className={styles.textContainer}>
          <strong className={styles.text}>{text}</strong>
        </div>
        <form onSubmit={handleLoginSubmit}>
          <div className={styles.modalFooter}>
            <PasswordField
              placeholder='Enter your passphrase here'
              onChange={(e) => this.setState({ passphrase: e.target.value })}
              autoFocus
            />
            <Button
              type='submit'
              disabled={loginButtonDisabled || pendingLogin}
            >Authenticate</Button>
            <Button
              id='cancel'
              cancel
              disabled={pendingLogin}
              onClick={hideModal}>Cancel</Button>
            <div className={styles.errorMessage}>{errorMsg}</div>
          </div>
        </form>
        {pendingLogin && <Loader />}
      </BaseModal>
    )
  }
}
