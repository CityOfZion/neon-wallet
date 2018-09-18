// @flow
import React from 'react'
import classNames from 'classnames'
import QRCode from 'qrcode/lib/browser'

import Panel from '../../Panel'
import CopyToClipboard from '../../CopyToClipboard'
import { Address } from '../../Blockchain'

import styles from './ReceivePanel.scss'

type Props = {
  className: ?string,
  address: string
}

export default class ReceivePanel extends React.Component<Props> {
  canvas: ?Node

  componentDidMount() {
    QRCode.toCanvas(this.canvas, this.props.address, { version: 5 }, err => {
      if (err) console.error(err)
    })
  }

  componentWillUnmount() {}

  render() {
    const { className, address } = this.props

    return (
      <Panel
        className={classNames(styles.receivePanel, className)}
        renderHeader={this.renderHeader}
      >
        <div className={styles.qrcode}>
          <canvas ref={this.registerRef} />
        </div>
        <div className={styles.address}>
          <Address className={styles.link} address={address} />
          <CopyToClipboard
            className={styles.copy}
            text={address}
            tooltip="Copy Public Address"
          />
        </div>
      </Panel>
    )
  }

  renderHeader = () => <span>Your Public NEO Address</span>

  // $FlowFixMe
  registerRef = (el: Node) => {
    this.canvas = el
  }
}
