// @flow
import React, { Component } from 'react'
import { isNil } from 'lodash'
import Claim from '../Claim'
import MdSync from 'react-icons/lib/md/sync'
import QRCode from 'qrcode/lib/browser'
import { clipboard } from 'electron'
import Copy from 'react-icons/lib/md/content-copy'
import ReactTooltip from 'react-tooltip'
import { formatGAS, formatFiat } from '../../core/formatters'
import { ASSETS, CURRENCIES } from '../../core/constants'

type Props = {
  address: string,
  neo: number,
  net: NetworkType,
  gas: number,
  neoPrice: number,
  gasPrice: number,
  currencyCode: string,
  initiateGetBalance: Function,
  showInfoNotification: Function,
  showSuccessNotification: Function,
  showErrorNotification: Function
}

export default class WalletInfo extends Component<Props> {
  canvas: ?HTMLCanvasElement

  componentDidMount () {
    const { net, address } = this.props
    this.refreshBalance(net, address)
    QRCode.toCanvas(this.canvas, address, { version: 5 }, (err) => {
      if (err) console.log(err)
    })
  }

  // force sync with balance data
  refreshBalance = () => {
    const {
      showInfoNotification,
      showSuccessNotification,
      showErrorNotification,
      initiateGetBalance,
      net,
      address
    } = this.props
    showInfoNotification({ message: 'Retrieving blockchain information...' })
    initiateGetBalance(net, address).then((response) => {
      showSuccessNotification({ message: 'Received latest blockchain information.' })
    }).catch(() => {
      showErrorNotification({ message: 'Failed to retrieve blockchain information' })
    })
  }

  render () {
    const { address, neo, gas, neoPrice, gasPrice, currencyCode } = this.props
    if (isNil(address)) {
      return null
    }

    let neoValue = neoPrice && neo ? neoPrice * neo : 0
    let gasValue = gasPrice && gas ? gasPrice * gas : 0
    let totalValue = neoValue + gasValue

    const displayCurrencyCode = currencyCode.toUpperCase()
    const currencySymbol = CURRENCIES[currencyCode].symbol

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
            <div className='fiat neoWalletValue'>{currencySymbol}{formatFiat(neoValue)} {displayCurrencyCode}</div>
          </div>
          <div className='split'>
            <div className='label'>{ASSETS.GAS}</div>
            <div className='amountBig amountGas' data-tip data-for='gasBalanceTip'>{formatGAS(gas, true)}</div>
            <ReactTooltip class='solidTip' id='gasBalanceTip' place='bottom' type='dark' effect='solid' disable={gas === 0}>
              <span className='amountGasTooltip'>{formatGAS(gas)}</span>
            </ReactTooltip>
            <div className='fiat gasWalletValue'>{currencySymbol}{formatFiat(gasValue)} {displayCurrencyCode}</div>
          </div>
          <div className='fiat walletTotal'>Total {currencySymbol}{formatFiat(totalValue)} {displayCurrencyCode}</div>
          <div className='refreshBalance' onClick={this.refreshBalance} >
            <MdSync id='refresh' data-tip data-for='refreshBalanceTip' />
            <ReactTooltip class='solidTip' id='refreshBalanceTip' place='bottom' type='dark' effect='solid'>
              <span>Refresh account balance</span>
            </ReactTooltip>
          </div>
        </div>
        <div className='spacer' />
        <Claim />
        <div className='spacer' />
        <div className='qrCode'><canvas id='qrCanvas' ref={(node) => { this.canvas = node }} /></div>
      </div>
    )
  }
}
