// @flow
import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import ContactForm from '../../Contacts/ContactForm'

type Props = {
  address: string,
  hideModal: () => null,
  triggerSuccessNotification: (text: string) => undefined,
  onSave: (name: string, address: string) => any
}

class AddContactModal extends Component<Props> {
  handleSubmit = (name, address) => {
    const { onSave, hideModal, triggerSuccessNotification } = this.props

    onSave(name, address)
    triggerSuccessNotification('Contact added.')
    hideModal()
  }

  render() {
    const { address, hideModal } = this.props

    return (
      <BaseModal hideModal={hideModal} height="700px">
        <ContactForm
          formAddress={address}
          submitLabel="Add to contacts"
          onSubmit={this.handleSubmit}
        />
      </BaseModal>
    )
  }
}
export default AddContactModal
