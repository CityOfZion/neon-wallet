// @flow
import React from 'react'

import Button from '../../../Button'
import QrCodeScanner from '../../../QrCodeScanner'
import TextInput from '../../../Inputs/TextInput'
import styles from '../SendModal.scss'
import GridIcon from '../../../../assets/icons/grid.svg'

type Props = {

}

type State = {

}

export default class ReadCode extends React.Component<Props, State> {
  render() {
    return(
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <GridIcon className={styles.icon} />
          <div className={styles.title}>Use a QR Code</div>
        </div>

        <div className={styles.subHeader}></div>
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            So you've been sent a QR code? Hold it up to your camera or paste the image URL below:
          </div>
        </div>

        <div className={styles.qrCodeScannerSection}>
          <div className={styles.sectionTitle}>CAPTURE QR CODE</div>
          <div className={styles.sectionContent}>
            <QrCodeScanner callback={data => console.log(data)} />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>OR USE AN IMAGE URL</div>
          <div className={styles.sectionContent}>
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
