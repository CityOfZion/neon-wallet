// @flow
import React from 'react'

import PageHeader from '../../components/PageHeader'
import AmountsPanel from '../../components/AmountsPanel'
import ReceivePanel from '../../components/Receive/ReceivePanel'

import {
  toNumber,
  toBigNumber,
  multiplyNumber,
  minusNumber
} from '../../core/math'

import styles from './Receive.scss'

type Props = {
  sendableAssets: Object,
  currencyCode: string,
  address: string,
  loading: boolean,
  loadWalletData: Function
}

type State = {

}

export default class Receive extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      sendableAssets,
      currencyCode,
      loading,
      loadWalletData,
      address
    } = this.props
    const noSendableAssets = Object.keys(sendableAssets).length === 0

    return (
      <section className={styles.receiveContainer}>
        <PageHeader
          title='Receive Assets'
          loading={loading}
          loadWalletData={loadWalletData}
        />
        {!noSendableAssets && (
          <AmountsPanel
            amountsData={this.createSendAmountsData()}
            currencyCode={currencyCode}
          />
        )}
        <ReceivePanel address={address} />
      </section>
    )
  }

  createSendAmountsData() {
    const { sendableAssets, prices } = this.props
    const { showConfirmSend, sendSuccess, sendRowDetails } = this.state

    let assets = Object.keys(sendableAssets)

    if (showConfirmSend || sendSuccess) {
      assets = (assets.filter((asset: string) =>
        sendRowDetails
          .reduce(
            (accumulator: Array<*>, row: Object) =>
              accumulator.concat(row.asset),
            []
          )
          .includes(asset)
      ): Array<*>)
    }

    return (assets
      .filter((asset: string) => !!prices[asset])
      .map((asset: string) => {
        const { balance } = sendableAssets[asset]
        const currentBalance = balance
        const price = prices[asset]

        const totalBalanceWorth = multiplyNumber(balance, price)
        const remainingBalanceWorth = multiplyNumber(currentBalance, price)

        return {
          symbol: asset,
          totalBalance: balance,
          price,
          currentBalance,
          totalBalanceWorth,
          remainingBalanceWorth
        }
      }): Array<*>)
  }
}
