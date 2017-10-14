import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isNil } from 'lodash'
import Claim from './Claim.js'
import MdSync from 'react-icons/lib/md/sync'
import QRCode from 'qrcode'
import { initiateGetBalance } from '../components/NetworkSwitch'
import { sendEvent, clearTransactionEvent } from '../modules/transactions'
import { clipboard } from 'electron'
import Copy from 'react-icons/lib/md/content-copy'
import ReactTooltip from 'react-tooltip'

// force sync with balance data
const refreshBalance = (dispatch, net, address) => {
  dispatch(sendEvent(true, 'Refreshing...'))
  initiateGetBalance(dispatch, net, address).then((response) => {
    dispatch(sendEvent(true, 'Received latest blockchain information.'))
    setTimeout(() => dispatch(clearTransactionEvent()), 1000)
  })
}

let WalletInfo = class WalletInfo extends Component {
  componentDidMount () {
    const { dispatch, net, address } = this.props
    initiateGetBalance(dispatch, net, address)
    QRCode.toCanvas(this.canvas, address, { version: 5 }, (err) => {
      if (err) console.log(err)
    })
  }

  render () {
    const { address, neo, net, dispatch, price } = this.props
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
            <div className='label'>NEO</div>
            <div className='amountBig amountNeo'>{neo}</div>
          </div>
          <div className='split'>
            <div className='label'>GAS</div>
            <div className='amountBig amountGas'>{this.props.gas}</div>
          </div>
          <div className='refreshBalance' onClick={() => refreshBalance(dispatch, net, address)} >
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

const mapStateToProps = (state) => ({
  neo: state.wallet.Neo,
  gas: state.wallet.Gas,
  address: state.account.address,
  net: state.metadata.network,
  price: state.wallet.price
})

WalletInfo.propTypes = {
  dispatch: PropTypes.func.isRequired,
  address: PropTypes.string,
  neo: PropTypes.number,
  net: PropTypes.string,
  gas: PropTypes.string,
  price: PropTypes.string
}

WalletInfo = connect(mapStateToProps)(WalletInfo)

export default WalletInfo
