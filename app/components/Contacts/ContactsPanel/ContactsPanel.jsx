// @flow
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { orderBy, groupBy, isEmpty } from 'lodash-es'
import classNames from 'classnames'
import { FormattedMessage, IntlShape } from 'react-intl'
import { Box, Divider, Text, Image } from '@chakra-ui/react'

import StyledReactSelect from '../../Inputs/StyledReactSelect/StyledReactSelect'
import HeaderBar from '../../HeaderBar'
import Address from '../../Blockchain/Address'
import Panel from '../../Panel'
import Button from '../../Button'
import AddIcon from '../../../assets/icons/add.svg'
import InfoIcon from '../../../assets/icons/info.svg'
import EditIcon from '../../../assets/icons/edit.svg'
import SendIcon from '../../../assets/icons/send.svg'
import { ROUTES } from '../../../core/constants'
import CopyToClipboard from '../../CopyToClipboard'
import LogoWithStrikethrough from '../../LogoWithStrikethrough'
import {
  useContactsContext,
  type Contacts,
  type ContactInfo,
} from '../../../context/contacts/ContactsContext'
import { imageMap } from '../../../assets/nep5/svg'
import OldNeoLogo from '../../../assets/images/neo-logo.png'
import styles from './ContactsPanel.scss'

const NEO_IMAGE = imageMap.NEO

type OrderDirection = 'desc' | 'asc'

type Props = {
  intl: IntlShape,
  history: {
    push: Function,
  },
}

type SelectOption = {
  label: string,
  value: OrderDirection,
}

type ParsedContact = {
  addresses: ContactInfo[],
  name: string,
}

const SORTING_OPTIONS = [
  {
    label: 'A-Z',
    value: 'asc',
  },
  {
    label: 'Z-A',
    value: 'desc',
  },
]

