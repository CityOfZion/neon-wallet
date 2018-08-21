// @flow
import React from 'react'

import EncryptPanel from '../../components/Settings/EncryptPanel'
import { ROUTES } from '../../core/constants'
import styles from './Encrypt.scss'

type Props = {
  history: Object
}

export default class Encrypt extends React.Component<Props> {
  componentWillMount = () => {
    this.props.history.push(ROUTES.ENCRYPT)
  }

  render() {
    return (
      <div className={styles.encrypt}>
        <EncryptPanel title="Encrypt Private Key" />
      </div>
    )
  }

  // handleSave = () => this.props.history.push(ROUTES.ENCRYPT)
}
