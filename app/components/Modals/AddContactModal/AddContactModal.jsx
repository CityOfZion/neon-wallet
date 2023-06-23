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
    <BaseModal hideModal={hideModal} height="100%" width="600px">
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box width="450px" marginLeft="-24px">
          <ContactForm
            showScanner
            formAddress={address}
            submitLabel={<FormattedMessage id="addToContacts" />}
            handleSubmit={() => props.hideModal()}
          />
        </Box>
      </Box>
    </BaseModal>
  )
}

export default AddContactModal
