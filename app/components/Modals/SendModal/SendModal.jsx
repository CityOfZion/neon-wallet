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
}

export default class SendModal extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
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
        title="Use a QR Code"
        hideModal={hideModal}
        style={{ content: { width: '775px', height: '830px' } }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <GridIcon className={styles.icon} />
            <div className={styles.title}>Use a QR Code</div>
          </div>

          <div className={styles.subHeader}></div>
          <div>So you've been sent a QR code? Hold it up to your camera or paste the image URL below:</div>

          <div className={styles.section}>
            <div className={styles.sectionTitle}>CAPTURE QR CODE</div>
            <div className={styles.sectionContent}>
              - - -
            </div>
          </div>

          <div className={styles.urlSection}>
            <div className={styles.sectionTitle}>OR USE AN IMAGE URL</div>
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
