// @flow
import React from 'react'
import classNames from 'classnames'
// import QRCode from 'qrcode/lib/browser'
import NeoQR from 'neo-qrcode'

import Panel from '../../Panel'
import AssetInput from '../../Inputs/AssetInput'
import NumberInput from '../../Inputs/NumberInput'
import CopyToClipboard from '../../CopyToClipboard'
import { Address } from '../../Blockchain'
import { TOKENS } from '../../../core/constants'
import { COIN_DECIMAL_LENGTH } from '../../../core/formatters'

import styles from './ReceivePanel.scss'

type Props = {
  className: ?string,
  address: string
}

type State = {
  asset: ?string,
  amount: ?number
}

export default class ReceivePanel extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
    asset: null,
    amount: 0
  }

  render () {
    const { className, address } = this.props
    const { asset, amount } = this.state
    const symbols = ['-', 'NEO', 'GAS', ...Object.keys(TOKENS)]

    return (
      <Panel className={classNames(styles.receivePanel, className)} renderHeader={this.renderHeader}>
        <div className={styles.qrcode}>
          <img ref={this.registerRef} />
        </div>
        <div>
          <div className={styles.address}>
            <Address className={styles.link} address={address} />
            <CopyToClipboard className={styles.copy} text={address} tooltip="Copy Public Address" />
          </div>
          <div className={styles.amountContainer}>
            <AssetInput
              symbols={symbols}
              value={asset}
              className={styles.asset}
              onChange={value => this.setState({asset: value})}
            />
            <NumberInput
              value={amount}
              placeholder="Amount"
              className={styles.amount}
              options={{ numeralDecimalScale: COIN_DECIMAL_LENGTH }}
              onChange={value => this.setState({amount: value})} />
          </div>
        </div>
      </Panel>
    )
  }

  renderHeader = () => {
    return <span>Your Public NEO Address</span>
  }

  // $FlowFixMe
  registerRef = (el: HTMLImageElement) => {
    this.image = el
  }

  componentDidMount () {
    const { address } = this.props
    const { asset, amount } = this.state
    this.updateQRCode({address, asset, amount})
  }

  componentDidUpdate (prevProps: Props, prevState: State) {
    const { address } = this.props
    const { asset, amount } = this.state

    const assetChanged = prevState.asset !== asset
    const amountChanged = prevState.amount !== amount

    if (assetChanged || amountChanged) {
      let convertedAsset
      if (asset === 'NEO' || asset === 'GAS') {
        convertedAsset = asset
      } else if (asset) {
        convertedAsset = TOKENS[asset]
      }

      this.updateQRCode({address, asset: convertedAsset, amount})
    }
  }

  updateQRCode (options: Object) {
    const qrCode = new NeoQR(options, 250)
    qrCode.toDataURL()
      .then(imgData => {
        if (this.image) {
          this.image.src = imgData
        }
      })
  }

  getSymbols = () => {
    // return Object.keys(pickBy(this.props.balances, (balance: string, symbol: string) => {
    //   return [ASSETS.NEO, ASSETS.GAS].includes(symbol) || balance !== '0'
    // }))
  }
}
