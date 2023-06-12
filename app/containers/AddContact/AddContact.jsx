// @flow
import React from 'react'

import AddContactPanel from '../../components/Contacts/AddContactPanel'
import { ROUTES } from '../../core/constants'
import styles from './AddContact.scss'

type Props = {
  history: Object,
  name: string,
  address: string,
  match: {
    params: {
      name: string,
    },
  },
}

function AddContact(props: Props) {
  const handleSave = () => props.history.push(ROUTES.CONTACTS)
  const { match } = props
  const { name } = match.params

  console.log({ name })

  return (
    <div className={styles.addContact}>
      <AddContactPanel
        name={name}
        // name={props.name}
        // address={props.address}
        onSave={handleSave}
      />
    </div>
  )
}

export default AddContact
