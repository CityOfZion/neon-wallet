// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'

import BaseModal from '../BaseModal'
import ContactForm from '../../Contacts/ContactForm'

type Props = {
  address: string,
  hideModal: () => null,
  triggerSuccessNotification: (text: string) => void,
  onSave: (name: string, address: string, chain: string) => any,
  chain: string,
}

function AddContactModal(props: Props) {
  function handleSubmit(name: string, address: string) {
    const { onSave, hideModal, triggerSuccessNotification, chain } = props
    onSave(name, address, chain)
    triggerSuccessNotification('Contact added.')
    hideModal()
  }
  const { address, hideModal } = props

  return (
    <BaseModal hideModal={hideModal} height="600px">
      <ContactForm
        showScanner
        formAddress={address}
        submitLabel={<FormattedMessage id="addToContacts" />}
        onSubmit={handleSubmit}
      />
    </BaseModal>
  )
}

export default AddContactModal
