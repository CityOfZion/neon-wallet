import React from 'react'
import BaseModal from '../BaseModal'
import ContactForm from '../../Contacts/ContactForm'

const AddContactModal = ({ address, handleSubmit }) => (
  <BaseModal isOpen={false}>
    <ContactForm
      name="test"
      address={address}
      submitLabel="Add to contacts"
      onSubmit={handleSubmit}
    />
  </BaseModal>
)

export default AddContactModal
