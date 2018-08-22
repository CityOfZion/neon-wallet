// @flow
import React from 'react'

import EncryptPanel from '../../components/Settings/EncryptPanel'
import styles from './Encrypt.scss'

type Props = {}

export default class Encrypt extends React.Component<Props> {
  render() {
    return (
      <div className={styles.encrypt}>
        <EncryptPanel title="Encrypt Private Key" />
      </div>
    )
  }

  // handleSave = () => this.props.history.push(ROUTES.ENCRYPT)
}
