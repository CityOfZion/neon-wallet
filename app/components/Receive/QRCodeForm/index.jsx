// @flow
import React from 'react'
import classNames from 'classnames'

import AssetInput from '../../Inputs/AssetInput'
import NumberInput from '../../Inputs/NumberInput'
import CopyToClipboard from '../../CopyToClipboard'
import { Address } from '../../Blockchain'
import { ASSETS, TOKENS } from '../../../core/constants'
import { COIN_DECIMAL_LENGTH } from '../../../core/formatters'

import styles from './styles.scss'

type Props = {
  className: ?string,
  address: string
}

type State = {
  asset: ?string,
  amount: ?number
}

export default class QRCodeForm extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
    asset: null,
    amount: 0
  }

  render() {
    const { className, address } = this.props
    const { asset, amount } = this.state
    const symbols = ['-', ASSETS.NEO, ASSETS.GAS, ...Object.keys(TOKENS)]

    return (
      <div
        className={classNames(styles.receivePanel, className)}
      >
        <div className={styles.header}>
          <div className={styles.icon}>

          </div>
          <div className={styles.title}>
            Create a bespoke QR Code
          </div>
        </div>
        <form>
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
          <div className={styles.address}>
            <Address className={styles.link} address={address} />
          </div>
        </form>
      </div>
    )
  }
}
