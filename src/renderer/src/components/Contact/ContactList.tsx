import { Fragment, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbCheck, TbChevronUp } from 'react-icons/tb'
import { TBlockchainServiceKey } from '@renderer/@types/blockchain'
import { IContactState, TContactAddress } from '@renderer/@types/store'
import { SearchInput } from '@renderer/components/SearchInput'
import { StringHelper } from '@renderer/helpers/StringHelper'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useContactsSelector } from '@renderer/hooks/useContactSelector'
import { cloneDeep } from 'lodash'

import { BlockchainIcon } from '../BlockchainIcon'
import { Separator } from '../Separator'

type TProps = {
  onContactSelected?: (contact: IContactState | null) => void
  onAddressSelected?: (address: TContactAddress | null) => void
  selectFirst: boolean
  showSelectedIcon: boolean
  blockchainFilter?: TBlockchainServiceKey
  children?: React.ReactNode
}

export const ContactList = ({
  onContactSelected,
  onAddressSelected,
  selectFirst,
  showSelectedIcon,
  blockchainFilter,
  children,
}: TProps) => {
  const { t: contactT } = useTranslation('components', { keyPrefix: 'contacts' })
  const { contacts } = useContactsSelector()
  const [search, setSearch] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<IContactState | null>(selectFirst ? contacts[0] || null : null)
  const [selectedAddress, setSelectedAddress] = useState<TContactAddress | null>(null)

  const handleAddressSelected = (address: TContactAddress | null) => {
    setSelectedAddress(address)
    onAddressSelected && onAddressSelected(address)
  }

  const handleContactSelected = (contact: IContactState | null) => {
    setSelectedContact(contact)
    onContactSelected && onContactSelected(contact)
  }

  const isContactSelected = (id: string) => {
    if (!selectedContact) return
    return selectedContact.id === id
  }

  const isAddressSelected = (address: string) => {
    if (!selectedAddress) return
    return selectedAddress.address === address
  }

  const getFirstLastNameInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .filter((_letter, index, array) => index === 0 || index === array.length - 1)
      .join('')
  }

  const onContactSelect = (contact: IContactState) => {
    handleAddressSelected(null)
    if (isContactSelected(contact.id)) {
      handleContactSelected(null)
    } else {
      handleContactSelected(contact)
    }
  }

  const onAddressSelect = (address: TContactAddress) => {
    if (isAddressSelected(address?.address)) {
      handleAddressSelected(null)
    } else {
      handleAddressSelected(address)
    }
  }

  const filteredSelectContactAddresses = useMemo(() => {
    let filtered = cloneDeep(selectedContact?.addresses)

    if (blockchainFilter) {
      filtered = filtered?.filter(address => address.blockchain === blockchainFilter)
    }

    return filtered
  }, [selectedContact?.addresses, blockchainFilter])

  const groupedContacts = useMemo(() => {
    let filteredContacts = cloneDeep(contacts)

    if (blockchainFilter) {
      filteredContacts = contacts.filter(contact =>
        contact.addresses.some(address => address.blockchain === blockchainFilter)
      )
    }

    if (search) {
      filteredContacts = contacts.filter(contact =>
        contact.name.toLocaleLowerCase().includes(search.toLocaleLowerCase() as string)
      )
    }

    let groupContactsByFirstLetter = new Map<string, IContactState[]>()
    filteredContacts.forEach(contact => {
      if (!contact.name) return

      const key = contact.name[0].toUpperCase()

      const lastContacts = groupContactsByFirstLetter.get(key) ?? []
      groupContactsByFirstLetter.set(key, [...lastContacts, contact])
    })
    const mapEntriesArray = Array.from(groupContactsByFirstLetter.entries())
    mapEntriesArray.sort((a, b) => a[0].localeCompare(b[0]))
    groupContactsByFirstLetter = new Map(mapEntriesArray)

    const firstContact: IContactState = groupContactsByFirstLetter.values().next().value

    if (firstContact && selectFirst) {
      setSelectedContact(firstContact[0])
      onContactSelected && onContactSelected(firstContact[0])
    } else {
      setSelectedContact(null)
      onContactSelected && onContactSelected(null)
    }

    return groupContactsByFirstLetter
  }, [contacts, onContactSelected, search, selectFirst, blockchainFilter])

  return (
    <Fragment>
      <div className="px-2 flex flex-col w-full h-full items-center">
        <div className="mb-8 w-full">
          <SearchInput placeholder={contactT('search')} onChange={event => setSearch(event.target.value)} compacted />
        </div>

        {groupedContacts.size <= 0 && <div>{contactT('noContacts')}</div>}

        <section className="w-full overflow-y-auto flex-grow flex flex-col gap-y-5 basis-0 text-xs">
          {groupedContacts &&
            Array.from(groupedContacts.entries()).map(([key, arrValues]) => (
              <div key={key}>
                <div className="flex bg-asphalt/50 pl-4 text-blue font-bold h-6 items-center">{key}</div>
                {arrValues.map((value, index) => (
                  <Fragment key={index}>
                    <button
                      onClick={() => onContactSelect(value)}
                      className={StyleHelper.mergeStyles(
                        'w-full flex items-center justify-between h-10 py-4 pl-2 border-l-4 border-transparent hover:border-neon hover:bg-gray-900',
                        {
                          'bg-gray-900 border-neon': isContactSelected(value.id),
                        }
                      )}
                    >
                      <div className="flex w-full items-center">
                        <div
                          className={StyleHelper.mergeStyles(
                            'w-6 h-6 bg-gray-300/30 rounded-full text-sm flex shrink-0 items-center justify-center',
                            {
                              'bg-gray-200 text-gray-800': isContactSelected(value.id),
                            }
                          )}
                        >
                          {getFirstLastNameInitials(value.name)}
                        </div>
                        <span className="pl-2 truncate" title={value.name}>
                          {value.name}
                        </span>
                      </div>
                      {isContactSelected(value.id) && showSelectedIcon && (
                        <TbChevronUp className="text-gray-300 h-4 w-4 mr-3" />
                      )}
                    </button>

                    {isContactSelected(value.id) &&
                      showSelectedIcon &&
                      filteredSelectContactAddresses &&
                      filteredSelectContactAddresses.map((address, addressIndex) => {
                        return (
                          <div key={addressIndex}>
                            <button
                              onClick={() => onAddressSelect(address)}
                              className="pl-[2.3rem] flex w-full items-center justify-between"
                            >
                              <div
                                className={StyleHelper.mergeStyles(
                                  'flex w-full pl-[0.45rem] py-1 items-center hover:bg-gray-900/50',
                                  {
                                    'bg-gray-900/50': isAddressSelected(address.address),
                                    'mb-2': addressIndex === filteredSelectContactAddresses.length - 1,
                                  }
                                )}
                              >
                                <div className="flex w-full">
                                  <div className="flex items-center">
                                    <div className="mr-2 bg-gray-700 p-2 rounded-full">
                                      <BlockchainIcon
                                        className="w-3 h-3"
                                        blockchain={address.blockchain}
                                        type="white"
                                      />
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    {StringHelper.truncateString(address.address, 20)}
                                  </div>
                                </div>
                                {isAddressSelected(address.address) && <TbCheck className="text-neon h-5 w-5 mr-3" />}
                              </div>
                            </button>
                            {addressIndex !== filteredSelectContactAddresses.length - 1 && (
                              <div className="pl-[4.5rem]">
                                <Separator />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    {!(isContactSelected(value.id) && showSelectedIcon && selectedContact) &&
                      index !== arrValues.length - 1 && (
                        <div className="pl-11">
                          <Separator />
                        </div>
                      )}
                  </Fragment>
                ))}
              </div>
            ))}
        </section>
        {children}
      </div>
    </Fragment>
  )
}
