// @flow
import React from 'react'

import Panel from '../../Panel'
import ReceivePanelHeader from './ReceivePanelHeader'
import ReceiveExplanation from '../ReceiveExplanation'
import QRCodeForm from '../QRCodeForm'

import styles from './styles.scss'

type Props = {
  sendableAssets: Object,
  address: string,
}

const ReceivePanel = ({
  sendableAssets,
  address
}: Props) => {
  return (
    <Panel
      className={styles.receivePanel}
      renderHeader={() => (
        <ReceivePanelHeader address={address} />
      )}
      contentClassName={styles.receivePanelContent}
    >
      <ReceiveExplanation />
      <QRCodeForm address={address} />
    </Panel>
  )
}

export default ReceivePanel
