// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { FormattedMessage } from 'react-intl'
import { Box, Center } from '@chakra-ui/react'

import FullHeightPanel from '../../Panel/FullHeightPanel'
import ContactForm from '../ContactFormRefactor'
import { MODAL_TYPES, ROUTES } from '../../../core/constants'
import AddIcon from '../../../assets/icons/add.svg'
import BackButton from '../../BackButton'
import DeleteIcon from '../../../assets/icons/delete.svg'

import styles from './AddContactPanel.scss'
import { useContactsContext } from '../../../context/contacts/ContactsContext'

type Props = {
  className: ?string,
  name: string,
  onSave: Function,
  showModal: (modalType: string, modalProps: Object) => any,
  showSuccessNotification: ({ message: string }) => any,
  history: {
    push: Function,
  },
}

function AddContactPanel(props: Props) {
  const { className, name, onSave, showSuccessNotification, history } = props
  const { deleteContact } = useContactsContext()

  function handleSubmit(name: string, address: string) {
    onSave(name, address)
  }

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
    <FullHeightPanel
      className={className}
      renderHeaderIcon={() => <AddIcon />}
      renderBackButton={() => <BackButton routeTo={ROUTES.CONTACTS} />}
      headerText={<FormattedMessage id="addAContact" />}
      renderInstructions={() => (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {' '}
          <FormattedMessage id="addContactDetails" />
          <Box
            cursor="pointer"
            color="#d355e7"
            className={styles.removeNetwork}
            display="flex"
            alignItems="center"
            onClick={() => {
              showConfirmDeleteModal()
            }}
          >
            <DeleteIcon /> Remove contact
          </Box>
        </Box>
      )}
    >
      <div className={styles.formContainer}>
        <ContactForm
          name={name}
          submitLabel={<FormattedMessage id="addToContacts" />}
          onSubmit={handleSubmit}
        />
      </div>
    </FullHeightPanel>
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
