// @flow
import React from 'react'

import Panel from '../../Panel'
import ReceivePanelHeader from './ReceivePanelHeader'
import ReceiveExplanation from '../ReceiveExplanation'
import QRCodeForm from '../QRCodeForm'

import styles from './styles.scss'

type Props = {
  address: string,
  onSubmit: Function
}

const ReceivePanel = ({ address, onSubmit }: Props) => (
  <Panel
    className={styles.receivePanel}
    renderHeader={() => <ReceivePanelHeader address={address} />}
    contentClassName={styles.receivePanelContent}
  >
    <ReceiveExplanation />
    <QRCodeForm address={address} onSubmit={onSubmit} />
  </Panel>
)

export default ReceivePanel
