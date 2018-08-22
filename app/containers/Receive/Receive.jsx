// @flow
import React from 'react'

import PageHeader from '../../components/PageHeader'
import AmountsPanel from '../../components/AmountsPanel'
import ReceivePanel from '../../components/Receive/ReceivePanel'

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
      <section className={styles.sendContainer}>
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
        <ReceivePanel className={styles.panel} address={address} />
      </section>
    )
  }
}
