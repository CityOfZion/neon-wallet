// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'

import CopyToClipboard from '../../CopyToClipboard'
import LedgerIcon from '../../../assets/icons/ledger.svg'
import PanelHeaderButton from '../../PanelHeaderButton/PanelHeaderButton'
import styles from './styles.scss'
import AddIcon from '../../../assets/icons/add.svg'
import NeonLedger3, { getStartInfo } from '../../../ledger/n3NeonLedger'

type Props = {
  address: string,
}

const ReceivePanelHeader = ({ address }: Props) => (
  <section className={styles.receivePanelHeader}>
    <div className={styles.receivePanelHeaderInfo}>
      Create a bespoke QR code
    </div>
    <div className={styles.receivePanelHeader}>
      <div className={styles.walletAddressContainer}>
        <div className={styles.description}>
          <FormattedMessage id="receiveAssetsAddressLabel" />
        </div>
        <div className={styles.address}>{address}</div>
        <CopyToClipboard className={styles.copy} text={address} />
      </div>
      <div className={styles.verifyLedgerButton}>
        <PanelHeaderButton
          onClick={async () => {
            const ledger = await NeonLedger3.init()
            ledger.getPublicKey(0, true) // TODO: implement account
          }}
          renderIcon={() => (
            <LedgerIcon className={styles.copy} />
          )}
          buttonText="Verify on Ledger"
        />
      </div>
    </div>
  </section>
)

export default ReceivePanelHeader
