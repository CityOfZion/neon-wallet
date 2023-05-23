// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { FormattedMessage, intlShape } from 'react-intl'
import { wallet } from '@cityofzion/neon-js'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'
import { Box } from '@chakra-ui/react'

import Button from '../../Button'
import TextInput from '../../Inputs/TextInput'
import DialogueBox from '../../DialogueBox'
import AddContactIcon from '../../../assets/icons/contacts-add.svg'
import WarningIcon from '../../../assets/icons/warning.svg'
import GridIcon from '../../../assets/icons/grid.svg'
import styles from './ContactFormRefactor.scss'
import QrCodeScanner from '../../QrCodeScanner'
import Close from '../../../assets/icons/close.svg'
import AddIcon from '../../../assets/icons/add.svg'
import TrashCanIcon from '../../../assets/icons/delete.svg'
import { useContactsContext } from '../../../context/contacts/ContactsContext'

type Props = {
  submitLabel: string,
  formName: string,
  formAddress: string,
  setName: Function,
  intl: intlShape,
}

type State = {
  nameError: string,
  addressError: string,
  scannerActive: boolean,
  addressCount: number,
}

export default function ContactForm(props: Props) {
  const { contacts, updateContacts } = useContactsContext()
  const [addressCount, setAddressCount] = React.useState(1)
  const [errorMapping, setErrorMapping] = React.useState({
    addresses: [],
    name: '',
  })
  const [name, setName] = React.useState('')
  const [addresses, setAddresses] = React.useState([''])
  const [loading, setLoading] = React.useState(false)
  const { submitLabel, formName, formAddress, intl } = props

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

  function handleChangeAddress(event, index) {
    // valid address could be an N3 adddress OR legacy
    const validAddress =
      wallet.isAddress(event.target.value) ||
      n3Wallet.isAddress(event.target.value)

    if (!validAddress) {
      const nextErrorMappingForAddresses = [...errorMapping.addresses]
      nextErrorMappingForAddresses[index] = intl.formatMessage({
        id: 'errors.contact.invalidAddress',
      })
      setErrorMapping({
        ...errorMapping,
        addresses: nextErrorMappingForAddresses,
      })
    } else {
      const nextErrorMappingForAddresses = [...errorMapping.addresses]
      nextErrorMappingForAddresses[index] = ''
      setErrorMapping({
        ...errorMapping,
        addresses: nextErrorMappingForAddresses,
      })
    }

    const nextAddresses = [...addresses]
    nextAddresses[index] = event.target.value
    setAddresses(nextAddresses)
  }

  function handleDeleteAddress(index) {
    const nextAddresses = [...addresses]
    nextAddresses.splice(index, 1)
    setAddresses(nextAddresses)
    setAddressCount(addressCount - 1)
  }

  function shouldDisableSubmitButton() {
    const hasValidNameAndAtLeastOneAddress =
      name.length > 0 && addresses[0] !== ''

    return (
      loading ||
      errorMapping.name ||
      (errorMapping.addresses.some(address => address.length > 0) ||
        !hasValidNameAndAtLeastOneAddress)
    )
  }

  function parseChainFromAddress(address): string {
    const chains = {
      NEO_LEGACY: 'neo2',
      NEO3: 'neo3',
    }
    return wallet.isAddress(address) ? chains.NEO_LEGACY : chains.NEO3
  }

  function handleSaveAddress() {
    setLoading(true)
    const data = addresses.map(address => ({
      address,
      chain: parseChainFromAddress(address),
    }))
    updateContacts(name, data)
    setLoading(false)
  }

  console.log({ contacts })

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
              {i > 0 && (
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
              onClick={() => handleSaveAddress()}
              className={styles.submitButton}
              primary
              type="submit"
              disabled={shouldDisableSubmitButton()}
              renderIcon={AddContactIcon}
            >
              {submitLabel}
            </Button>
          </div>
        </Box>
      </form>
    </section>
  )
}

// import { BSNeo3 } from '@cityofzion/bs-neo3'

// const validateAddressOrNSS = useCallback(
//   debounce(async ({ addressOrDomain, selectedAccount, selectedContact, selectedWallet }: HandleChange) => {
//     setNNSAddress(undefined)

//     let isValid = false
//     let address: string | undefined

//     const serviceLib = getBlockchainServiceLib(account.blockchain)
//     if (hasNNS(serviceLib) && serviceLib.validateNNSFormat(addressOrDomain)) {
//       try {
//         setLoading(true)
//         const nnsAddress = await serviceLib.getOwnerOfNNS(addressOrDomain.toLowerCase())
//         setNNSAddress(addressOrDomain.toLowerCase())
//         isValid = true
//         address = nnsAddress
//         onAddressChange(nnsAddress)
//       } finally {
//         setLoading(false)
//       }
//     } else if (blockchainService.validateAddress(addressOrDomain)) {
//       isValid = true
//       address = addressOrDomain
//     }

//     onAddressValidation(isValid)
//     const foundedAccount = selectedAccount
//       ? selectedAccount
//       : address
//       ? accounts.find(account => account.address === address)
//       : undefined

//     const foundedWallet = selectedWallet
//       ? selectedWallet
//       : address && foundedAccount
//       ? foundedAccount.getWallet(wallets)
//       : undefined

//     const foundedContact = selectedContact
//       ? selectedContact
//       : contacts.find(contact => contact.addresses.some(address => address.addressOrDomain === addressOrDomain))

//     onAccountChange(foundedAccount)
//     onWalletChange(foundedWallet)
//     onContactChange(foundedContact)
//   }, 1000),
//   [getBlockchainServiceLib, blockchainService]
// )

// componentWillMount() {
//   const { newAddress, setAddress } = this.props

//   if (newAddress) {
//     setAddress('')
//   }
// }

// disableButton = (name: string, address: string) => {
//   const { chain } = this.props
//   if (name.length === 0) {
//     return true
//   }

//   if (name.length > 100) {
//     return true
//   }

//   if (
//     chain === 'neo3'
//       ? !n3Wallet.isAddress(address)
//       : !wallet.isAddress(address)
//   ) {
//     return true
//   }

//   return false
// }

// validate = (name: string, address: string) => {
//   const validName = this.validateName(name)
//   const validAddress = this.validateAddress(address)

//   return validName && validAddress
// }

// validateName = (name: string) => {
//   const { contacts, mode, intl } = this.props
//   let error

//   if (name.length === 0) {
//     error = intl.formatMessage({ id: 'errors.contact.nameNull' }) // eslint-disable-line
//   }

//   if (name.length > 100) {
//     error = intl.formatMessage({ id: 'errors.contact.nameLength' })
//   }

//   if (mode !== 'edit') {
//     const nameExists = Object.keys(contacts).filter(
//       (contactName: string) => contactName === name,
//     )

//     if (nameExists.length > 0) {
//       error = intl.formatMessage({ id: 'errors.contact.nameDupe' })
//     }
//   }

//   if (error) {
//     this.setState({ nameError: error })
//     return false
//   }
//   return true
// }

// validateAddress = (address: string) => {
//   const { mode, contacts, formAddress, intl, chain } = this.props
//   let error

//   if (
//     chain === 'neo3'
//       ? !n3Wallet.isAddress(address)
//       : !wallet.isAddress(address)
//   ) {
//     error = intl.formatMessage({ id: 'errors.contact.invalidAddress' })
//   }

//   if (mode !== 'edit') {
//     const addressExists = Object.keys(contacts)
//       .map(acc => contacts[acc])
//       .filter(adr => adr === formAddress)

//     if (addressExists.length > 0) {
//       error = intl.formatMessage({ id: 'errors.contact.contactExists' })
//     }
//   }

//   if (error) {
//     this.setState({ addressError: error })
//     return false
//   }
//   return true
// }

// clearErrors = (name: string) => {
//   if (name === 'name') {
//     this.setState({ nameError: '' })
//   }

//   if (name === 'address') {
//     this.setState({ addressError: '' })
//   }
// }

// handleChangeName = (event: Object) => {
//   this.clearErrors(event.target.name)
//   this.props.setName(event.target.value)
//   this.validate(event.target.value, this.props.formAddress)
// }

// handleChangeAddress = (event: Object) => {
//   this.clearErrors(event.target.name)
//   this.props.setAddress(event.target.value)
//   this.validate(this.props.formName, event.target.value)
// }

// handleSubmit = (event: Object) => {
//   event.preventDefault()
//   const { onSubmit, formName, formAddress } = this.props

//   const validInput = this.validate(formName, formAddress)

//   if (validInput) {
//     onSubmit(formName, formAddress)
//   }
// }
// }
