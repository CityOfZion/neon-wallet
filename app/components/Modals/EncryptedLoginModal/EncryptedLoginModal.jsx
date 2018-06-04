// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
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
    errorMsg: ''
  }

  handleLoginSubmit (e) {
    e.preventDefault();
    const {onClick, hideModal} = this.props
    const {passphrase} = this.state

    onClick(passphrase)
    .then(hideModal)
    .catch(err => {
      this.setState({ errorMsg: err })
    })
  }

  render () {
    const { hideModal, title, text, width, height, onClick } = this.props
    const { errorMsg, passphrase } = this.state
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
              disabled={loginButtonDisabled}
            >Login</Button>
            <Button
              id='cancel'
              cancel
              onClick={hideModal}>Cancel</Button>
          </div>
        </form>
        <div className='errorMessage'>{errorMsg}</div>
      </BaseModal>
    )
  }
}

EncryptedLoginModal.defaultProps = {
  width: '450px',
  height: '225px'
}