function ContactsPanel(props: Props) {
  const [sorting, setSorting] = useState(SORTING_OPTIONS[0])
  const { contacts } = useContactsContext()
  const [selectedContact, setSelectedContact] = useState(null)
  const { intl } = props

  function handleSort(option: SelectOption) {
    setSorting(option)
  }

  useEffect(
    () => {
      if (Object.keys(contacts).length > 0) {
        setSelectedContact(Object.keys(contacts)[0])
      }
    },
    [contacts],
  )

  function handleEdit(name: string) {
    props.history.push(`/contacts/edit/${encodeURIComponent(name)}`)
  }

  function findContactAndReturnParsedContact(
    name: string,
  ): ParsedContact | void {
    const contactsArray: ParsedContact[] = Object.entries(contacts).map(
      ([name, address]) => ({
        name,
        /* $FlowFixMe */
        addresses: address,
      }),
    )
    return contactsArray.find(contact => contact.name === name)
  }

  function getContactsInGroups(
    contacts: Contacts,
    orderDirection: OrderDirection,
  ) {
    /* $FlowFixMe */
    const contactsArray: ParsedContact[] = Object.entries(contacts).map(
      ([name, address]) => ({
        name,
        addresses: address,
      }),
    )
    const groupContactsByFirstLetter = groupBy(
      contactsArray,
      ({ name }: ParsedContact) => {
        const firstLetter = name.substr(0, 1).toUpperCase()
        return /[a-zA-Z]/.test(firstLetter) ? firstLetter : '#'
      },
    )
    const groupedContacts = Object.entries(groupContactsByFirstLetter).map(
      ([groupName, groupContacts]) => ({
        groupName,
        groupContacts: orderBy(groupContacts, 'name', orderDirection),
      }),
    )
    return orderBy(groupedContacts, 'groupName', orderDirection)
  }

  function ContactAvatar({ name }: { name: string }) {
    return (
      <Box
        marginRight={24}
        backgroundColor="var(--contacts-odd-numbered-row)"
        padding={6}
        borderRadius="100%"
        width={26}
        height={26}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {name
          .split(' ')
          .map(word => word[0])
          .join('')}
      </Box>
    )
  }

  function renderContact(
    address: string,
    chain: string,
    parsedAddress?: string,
  ) {
    return (
      <Box width="100%" key={address} display="flex" className={styles.contact}>
        {' '}
        <div className={styles.address}>
          <Image
            width="22px"
            maxWidth="22px"
            marginRight="12px"
            src={chain === 'neo2' ? OldNeoLogo : NEO_IMAGE}
          />

          <Box display="flex" flexDirection="column" width="300px">
            <span>{address}</span>
            {parsedAddress && (
              <Text marginLeft="4px" opacity={0.5} fontSize="12px">
                {parsedAddress}
              </Text>
            )}
          </Box>
          <CopyToClipboard
            className={styles.copy}
            text={parsedAddress || address}
            tooltip={intl.formatMessage({ id: 'copyAddressTooltip' })}
          />
        </div>
        <Box className={styles.actions} marginLeft="auto">
          <Address address={parsedAddress || address} asWrapper>
            <Button className={styles.infoButton} renderIcon={InfoIcon}>
              <FormattedMessage id="sidebarActivity" />
            </Button>
          </Address>
          <Link
            to={{
              pathname: ROUTES.SEND,
              state: { address: parsedAddress || address },
            }}
            className={styles.settingsDonations}
          >
            <Button className={styles.sendButton} renderIcon={SendIcon}>
              <FormattedMessage id="sidebarSend" />
            </Button>
          </Link>
        </Box>
      </Box>
    )
  }

  return (
    <React.Fragment>
      <HeaderBar shouldRenderRefresh={false} />

      <Panel
        className={styles.contactsPanel}
        renderHeader={() => (
          <Box
            className={styles.headerSelect}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <FormattedMessage id="contactsPageLabel" />

            <Link id="add" className={styles.addButton} to={ROUTES.ADD_CONTACT}>
              <AddIcon className={styles.addIcon} />
              <span>
                <FormattedMessage id="newContact" />
              </span>
            </Link>
          </Box>
        )}
        contentClassName={styles.contactPanelContent}
      >
        <Box height="90%">
          {isEmpty(contacts) ? (
            <div className={styles.emptyContactsContainer}>
              <LogoWithStrikethrough />
            </div>
          ) : (
            <Box height="100%" display="flex">
              <Box width="400px" display="flex">
                <Box
                  display="flex"
                  flexDirection="column"
                  paddingX="12px"
                  width="100%"
                >
                  <Box margin="12px" marginLeft="auto" marginTop="2px">
                    <StyledReactSelect
                      alignValueContainer="flex-end"
                      disabled={isEmpty(contacts)}
                      value={sorting}
                      onChange={handleSort}
                      options={SORTING_OPTIONS}
                      isSearchable={false}
                      transparent
                      hideHighlight
                    />
                  </Box>
                  {getContactsInGroups(contacts, sorting.value).map(
                    ({ groupName, groupContacts }) => (
                      <Box key={`group${groupName}`} width="100%">
                        <div className={styles.groupHeader}>{groupName}</div>
                        {groupContacts.map(({ name }, i) => (
                          <Box
                            height={55}
                            display="flex"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() => setSelectedContact(name)}
                            className={classNames({
                              [styles.contactRow]: true,
                              [styles.active]: name === selectedContact,
                            })}
                          >
                            <Box
                              width="100%"
                              display="flex"
                              key={`contact${name}${i}`}
                              className={classNames(styles.contact, {
                                [styles.oddNumberedRow]: i % 2 === 0,
                              })}
                            >
                              {' '}
                              <ContactAvatar name={name} />
                              {name}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    ),
                  )}
                </Box>
                <Divider orientation="vertical" marginY="18px" />
              </Box>
              {selectedContact && (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-start"
                  padding="24px"
                  width="100%"
                >
                  <Box
                    display="flex"
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <ContactAvatar name={selectedContact} />
                      {selectedContact}
                    </Box>
                    <Box marginLeft="auto">
                      <Button
                        className={styles.editButton}
                        renderIcon={EditIcon}
                        onClick={() => handleEdit(selectedContact)}
                      >
                        <FormattedMessage id="manageWalletsEdit" />
                      </Button>
                    </Box>
                  </Box>
                  <Divider />

                  {findContactAndReturnParsedContact(selectedContact) &&
                    findContactAndReturnParsedContact(selectedContact)
                      .addresses &&
                    findContactAndReturnParsedContact(
                      selectedContact,
                    ).addresses.map(({ address, chain, parsedAddress }) =>
                      renderContact(address, chain, parsedAddress),
                    )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Panel>
    </React.Fragment>
  )
}

export default ContactsPanel
