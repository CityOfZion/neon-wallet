// @flow
import React from 'react'
import classNames from 'classnames'

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
  scannerActive: boolean,
}

export default class ReadCode extends React.Component<Props, State> {
  constructor(){
    super();
    this.toggleScanner = this.toggleScanner.bind(this);  
  }

  state = {
    scannerActive: false
  }

  toggleScanner(){
    const { scannerActive } = this.state;
    this.setState({ scannerActive: !scannerActive });
  }

  getScanner(){
    const { scannerActive } = this.state;
    const { gotoNextStep } = this.props;

    if(scannerActive){
      return (
        <QrCodeScanner 
          callback={recipientData => gotoNextStep(recipientData)} 
        />
      )
    }

    return <img src={CozDonationQrCode} alt="Donate to CoZ" />
  }

  render() {
    const { scannerActive } = this.state;

    return(
      <div className={baseStyles.contentContainer}>
        <div className={baseStyles.header}>
          <GridIcon className={baseStyles.icon} />
          <div className={baseStyles.title}>Use a QR Code</div>
        </div>

        <div className={baseStyles.divider}></div>

        <div className={baseStyles.section}>
          <div className={baseStyles.sectionContent}>
            So you've been sent a QR code? Hold it up to your camera or paste the image URL below:
          </div>
        </div>

        <div className={baseStyles.section}>
          <div className={baseStyles.sectionTitle}>CAPTURE QR CODE</div>
          <div className={classNames(
            baseStyles.sectionContent,
            styles.qrCodeScannerSection
          )}>
            <div className={styles.qrCodeScannerPlaceholder}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              {this.getScanner()}
            </div>

            <Button onClick={this.toggleScanner}>
              {scannerActive ? 'Cancel' : 'Capture'}
            </Button>
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
