// @flow
import React from 'react'

import AddContactPanel from '../../components/Contacts/AddContactPanel'
import styles from './AddContact.scss'

type Props = {
  name: string,
  match: {
    params: {
      name: string,
    },
  },
}

function AddContact(props: Props) {
  const { match } = props
  const { name } = match.params

  return (
    <div className={styles.addContact}>
      <AddContactPanel name={name} />
    </div>
  )
}

export default AddContact
