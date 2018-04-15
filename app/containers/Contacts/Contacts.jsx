// @flow
import React from 'react'

import ContactsPanel from '../../components/Contacts/ContactsPanel'
import styles from './Contacts.scss'

type Props = {
  contacts: {
    [address: string]: string
  },
  loadAddresses: Function
}

export default class Contacts extends React.Component<Props> {
  componentWillMount () {
    this.props.loadAddresses()
  }

  render () {
    return (
      <div className={styles.contacts}>
        <ContactsPanel contacts={this.props.contacts} />
      </div>
    )
  }
}
