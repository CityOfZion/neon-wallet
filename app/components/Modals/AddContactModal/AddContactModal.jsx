// @flow

import React, { Component } from 'react'
import BaseModal from '../BaseModal'
import ContactForm from '../../Contacts/ContactForm'

type Props = {
  address: string,
  showModal: boolean,
  hideModal: () => null,
  onSave: (name: string, address: string) => any,
  hideModal: () => null
}

class AddContactModal extends Component<Props> {
  handleSubmit = (name, address) => {
    const { onSave, hideModal } = this.props

    onSave(name, address)
    hideModal()
  }

  render() {
    const { address, showModal, hideModal } = this.props

    return (
      <BaseModal showModal={showModal} hideModal={hideModal} height="700px">
        <ContactForm
          address={address}
          submitLabel="Add to contacts"
          onSubmit={this.handleSubmit}
        />
      </BaseModal>
    )
  }
}
export default AddContactModal
