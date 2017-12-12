// @flow
import React, { Component } from 'react'

import BaseModal from '../BaseModal'
import SendDisplay from './SendDisplay'
import ConfirmDisplay from './ConfirmDisplay'

import { obtainTokenBalance, isToken, validateTransactionBeforeSending } from '../../../core/wallet'
import { ASSETS } from '../../../core/constants'

const DISPLAY_MODES = {
  SEND: 'SEND',
  CONFIRM: 'CONFIRM'
}

type Props = {
  NEO: number,
  GAS: number,
  tokens: Object,
  showErrorNotification: Function,
  hideModal: Function,
  sendTransaction: Function,
  explorer: ExplorerType,
  net: NetworkType,
  address: string,
  isHardwareLogin: boolean,
}

type State = {
  sendAmount: ?number,
  sendAdress: ?string,
  symbol: string,
  display: $Values<typeof DISPLAY_MODES>,
  balance: number
}

class SendModal extends Component<Props, State> {
  canvas: ?HTMLCanvasElement
  state = {
    sendAmount: '',
    sendAddress: '',
    symbol: ASSETS.NEO,
    display: DISPLAY_MODES.SEND,
    balance: this.props.NEO
  }

  openAndValidate = () => {
    const { NEO, GAS, tokens, showErrorNotification } = this.props
    const { sendAddress, sendAmount, symbol } = this.state
    const tokenBalance = isToken(symbol) && obtainTokenBalance(tokens, symbol)
    const { error, valid } = validateTransactionBeforeSending(NEO, GAS, tokenBalance, symbol, sendAddress, sendAmount)
    if (valid) {
      this.setState({ display: DISPLAY_MODES.CONFIRM })
    } else {
      showErrorNotification({ message: error })
    }
  }

  confirmTransaction = () => {
    const { sendTransaction, hideModal } = this.props
    const { sendAddress, sendAmount, symbol } = this.state
    sendTransaction(sendAddress, sendAmount, symbol).then(() => {
      hideModal()
    })
  }

  cancelTransaction = () => {
    this.setState({
      display: DISPLAY_MODES.SEND
    })
  }

  getBalance = (symbol: string) => {
    const { NEO, GAS, tokens } = this.props

    if (symbol === ASSETS.NEO) {
      return NEO
    } else if (symbol === ASSETS.GAS) {
      return GAS
    } else {
      return obtainTokenBalance(tokens, symbol)
    }
  }

  onChangeHandler = (name: string, value: string, updateBalance: false) => {
    let newState = {
      [name]: value
    }
    if (updateBalance) {
      newState = {
        ...newState,
        sendAmount: '',
        balance: this.getBalance(value)
      }
    }
    this.setState(newState)
  }

  render () {
    const { hideModal, tokens, explorer, net, address, isHardwareLogin } = this.props
    const { display } = this.state

    return (
      <BaseModal
        title='Send'
        hideModal={hideModal}
        style={{
          content: {
            width: '480px',
            height: '410px'
          }
        }}
      >
        {display === DISPLAY_MODES.SEND
          ? <SendDisplay
            openAndValidate={this.openAndValidate}
            getBalanceForSymbol={this.getBalanceForSymbol}
            onChangeHandler={this.onChangeHandler}
            tokens={tokens}
            isHardwareLogin={isHardwareLogin}
            {...this.state}
          />
          : <ConfirmDisplay
            confirmTransaction={this.confirmTransaction}
            cancelTransaction={this.cancelTransaction}
            explorer={explorer}
            net={net}
            address={address}
            {...this.state}
          />}
      </BaseModal>
    )
  }
}

export default SendModal
