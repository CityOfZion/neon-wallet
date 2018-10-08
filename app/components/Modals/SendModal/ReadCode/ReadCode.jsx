// @flow
import React from 'react'

import Button from '../../../Button'
import QrCodeScanner from '../../../QrCodeScanner'
import TextInput from '../../../Inputs/TextInput'
import GridIcon from '../../../../assets/icons/grid.svg'
import CozDonationQrCode from '../../../../assets/images/coz-donation-qr-code.png'

import baseStyles from '../SendModal.scss'
import styles from './ReadCode.scss'

type Props = {
  gotoNextStep: Function,
}

type State = {

}

export default class ReadCode extends React.Component<Props, State> {
  render() {
    const { gotoNextStep } = this.props;

    return(
      <div className={baseStyles.contentContainer}>
        <div className={baseStyles.header}>
          <GridIcon className={baseStyles.icon} />
          <div className={baseStyles.title}>Use a QR Code</div>
        </div>

        <div className={baseStyles.subHeader}></div>
        <div className={baseStyles.section}>
          <div className={baseStyles.sectionContent}>
            So you've been sent a QR code? Hold it up to your camera or paste the image URL below:
          </div>
        </div>

        <div className={baseStyles.qrCodeScannerSection}>
          <div className={baseStyles.sectionTitle}>CAPTURE QR CODE</div>
          <div className={baseStyles.sectionContent}>
            <div className={styles.qrCodeScannerPlaceholder}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <img src={CozDonationQrCode} alt="Donate to CoZ" />
            </div>

            <QrCodeScanner callback={recipientData => gotoNextStep(recipientData)} />
          </div>
        </div>

        <div className={baseStyles.section}>
          <div className={baseStyles.sectionTitle}>OR USE AN IMAGE URL</div>
          <div className={baseStyles.sectionContent}>
            <TextInput
              placeholder="Paste a QR code image URL here..."
            />

            <Button primary>
              Use This Code
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
