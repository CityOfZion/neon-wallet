// @flow
import React from 'react'

import EncryptPanel from '../../components/Settings/EncryptPanel'
import styles from './Encrypt.scss'

type Props = {
  encryptPrivateKey: Function
}

export default class Encrypt extends React.Component<Props> {
  render() {
    const { encryptPrivateKey } = this.props

    return (
      <div className={styles.encrypt}>
        <EncryptPanel
          title="Encrypt Private Key"
          handleSubmit={encryptPrivateKey}
        />
      </div>
    )
  }

  // handleSave = () => this.props.history.push(ROUTES.ENCRYPT)
}
