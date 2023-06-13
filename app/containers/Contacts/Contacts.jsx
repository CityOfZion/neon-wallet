// @flow
import React from 'react'

import ContactsPanel from '../../components/Contacts/ContactsPanel'
import styles from './Contacts.scss'

type Props = {
  contacts: {
    [address: string]: string,
  },
}

export default class Contacts extends React.Component<Props> {
  render() {
    return (
      <div className={styles.contacts}>
        <ContactsPanel contacts={this.props.contacts} />
      </div>
    )
  }
}
