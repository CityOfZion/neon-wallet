// @flow
import React from 'react'

import EditContactPanel from '../../components/Contacts/EditContactPanel'
import { ROUTES } from '../../core/constants'
import styles from './EditContact.scss'

type Props = {
  history: Object,
  name: string,
  address: string
}

export default class EditContact extends React.Component<Props> {
  componentWillMount = () => {
    if (!this.props.address) {
      this.props.history.push(ROUTES.CONTACTS)
    }
  }

  render () {
    return (
      <div className={styles.editContact}>
        <EditContactPanel
          name={this.props.name}
          address={this.props.address}
          onSave={this.handleSave}
        />
      </div>
    )
  }

  handleSave = () => {
    return this.props.history.push(ROUTES.CONTACTS)
  }
}
