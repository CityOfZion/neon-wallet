// @flow
import React from 'react'

import AddContactPanel from '../../components/Contacts/AddContactPanel'
import { ROUTES } from '../../core/constants'
import styles from './AddContact.scss'

type Props = {
  history: Object,
  name: string,
  address: string
}

export default class AddContact extends React.Component<Props> {
  render () {
    return (
      <div className={styles.addContact}>
        <AddContactPanel
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
