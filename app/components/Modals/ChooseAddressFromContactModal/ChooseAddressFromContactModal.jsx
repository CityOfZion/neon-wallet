// @flow
import React from 'react'
import { noop } from 'lodash-es'
import { FormattedMessage } from 'react-intl'
import { Box, Divider, Text, Image } from '@chakra-ui/react'

import BaseModal from '../BaseModal'
import Button from '../../Button'
import { useContactsContext } from '../../../context/contacts/ContactsContext'
import CheckMarkIcon from '../../../assets/icons/alternate-check.svg'
import { imageMap } from '../../../assets/nep5/svg'
import OldNeoLogo from '../../../assets/images/neo-logo.png'

const NEO_IMAGE = imageMap.NEO

type Props = {
  onClick: Function,
  onCancel: Function,
  hideModal: Function,

  contactName: string,
  chain: string,
}

const ChooseAddressFromContactModal = ({
  hideModal,
  onClick,
  onCancel,
  contactName,
  chain,
}: Props) => {
  const { contacts } = useContactsContext()

  const contact = contacts[contactName]
  // const firstAddress =
  //   (contact && contact[0]?.parsedAddress) || (contact && contact[0]?.address)

  const [selectedAddress, setSelectedAddress] = React.useState('')

  const filteredContactByChain = React.useMemo(
    () => {
      if (!contact) return []
      return contact.filter(c => c.chain === chain)
    },
    [contact, chain],
  )

  return (
    <BaseModal
      hideModal={() => hideModal() && onCancel && onCancel()}
      shouldRenderHeader={false}
      style={{
        content: {
          height: '400px',
        },
      }}
    >
      <Box height="100%" display="flex" flexDirection="column" overflowY="auto">
        <Text
          fontSize="18px"
          paddingX="24px"
          paddingTop="12px"
          paddingBottom="0px"
        >
          {' '}
          Choose an address for {contactName}:
        </Text>
        <Divider marginTop="0" marginBottom="24px" />
        <Box height="100%" display="flex" flexDirection="column">
          {filteredContactByChain &&
            filteredContactByChain.map(
              ({ address, parsedAddress, chain }, i) => (
                <Box
                  cursor="pointer"
                  onClick={() => setSelectedAddress(parsedAddress || address)}
                  background={
                    (selectedAddress === parsedAddress ||
                      selectedAddress === address) &&
                    'var(--sidebar-active-background)'
                  }
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    paddingX="24px"
                    height="54px"
                  >
                    <Image
                      width="22px"
                      maxWidth="22px"
                      // height="22px"
                      // maxHeight="22px"
                      marginRight="12px"
                      src={chain === 'neo2' ? OldNeoLogo : NEO_IMAGE}
                    />

                    <Box display="flex" flexDirection="column">
                      <span>{address}</span>
                      {parsedAddress && (
                        <Text opacity={0.5} fontSize="12px">
                          {parsedAddress}
                        </Text>
                      )}
                    </Box>
                    <Box marginLeft="auto">
                      {selectedAddress === (parsedAddress || address) && (
                        <CheckMarkIcon />
                      )}
                    </Box>
                  </Box>

                  {i + 1 !== contact.length && (
                    <Divider padding="0" margin="0" />
                  )}
                </Box>
              ),
            )}

          <Box marginTop="auto" padding="24px">
            <Button
              elevated
              id="cancel"
              onClick={() => {
                hideModal()
                onCancel()
              }}
            >
              <FormattedMessage id="modalActionCancel" />
            </Button>
            <Box marginBottom="4px" />

            <Button
              id="confirm"
              disabled={!selectedAddress}
              primary
              onClick={() => {
                onClick(selectedAddress)
                hideModal()
              }}
            >
              <FormattedMessage id="modalActionConfirm" />
            </Button>
          </Box>
        </Box>
      </Box>
    </BaseModal>
  )
}

ChooseAddressFromContactModal.defaultProps = {
  width: '500px',
  height: '250px',
  onCancel: noop,
}

export default ChooseAddressFromContactModal
