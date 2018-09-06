// @flow
import React from 'react'
import NeoQR from 'neo-qrcode'

import BaseModal from '../BaseModal'
import styles from './style.scss'
import GridIcon from '../../../assets/icons/grid.svg'
import CopyToClipboard from '../../CopyToClipboard'
import { ASSETS, TOKENS } from '../../../core/constants'

type Props = {
  hideModal: Function,
  walletName: string,
  address: string,
  asset: string,
  amount: string,
  description: string
}

type State = {
  imgUri: string
}

export default class ReceiveModal extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
    imgUri: ''
  }

  componentDidMount() {
    const {
      hideModal,
      walletName,
      address,
      asset,
      amount,
      description
    } = this.props

    const qrCode = new NeoQR({
      nep9Data: {
        address,
        asset,
        amount,
        description
      }
    })

    qrCode.toDataURL().then(imgData => {
      if (this.image) this.image.src = imgData
    })

    this.setState({ imgUri: qrCode.uri.replace('neo:', '') })
  }

  render() {
    const {
      hideModal,
      walletName,
      address,
      asset,
      amount,
      description
    } = this.props

    const { imgUri } = this.state

    const tokensList: Array<any> = Object.values(TOKENS)

    const assetSymbol = ASSETS[asset]
      ? asset
      : tokensList.reduce(
          (accum, token) =>
            token.networks['1'].hash === asset ? token.symbol : accum,
          asset
        )

    return (
      <BaseModal
        title="Your QR Code"
        hideModal={hideModal}
        style={{ content: { width: '775px', height: '830px' } }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <GridIcon className={styles.icon} />
            <div className={styles.title}>Your QR Code</div>
          </div>

          <div className={styles.subHeader}>
            <div className={styles.title}>Receive assets</div>
            <div className={styles.walletName}>{walletName}</div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>PAYMENT REQUEST DETAILS</div>
            <div className={styles.sectionContent}>
              <div className={styles.assetAmount}>
                {(amount ? `${amount} ` : '') + (assetSymbol || '')}
              </div>
              <div className={styles.address}>{address}</div>
              <div className={styles.description}>
                {description || '(No Reference)'}
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>YOUR QR CODE</div>
            <div className={styles.qrcode}>
              <img
                ref={(el: ?HTMLImageElement) => {
                  this.image = el
                }}
                alt=""
              />
            </div>
          </div>

          <div className={styles.urlSection}>
            <div className={styles.sectionTitle}>IMAGE URL</div>
            <div className={styles.sectionContent}>
              <div className={styles.imgUri}>
                <div>'https://nep9.o3.network/'</div>
                <div>{imgUri}</div>
              </div>
              <CopyToClipboard text={`https://nep9.o3.network/${imgUri}`} />
            </div>
          </div>
        </div>
      </BaseModal>
    )
  }
}
