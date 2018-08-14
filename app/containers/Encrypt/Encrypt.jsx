// @flow
import React from 'react'

import EncryptPanel from '../../components/Settings/Encrypt/EncryptPanel'
import { ROUTES } from '../../core/constants'
import styles from './Encrypt.scss'

type Props = {
  history: Object,
  name: string,
  address: string
}

export default class Encrypt extends React.Component<Props> {
  componentWillMount = () => {
    if (!this.props.address) {
      this.props.history.push(ROUTES.ENCRYPT)
    }
  }

  render() {
    return (
      <div className={styles.encrypt}>
        <EncryptPanel title="Encrypt Private Key" />
      </div>
    )
  }

  handleSave = () => this.props.history.push(ROUTES.ENCRYPT)
}
