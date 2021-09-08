// @flow
import React from 'react'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'

import LoginLedgerNanoS from '../../../containers/LoginLedgerNanoS'
import n3Logo from '../../../assets/images/n3_logo.png'
import styles from './CreateLedgerMigrationWallet.scss'

const electron = require('electron').remote

type Props = {
  setAddress: (address: string) => void,
}

type State = {}

export default class CreateMigrationWallet extends React.Component<
  Props,
  State,
> {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.explanation}>
          <img src={n3Logo} />
          <div>
            <h3> Create your N3 wallet</h3>
            <p>
              Let's get started by deriving your new Neo N3 address on your
              hardware wallet! To begin, follow the instructions &nbsp;
              <a
                onClick={() => {
                  electron.shell.openExternal(
                    'https://support.ledger.com/hc/en-us/articles/4404382258961-Install-uninstall-and-update-apps?docs=true',
                  )
                }}
              >
                here
              </a>
              &nbsp; and install the <b>Neo N3</b> application to your hardware
              wallet.
            </p>
            <p>
              Once installed, open the <b>Neo N3</b> app on your device. We'll
              calculate your new address options for use in the migration
              process.
            </p>
          </div>
        </div>

        <div className={styles.ledgerFormContainer}>
          <LoginLedgerNanoS
            chain="neo3"
            isMigration
            handleChooseMigrationAddress={({ key }) => {
              const publicKeyEncoded = n3Wallet.getPublicKeyEncoded(key)
              const walletAccount = new n3Wallet.Account(publicKeyEncoded)
              this.props.setAddress(walletAccount.address)
            }}
          />
        </div>
      </div>
    )
  }
}
