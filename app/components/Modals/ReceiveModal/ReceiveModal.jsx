// @flow
import React from 'react'
import NeoQR from 'neo-qrcode'

import Loader from '../../Loader'
import BaseModal from '../BaseModal'
import styles from './style.scss'
import GridIcon from '../../../assets/icons/grid.svg'
import CopyToClipboard from '../../CopyToClipboard'
import { ASSETS, TOKENS } from '../../../core/constants'

type Props = {
  hideModal: Function,
  address: string,
  asset: string,
  amount: string,
  description: string
}

type State = {
  imgUri: string,
  loading: boolean
}

export default class ReceiveModal extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
    imgUri: '',
    loading: true
  }

  componentDidMount() {
    const { address, asset, amount, description } = this.props

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
      this.setState({ loading: false })
    })

    this.setState({ imgUri: qrCode.uri.replace('neo:', '') })
  }

  render() {
    const { hideModal, address, asset, amount, description } = this.props

    const { imgUri, loading } = this.state

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
        style={{ content: { width: '750px', height: '100%' } }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <GridIcon className={styles.icon} />
            <div className={styles.title}>Your QR Code</div>
          </div>

          <div className={styles.subHeader}>
            <div className={styles.title}>Receive assets</div>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>PAYMENT REQUEST DETAILS</div>
            <div className={styles.sectionContent}>
              <div className={styles.assetAmount}>
                {(amount ? `${amount} ` : '') + (assetSymbol || 'NEO')}
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
              {loading && <Loader className={styles.loaderMargin} />}
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
                {`https://nep9.o3.network/${imgUri}`}
              </div>
              <CopyToClipboard text={`https://nep9.o3.network/${imgUri}`} />
            </div>
          </div>
        </div>
      </BaseModal>
    )
  }
}
