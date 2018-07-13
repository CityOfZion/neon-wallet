// @flow

import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import ContactForm from '../../Contacts/ContactForm'

type Props = {
  address: string,
  hideModal: () => null,
  onSave: (name: string, address: string) => any
}

class AddContactModal extends Component<Props> {
  handleSubmit = (name, address) => {
    const { onSave, hideModal } = this.props

    onSave(name, address)
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
