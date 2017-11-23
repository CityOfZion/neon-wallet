// @flow
import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import SendDisplay from './SendDisplay'
import ConfirmDisplay from './ConfirmDisplay'
import { obtainTokenBalance, validateTransactionBeforeSending } from '../../../core/wallet'
import { ASSETS_LABELS } from '../../../core/constants'

type Props = {
    neo: number,
    gas: number,
    tokens: Array<Object>,
    showErrorNotification: Function,
    hideModal: Function,
    togglePane: Function,
    sendTransaction: Function,
}

const DISPLAY_MODES = {
  SEND: 'SEND',
  CONFIRM: 'CONFIRM'
}

class SendModal extends Component<Props> {
  canvas: ?HTMLCanvasElement
  state = {
    sendAmount: '',
    sendAddress: '',
    sendToken: ASSETS_LABELS.NEO,
    display: DISPLAY_MODES.SEND
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
      sendToken: ASSETS_LABELS.NEO,
      display: DISPLAY_MODES.SEND
    })
  }

  onChangeHandler = (name: string, value: number) => {
    this.setState({ [name]: value })
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
            width: '430px',
            height: '390px'
          }
        }}
      >
        {display === DISPLAY_MODES.SEND
          ? <SendDisplay
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
