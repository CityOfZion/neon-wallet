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
      contentClassName={styles.receivePanel}
      renderHeader={() => (
        <ReceivePanelHeader address={address} />
      )}
      className={styles.sendSuccessPanel}
    >
      <ReceiveExplanation />
      <QRCodeForm address={address} />
    </Panel>
  )
}

export default ReceivePanel
