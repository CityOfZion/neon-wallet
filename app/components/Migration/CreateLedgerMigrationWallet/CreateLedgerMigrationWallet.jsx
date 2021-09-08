// @flow
import React from 'react'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'

import LoginLedgerNanoS from '../../../containers/LoginLedgerNanoS'
import n3Logo from '../../../assets/images/n3_logo.png'
import styles from './CreateLedgerMigrationWallet.scss'

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
              Let's get started by creating your new N3 wallet. Your private key
              will remain the same, but the derived address will be new! All you
              have to do is give your N3 wallet a name and password. We'll take
              care of the rest!
            </p>
          </div>
        </div>

        <div className={styles.ledgerFormContainer}>
          <LoginLedgerNanoS
            chain="neo3"
            isMigration
            handleChooseMigrationAddress={({ key }) => {
              console.log({ key })
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
