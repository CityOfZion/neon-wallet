// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { FormattedMessage } from 'react-intl'
import { Box, Center } from '@chakra-ui/react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import ContactForm from '../ContactFormRefactor'
import { MODAL_TYPES, ROUTES } from '../../../core/constants'
import AddIcon from '../../../assets/icons/add.svg'
import BackButton from '../../CloseButton'
import DeleteIcon from '../../../assets/icons/delete.svg'

import { useContactsContext } from '../../../context/contacts/ContactsContext'

type Props = {
  name: string,
  showModal: (modalType: string, modalProps: Object) => any,
  showSuccessNotification: ({ message: string }) => any,
  history: {
    push: Function,
  },
}

function AddContactPanel(props: Props) {
  const { name, showSuccessNotification, history } = props
  const { deleteContact } = useContactsContext()

  function showConfirmDeleteModal() {
    props.showModal(MODAL_TYPES.CONFIRM, {
      title: 'Confirm Delete',
      height: '200px',
      renderBody: () => (
        <Center marginBottom="50px">
          Are you sure you want to delete this contact?
        </Center>
      ),
      onClick: async () => {
        await deleteContact(name)
        showSuccessNotification({
          message: `Contact ${name} has been deleted.`,
        })
        history.push(ROUTES.CONTACTS)
      },
    })
  }

  return (
    <ContactForm name={name} showConfirmDeleteModal={showConfirmDeleteModal} />
  )
}

AddContactPanel.defaultProps = {
  name: '',
  address: '',
  setName: noop,
  setAddress: noop,
  onSave: noop,
}

export default AddContactPanel
