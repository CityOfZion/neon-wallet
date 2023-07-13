// @flow
import React from 'react'
import { wallet } from '@cityofzion/neon-js-legacy'
import { Box, Text } from '@chakra-ui/react'
import { FormattedMessage } from 'react-intl'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import AddContactIcon from '../../../assets/icons/contacts-add.svg'
import styles from './ContactFormRefactor.scss'
import AddIcon from '../../../assets/icons/add.svg'
import TrashCanIcon from '../../../assets/icons/delete.svg'
import EditIcon from '../../../assets/icons/edit.svg'
import { useContactsContext } from '../../../context/contacts/ContactsContext'
import { ROUTES } from '../../../core/constants'
import FullHeightPanel from '../../Panel/FullHeightPanel'
import CloseButton from '../../CloseButton'
import BackButton from '../../BackButton'

import { imageMap } from '../../../assets/nep5/svg'
import OldNeoLogo from '../../../assets/images/neo-logo.png'
import AddressForm from './AddressForm'
import CopyToClipboard from '../../CopyToClipboard/CopyToClipboard'

const NEO_IMAGE = imageMap.NEO

type Props = {
  name: string,
  intl: Object,
  showSuccessNotification: ({ message: string }) => any,
  history: {
    push: Function,
  },
}

export default function ContactForm(props: Props) {
  const { intl, showSuccessNotification, history } = props
  const { contacts, updateContacts, deleteContact } = useContactsContext()

  const [nameError, setNameError] = React.useState('')
  const [addresses, setAddresses] = React.useState([])
  const [parsedAddresses, setParsedAddresses] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [isInAddAddressMode, setIsInAddAddressMode] = React.useState(false)
  const [name, setName] = React.useState('')
  const [addressBeingEdited, setAddressBeingEdited] = React.useState('')
  const [
    indexOfAddressBeingEdited,
    setIndexOfAddressBeingEdited,
  ] = React.useState(-1)

  const isEditMode = !!props.name

  // if there is a name prop, it indicates that the component is
  // being rendered in "edit" mode and we are currently editing an existing contact
  React.useEffect(
    () => {
      if (props.name && contacts[props.name]) {
        setName(props.name)
        setAddresses(
          contacts[props.name] &&
            contacts[props.name].map(contact => contact.address),
        )
        setParsedAddresses(
          contacts[props.name] &&
            contacts[props.name].reduce((acc, contact) => {
              acc[contact.address] = contact.parsedAddress
              return acc
            }, {}),
        )
      }
    },
    [props.name],
  )

  function handleChangeName(event) {
    setName(event.target.value)
    const existingNames = Object.keys(contacts)
    if (existingNames.includes(event.target.value)) {
      return setNameError(intl.formatMessage({ id: 'errors.contact.nameDupe' }))
    }
    return setNameError('')
  }

  function handleDeleteAddress(index) {
    const nextAddresses = [...addresses]
    nextAddresses.splice(index, 1)
    setAddresses(nextAddresses)
  }

  function clearAddressBeingEdited() {
    setAddressBeingEdited('')
    setIndexOfAddressBeingEdited(-1)
  }

  function handleAddAddress(address: string, resolvedAddress?: string) {
    setIsInAddAddressMode(false)
    if (indexOfAddressBeingEdited !== -1) {
      const nextAddresses = [...addresses]
      nextAddresses[indexOfAddressBeingEdited] = address
      setAddresses(nextAddresses)
      clearAddressBeingEdited()
      setIsInAddAddressMode(false)
    } else {
      setAddresses([...addresses, address])
    }

    if (resolvedAddress) {
      setParsedAddresses({
        ...parsedAddresses,
        [address]: resolvedAddress,
      })
    }
  }

  function shouldDisableSubmitButton() {
    return loading || nameError || !name || addresses.some(a => !a)
  }

  function parseChainFromAddress(address): string {
    const chains = {
      NEO_LEGACY: 'neo2',
      NEO3: 'neo3',
    }
    if (address.includes('.neo')) {
      return chains.NEO3
    }
    return wallet.isAddress(address) ? chains.NEO_LEGACY : chains.NEO3
  }

  async function handleSaveAddress() {
    setLoading(true)
    const data = addresses.map(address => ({
      address,
      chain: parseChainFromAddress(address),
    }))
    await updateContacts(name, data)
    // this indicates an update where they changed the
    // contents of the name field for an existing contact
    if (props.name && props.name !== name) {
      await deleteContact(props.name)
    }
    showSuccessNotification({
      message: props.name
        ? `Successfully updated contact ${name}`
        : `Successfully added contact ${name}`,
    })
    setLoading(false)

    history.push(ROUTES.CONTACTS)
  }

  function computeHeaderText() {
    if (isEditMode) {
      return 'Edit contact'
    }
    if (isInAddAddressMode) {
      return 'Add address'
    }
    return 'Add contact'
  }

  function computeAddressBeingEdited() {
    if (isInAddAddressMode) {
      if (addressBeingEdited) return addressBeingEdited
      return ''
    }
    return ''
  }

  return (
    <FullHeightPanel
      renderHeaderIcon={() => <AddIcon />}
      renderCloseButton={() => <CloseButton routeTo={ROUTES.CONTACTS} />}
      renderBackButton={() =>
        isInAddAddressMode ? (
          <BackButton onClick={() => setIsInAddAddressMode(false)} />
        ) : null
      }
      headerText={computeHeaderText()}
      containerClassName={styles.contactsFullHeightPanel}
      className={styles.contactsFullHeightPanel}
      childrenContainerClassName={styles.childrenContainerClassName}
      renderInstructions={false}
    >
      <section className={styles.contactFormContainer}>
        <form className={styles.contactForm} onSubmit={() => null}>
          <Box width="100%" margin="auto" height="100%">
            {isInAddAddressMode ? (
              <AddressForm
                handleAddAddress={handleAddAddress}
                intl={intl}
                address={computeAddressBeingEdited()}
              />
            ) : (
              <Box width="100%">
                <TextInput
                  id="contactName"
                  name="name"
                  label={intl.formatMessage({
                    id: 'contactName',
                  })}
                  className={styles.input}
                  placeholder={intl.formatMessage({
                    id: 'enterAContactName',
                  })}
                  value={name}
                  onChange={handleChangeName}
                  error={nameError}
                />

                {addresses.length > 1 && (
                  <Text className={styles.addressesLabel} marginBottom={-12}>
                    Addresses
                  </Text>
                )}
                <Box marginTop={24}>
                  {!!addresses.length &&
                    addresses.map(
                      (address, i) =>
                        address && (
                          <Box
                            key={i}
                            display="flex"
                            alignItems="center"
                            width="100%"
                          >
                            <Box
                              width="100%"
                              display="flex"
                              alignItems="center"
                            >
                              <Image
                                width="22px"
                                maxWidth="22px"
                                marginRight="12px"
                                src={
                                  parseChainFromAddress(address) === 'neo2'
                                    ? OldNeoLogo
                                    : NEO_IMAGE
                                }
                              />

                              <Box
                                display="flex"
                                flexDirection="column"
                                width="300px"
                                marginY="12px"
                              >
                                <Text
                                  fontSize="14px"
                                  margin={0}
                                  display="flex"
                                  alignItems="center"
                                >
                                  {address}
                                  {!address.includes('.neo') && (
                                    <CopyToClipboard text={address} />
                                  )}
                                </Text>
                                {address.includes('.neo') && (
                                  <Text
                                    opacity={0.5}
                                    fontSize="12px"
                                    marginTop={-12}
                                  >
                                    {parsedAddresses[address]}{' '}
                                    <CopyToClipboard
                                      text={parsedAddresses[address]}
                                    />
                                  </Text>
                                )}
                              </Box>
                            </Box>
                            {addresses.length > 1 && (
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                                className={styles.deleteButton}
                                onClick={() => handleDeleteAddress(i)}
                                width={60}
                              >
                                <TrashCanIcon />
                              </Box>
                            )}

                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                              className={styles.deleteButton}
                              onClick={() => {
                                setIsInAddAddressMode(true)
                                setAddressBeingEdited(address)
                                setIndexOfAddressBeingEdited(i)
                              }}
                              width={60}
                            >
                              <EditIcon />
                            </Box>
                          </Box>
                        ),
                    )}
                </Box>

                <Box
                  width="100%"
                  margin="auto"
                  marginTop={24}
                  height="40px"
                  border="1px dashed var(--contacts-delete-contact-name)"
                  borderRadius={3}
                >
                  <Button
                    onClick={() => {
                      clearAddressBeingEdited()
                      setIsInAddAddressMode(true)
                    }}
                    renderIcon={AddIcon}
                    className={styles.addButton}
                    iconClassName={styles.addIcon}
                  >
                    <span>Add address</span>
                  </Button>
                </Box>

                <Box marginY={48}>
                  <Button
                    loading={loading}
                    onClick={() => handleSaveAddress()}
                    className={styles.submitButton}
                    primary
                    type="submit"
                    disabled={shouldDisableSubmitButton()}
                    renderIcon={AddContactIcon}
                  >
                    {props.name ? (
                      'Update contact'
                    ) : (
                      <FormattedMessage id="addToContacts" />
                    )}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </form>
      </section>
    </FullHeightPanel>
  )
}
