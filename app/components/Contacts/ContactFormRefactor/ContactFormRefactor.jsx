// @flow
import React from 'react'
import { intlShape } from 'react-intl'
import { wallet } from '@cityofzion/neon-js'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'
import { Box } from '@chakra-ui/react'
import { BSNeo3 } from '@cityofzion/bs-neo3'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import AddContactIcon from '../../../assets/icons/contacts-add.svg'
import styles from './ContactFormRefactor.scss'
import AddIcon from '../../../assets/icons/add.svg'
import TrashCanIcon from '../../../assets/icons/delete.svg'
import { useContactsContext } from '../../../context/contacts/ContactsContext'
import { ROUTES } from '../../../core/constants'

type Props = {
  name: string,
  submitLabel: string,
  intl: intlShape,
  showSuccessNotification: ({ message: string }) => any,
  formAddress?: string,
  history: {
    push: Function,
  },
  handleSubmit?: () => void,
}

export default function ContactForm(props: Props) {
  const {
    intl,
    submitLabel,
    showSuccessNotification,
    history,
    formAddress,
  } = props
  const { contacts, updateContacts, deleteContact } = useContactsContext()
  const [addressCount, setAddressCount] = React.useState(1)
  const [errorMapping, setErrorMapping] = React.useState({
    addresses: [],
    name: '',
  })
  const [name, setName] = React.useState('')
  const [addresses, setAddresses] = React.useState([formAddress || ''])
  const [loading, setLoading] = React.useState(false)

  // this indicates we are in edit mode
  React.useEffect(
    () => {
      if (props.name && contacts[props.name]) {
        setName(props.name)
        setAddresses(
          contacts[props.name] &&
            contacts[props.name].map(contact => contact.address),
        )
        setAddressCount(contacts[props.name]?.length)
      }
    },
    [props.name],
  )

  function handleChangeName(event) {
    const existingNames = Object.keys(contacts)

    if (existingNames.includes(event.target.value)) {
      setErrorMapping({
        ...errorMapping,
        name: intl.formatMessage({ id: 'errors.contact.nameDupe' }),
      })
    }
    setName(event.target.value)
  }

  function clearErrorForGivenIndex(index) {
    const nextErrorMappingForAddresses = [...errorMapping.addresses]
    nextErrorMappingForAddresses[index] = ''
    setErrorMapping({
      ...errorMapping,
      addresses: nextErrorMappingForAddresses,
    })
  }

  async function handleNNSDomain(address, index) {
    setLoading(true)
    const NeoBlockChainService = new BSNeo3()
    const results = await NeoBlockChainService.getOwnerOfNNS(address)
    if (!n3Wallet.isAddress(results)) {
      // update the error mapping that the address is invalid
      const nextErrorMappingForAddresses = [...errorMapping.addresses]
      nextErrorMappingForAddresses[index] = intl.formatMessage({
        id: 'errors.contact.invalidAddress',
      })
      return setErrorMapping({
        ...errorMapping,
        addresses: nextErrorMappingForAddresses,
      })
    }
    clearErrorForGivenIndex(index)
    setLoading(false)
    return results
  }

  // validates whether or not the address is a valid legacy or N3 address
  // and whether or not the address already exists in the contacts list
  function isValidAddress(
    address: string,
    index: number,
    NNSDomain: string,
  ): boolean {
    const validAddress =
      wallet.isAddress(address) || n3Wallet.isAddress(address)

    const existingAddresses = Object.values(contacts).reduce(
      (acc, contact) => [
        ...acc,
        // $FlowFixMe
        ...contact.map(address => address.parsedAddress || address.address),
      ],
      [],
    )

    if (existingAddresses.includes(NNSDomain || address)) {
      const nextErrorMappingForAddresses = [...errorMapping.addresses]
      nextErrorMappingForAddresses[index] = intl.formatMessage({
        id: 'errors.contact.contactExists',
      })
      setErrorMapping({
        ...errorMapping,
        addresses: nextErrorMappingForAddresses,
      })
      return false
    }
    if (!validAddress) {
      const nextErrorMappingForAddresses = [...errorMapping.addresses]
      nextErrorMappingForAddresses[index] = intl.formatMessage({
        id: 'errors.contact.invalidAddress',
      })
      setErrorMapping({
        ...errorMapping,
        addresses: nextErrorMappingForAddresses,
      })
      return false
    }
    return true
  }

  async function handleChangeAddress(event, index): Promise<void> {
    const nextAddresses = [...addresses]
    nextAddresses[index] = event.target.value
    setAddresses(nextAddresses)
    let addressValue = event.target.value
    if (event.target.value.includes('.neo')) {
      const results = await handleNNSDomain(event.target.value, index)
      if (results) {
        addressValue = results
      } else {
        return undefined
      }
    }
    const valid = isValidAddress(
      addressValue,
      index,
      event.target.value.includes('.neo') ? event.target.value : '',
    )
    if (valid) clearErrorForGivenIndex(index)
  }

  function handleDeleteAddress(index) {
    const nextAddresses = [...addresses]
    nextAddresses.splice(index, 1)
    setAddresses(nextAddresses)
    setAddressCount(addressCount - 1)
    clearErrorForGivenIndex(index)
  }

  function shouldDisableSubmitButton() {
    const hasValidNameAndAtLeastOneAddress =
      name.length > 0 && addresses[0] !== ''

    const hasAnEmptyAddress = addresses.some(address => address === '')

    return (
      loading ||
      errorMapping.name ||
      hasAnEmptyAddress ||
      (errorMapping.addresses.some(address => address?.length > 0) ||
        !hasValidNameAndAtLeastOneAddress)
    )
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

    if (props.handleSubmit) {
      props.handleSubmit()
    } else {
      history.push(ROUTES.CONTACTS)
    }
  }

  return (
    <section className={styles.contactFormContainer}>
      <form className={styles.contactForm} onSubmit={() => null}>
        <Box width="100%" margin="auto">
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
            error={errorMapping.name}
          />
          {new Array(addressCount).fill(0).map((_, i) => (
            <Box key={i} display="flex" alignItems="center" width="100%">
              <Box width="100%">
                <TextInput
                  id="contactAddress"
                  label={intl.formatMessage({
                    id: 'contactWalletAddress',
                  })}
                  name="address"
                  className={styles.input}
                  placeholder={intl.formatMessage({
                    id: 'enterAWalletAddress',
                  })}
                  value={addresses[i]}
                  onChange={e => handleChangeAddress(e, i)}
                  error={errorMapping.addresses[i]}
                />
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
            </Box>
          ))}

          <Box
            width="100%"
            margin="auto"
            marginTop={24}
            border="1px dashed  var(--contacts-delete-contact-name)"
          >
            <Button
              onClick={() => {
                setAddressCount(addressCount + 1)
                setAddresses([...addresses, ''])
              }}
              renderIcon={AddIcon}
              className={styles.addButton}
            >
              <span>Add another address</span>
            </Button>
          </Box>

          <div className={styles.submitButtonRow}>
            <Button
              loading={loading}
              onClick={() => handleSaveAddress()}
              className={styles.submitButton}
              primary
              type="submit"
              disabled={shouldDisableSubmitButton()}
              renderIcon={AddContactIcon}
            >
              {/* TODO: this needs a translation */}
              {props.name ? 'Update contact' : submitLabel}
            </Button>
          </div>
        </Box>
      </form>
    </section>
  )
}
