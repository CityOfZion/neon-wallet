// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Box } from '@chakra-ui/react'

import BaseModal from '../BaseModal'
import ContactForm from '../../Contacts/ContactFormRefactor'

type Props = {
  address: string,
  hideModal: () => null,
}

function AddContactModal(props: Props) {
  const { address, hideModal } = props

  return (
    <BaseModal hideModal={hideModal} height="100%" width="400px">
      <Box width="350px">
        <ContactForm
          showScanner
          formAddress={address}
          submitLabel={<FormattedMessage id="addToContacts" />}
          handleSubmit={() => props.hideModal()}
        />
      </Box>
    </BaseModal>
  )
}

export default AddContactModal
