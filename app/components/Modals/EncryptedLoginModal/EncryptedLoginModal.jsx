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
  label: string,
  encryptedWIF: string,
  hideModal: Function,
  width: string,
  height: string,
  onClick: Function
}

type State = {
  passphrase: string,
  errorMsg: string
}

export default class EncryptedLoginModal extends Component<Props, State> {
  state = {
    passphrase: '',
    errorMsg: '',
    pendingLogin: false,
  }

  handleLoginSubmit (e) {
    e.preventDefault();
    const {onClick, hideModal} = this.props
    const {passphrase} = this.state
    this.setState({ pendingLogin: true })

    // Run on separate thread so that state change can pass through
    setTimeout(() => {
      onClick(passphrase)
      .then(hideModal)
      .catch(err => {
        this.setState({
          errorMsg: err,
          pendingLogin: false
        })
      })
    }, 100)
  }

  render () {
    const { hideModal, title, text, width, height, onClick } = this.props
    const { errorMsg, passphrase, pendingLogin } = this.state
    const loginButtonDisabled = passphrase == ''
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
        <form onSubmit={handleLoginSubmit.bind(this)}>
          <div className={styles.modalFooter}>
            <PasswordField
              placeholder='Enter your passphrase here'
              onChange={(e) => this.setState({ passphrase: e.target.value })}
              autoFocus
            />
            <Button
              type='submit'
              disabled={loginButtonDisabled || pendingLogin}
            >Login</Button>
            <Button
              id='cancel'
              cancel
              disabled={pendingLogin}
              onClick={hideModal}>Cancel</Button>
          </div>
        </form>
        {pendingLogin && <Loader />}
        <div className={styles.errorMessage}>{errorMsg}</div>
      </BaseModal>
    )
  }
}

EncryptedLoginModal.defaultProps = {
  width: '450px',
  height: '225px'
}
