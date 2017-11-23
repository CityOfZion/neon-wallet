// @flow
import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import SendDisplay from './SendDisplay'
import ConfirmDisplay from './ConfirmDisplay'
import { obtainTokenBalance, validateTransactionBeforeSending } from '../../../core/wallet'

type Props = {
    neo: number,
    gas: number,
    tokens: Array<Object>,
    showErrorNotification: Function,
    hideModal: Function,
    togglePane: Function,
    sendTransaction: Function,
}

class SendModal extends Component<Props> {
  canvas: ?HTMLCanvasElement
  state = {
    sendAmount: '',
    sendAddress: '',
    sendToken: 'Neo',
    display: 'send'
  }

  // open confirm pane and validate fields
  openAndValidate = () => {
    const { neo, gas, tokens, showErrorNotification } = this.props
    const { sendAddress, sendAmount, sendToken } = this.state
    const tokenBalance = obtainTokenBalance(tokens, sendToken)
    const { error, valid } = validateTransactionBeforeSending(neo, gas, tokenBalance, sendToken, sendAddress, sendAmount)
    if (valid) {
      this.setState({ display: 'confirm' })
    } else {
      showErrorNotification({ message: error })
    }
  }

  confirmTransaction = () => {
    const { sendTransaction, hideModal } = this.props
    const { sendAddress, sendAmount, sendToken } = this.state
    sendTransaction(sendAddress, sendAmount, sendToken).then(() => {
      this.resetForm()
      hideModal()
    })
  }

  cancelTransaction = () => {
    this.resetForm()
  }

  resetForm = () => {
    this.setState({
      sendAmount: '',
      sendAddress: '',
      sendToken: 'Neo',
      display: 'send'
    })
  }

  onChangeHandler = (name, e) => {
    this.setState({ [name]: e.target.value })
  }

  render () {
    const { hideModal, tokens } = this.props
    const { display } = this.state

    return (
      <BaseModal
        title='Send'
        hideModal={hideModal}
        style={{
          content: {
            width: '420px',
            height: '390px'
          }
        }}
      >
        {display === 'send' ? <SendDisplay
          openAndValidate={this.openAndValidate}
          onChangeHandler={this.onChangeHandler}
          tokens={tokens}
          {...this.state}
        />
          : <ConfirmDisplay
            confirmTransaction={this.confirmTransaction}
            cancelTransaction={this.cancelTransaction}
            {...this.state}
          />}
      </BaseModal>
    )
  }
}

export default SendModal
