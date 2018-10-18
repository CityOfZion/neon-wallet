// @flow
import React from 'react'
import classNames from 'classnames'
import { clipboard, nativeImage } from 'electron'

import Nep9QrGenerator from '../../../modules/nep9/Nep9QrGenerator'
import Loader from '../../Loader'
import BaseModal from '../BaseModal'
import styles from './style.scss'
import GridIcon from '../../../assets/icons/grid.svg'
import CopyToClipboard from '../../CopyToClipboard'
import CopyIcon from '../../../assets/icons/copy.svg'
import ConfirmIcon from '../../../assets/icons/confirm.svg'

import Button from '../../Button'
import { ASSETS, TOKENS } from '../../../core/constants'

type Props = {
  hideModal: Function,
  address: string,
  asset: string,
  amount: string,
  description: string
}

type State = {
  loading: boolean,
  copied: boolean
}

export default class ReceiveModal extends React.Component<Props, State> {
  image: ?HTMLImageElement

  state = {
    loading: true
  }

  state = {
    loading: true,
    copied: false
  }

  handleCopyIcon = () => {
    this.setState({ copied: true })
    setTimeout(() => {
      this.setState({ copied: false })
    }, 1000)
  }

  componentDidMount() {
    const { address, asset, amount, description } = this.props

    const qrCode = new Nep9QrGenerator({
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
  }

  render() {
    const { hideModal, address, asset, amount, description } = this.props

    const { loading } = this.state

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
        bodyClassName={styles.modalBody}
        style={{ content: { width: '750px', height: '100%' } }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <GridIcon className={styles.icon} />
            <div className={styles.title}>Your QR Code</div>
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
                className={classNames(styles.qr, { [styles.hidden]: loading })}
                ref={(el: ?HTMLImageElement) => {
                  this.image = el
                }}
                alt=""
              />
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              shouldCenterButtonLabelText
              primary
              className={styles.submitButton}
              renderIcon={() =>
                this.state.copied ? <ConfirmIcon /> : <CopyIcon />
              }
              type="submit"
              onClick={() => {
                if (this.image) {
                  this.handleCopyIcon()
                  const imageForClipboard = nativeImage.createFromDataURL(
                    this.image && this.image.src
                  )
                  clipboard.writeImage(imageForClipboard)
                }
              }}
            >
              Copy Code Image
            </Button>
          </div>
        </div>
      </BaseModal>
    )
  }
}
