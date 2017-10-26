// @flow
import React, { Component } from 'react'
import { isNil } from 'lodash'
import Claim from '../../components/Claim.js'
import MdSync from 'react-icons/lib/md/sync'
import QRCode from 'qrcode/lib/browser'
import { clipboard } from 'electron'
import Copy from 'react-icons/lib/md/content-copy'
import ReactTooltip from 'react-tooltip'
import { formatGAS } from '../../core/formatters'
import { ASSETS } from '../../core/constants'

type Props = {
  address: string,
  neo: number,
  net: NetworkType,
  gas: number,
  price: number,
  initiateGetBalance: Function,
  sendEvent: Function,
  clearTransactionEvent: Function
}

export default class WalletInfo extends Component<Props> {
  canvas: ?HTMLCanvasElement

  componentDidMount () {
    const { initiateGetBalance, net, address } = this.props
    initiateGetBalance(net, address)
    QRCode.toCanvas(this.canvas, address, { version: 5 }, (err) => {
      if (err) console.log(err)
    })
  }

  // force sync with balance data
  refreshBalance = () => {
    const { sendEvent, initiateGetBalance, clearTransactionEvent, net, address } = this.props
    sendEvent(true, 'Refreshing...')
    initiateGetBalance(net, address).then((response) => {
      sendEvent(true, 'Received latest blockchain information.')
      setTimeout(() => clearTransactionEvent(), 1000)
    })
  }

  render () {
    const { address, neo, gas, price } = this.props
    if (isNil(address)) {
      return null
    }
    return (
      <div id='accountInfo'>
        <div className='label'>Your Public Neo Address:</div>
        <div className='address'>
          {address}
          <span className='copyKey' onClick={() => clipboard.writeText(address)}><Copy data-tip data-for='copyAddressTip' /></span>
        </div>
        <ReactTooltip class='solidTip' id='copyAddressTip' place='bottom' type='dark' effect='solid'>
          <span>Copy Public Address</span>
        </ReactTooltip>
        <div className='spacer' />
        <div id='balance'>
          <div className='split'>
            <div className='label'>{ASSETS.NEO}</div>
            <div className='amountBig amountNeo'>{neo}</div>
          </div>
          <div className='split'>
            <div className='label'>{ASSETS.GAS}</div>
            <div className='amountBig amountGas'>{formatGAS(gas)}</div>
          </div>
          <div className='refreshBalance' onClick={this.refreshBalance} >
            <MdSync id='refresh' data-tip data-for='refreshBalanceTip' />
            <ReactTooltip class='solidTip' id='refreshBalanceTip' place='bottom' type='dark' effect='solid'>
              <span>Refresh account balance</span>
            </ReactTooltip>
          </div>

          <div className='fiat'>US {price}</div>
        </div>
        <div className='spacer' />
        <Claim />
        <div className='spacer' />
        <div className='qrCode'><canvas id='qrCanvas' ref={(node) => { this.canvas = node }} /></div>
      </div>
    )
  }
}
