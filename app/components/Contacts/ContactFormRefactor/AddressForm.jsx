// @flow
import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { wallet } from '@cityofzion/neon-js'
import { wallet as n3Wallet } from '@cityofzion/neon-js-next'
import { BSNeo3 } from '@cityofzion/bs-neo3'

import TextInput from '../../Inputs/TextInput'
import AddContactIcon from '../../../assets/icons/contacts-add.svg'
import styles from './ContactFormRefactor.scss'
import Button from '../../Button'
import { useContactsContext } from '../../../context/contacts/ContactsContext'

type Props = {
  intl: Object,
  address: string,
  handleAddAddress: (address: string, resolvedAddressValue?: string) => void,
}

export default function AddressForm(props: Props) {
  const { intl, address, handleAddAddress } = props
  const [localAddress, setLocalAddress] = React.useState(address ?? '')
  const [resolvedAddressValue, setResolvedAddressValue] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const { contacts } = useContactsContext()

  function clearAddressError() {
    setError('')
  }

  async function handleNNSDomain(address) {
    setLoading(true)
    const NeoBlockChainService = new BSNeo3()
    const results = await NeoBlockChainService.getOwnerOfNNS(address)
    if (!n3Wallet.isAddress(results)) {
      return setError(
        intl.formatMessage({
          id: 'errors.contact.invalidAddress',
        }),
      )
    }
    clearAddressError()
    setLoading(false)
    return results
  }

  // validates whether or not the address is a valid legacy or N3 address
  // and whether or not the address already exists in the contacts list
  function isValidAddress(address: string, NNSDomain: string): boolean {
    const validAddress =
      wallet.isAddress(address) || n3Wallet.isAddress(address)

    // $FlowFixMe
    const existingAddresses = Object.values(contacts).reduce(
      (acc, contact: Array<{ parsedAddress?: string, address: string }>) => [
        ...acc,
        ...contact.map(address => address.parsedAddress || address.address),
      ],
      [],
    )

    if (
      existingAddresses.includes(NNSDomain) ||
      existingAddresses.includes(address)
    ) {
      setError(
        intl.formatMessage({
          id: 'errors.contact.contactExists',
        }),
      )
      return false
    }
    if (!validAddress) {
      setError(
        intl.formatMessage({
          id: 'errors.contact.invalidAddress',
        }),
      )
      return false
    }
    return true
  }

  async function handleChangeAddress(event): Promise<void> {
    const {
      target: { value },
    } = event
    setLocalAddress(value)
    let resolvedAddressValue = value
    if (value.includes('.neo')) {
      const results = await handleNNSDomain(value)
      if (results) {
        resolvedAddressValue = results
      } else {
        return undefined
      }
    }
    const valid = isValidAddress(
      resolvedAddressValue,
      value.includes('.neo') ? value : '',
    )
    if (valid) {
      clearAddressError()
      setResolvedAddressValue(resolvedAddressValue)
    }
  }

  return (
    <Box width="100%">
      <TextInput
        id="contactAddress"
        label={intl.formatMessage({
          id: 'contactWalletAddress',
        })}
        name="address"
        placeholder={intl.formatMessage({
          id: 'enterAWalletAddress',
        })}
        value={localAddress}
        onChange={handleChangeAddress}
        error={error}
      />
      <Box marginY={48}>
        <Button
          onClick={() => {
            handleAddAddress(localAddress, resolvedAddressValue)
          }}
          className={styles.submitButton}
          primary
          type="submit"
          disabled={error || loading || !localAddress}
          renderIcon={AddContactIcon}
        >
          Add address
        </Button>
      </Box>
    </Box>
  )
}
