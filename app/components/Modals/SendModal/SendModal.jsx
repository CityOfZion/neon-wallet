// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import SendDisplay from './SendDisplay'
import ConfirmDisplay from './ConfirmDisplay'

import { obtainTokenBalance, validateTransactionBeforeSending } from '../../../core/wallet'
import { ASSETS } from '../../../core/constants'

type Props = {
    neo: number,
    gas: number,
    tokens: Array<TokenType>,
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
    symbol: ASSETS.NEO,
    display: DISPLAY_MODES.SEND,
    balance: this.props.neo
  }

  openAndValidate = () => {
    const { neo, gas, tokens, showErrorNotification } = this.props
    const { sendAddress, sendAmount, symbol } = this.state
    const tokenBalance = obtainTokenBalance(tokens, symbol)
    const { error, valid } = validateTransactionBeforeSending(neo, gas, tokenBalance, symbol, sendAddress, sendAmount)
    if (valid) {
      this.setState({ display: 'confirm', balance: this.getBalance(neo, gas, tokenBalance) })
    } else {
      showErrorNotification({ message: error })
    }
  }

  confirmTransaction = () => {
    const { sendTransaction, hideModal } = this.props
    const { sendAddress, sendAmount, symbol } = this.state
    sendTransaction(sendAddress, sendAmount, symbol).then(() => {
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
      symbol: ASSETS.NEO,
      display: DISPLAY_MODES.SEND
    })
  }

  getBalance = (neo: number, gas: number, tokenBalance: number) => {
    const { symbol } = this.states

    if (symbol === ASSETS.NEO) {
      return neo
    } else if (symbol === ASSETS.GAS) {
      return gas
    } else {
      return tokenBalance
    }
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
            getBalanceForSymbol={this.getBalanceForSymbol}
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
