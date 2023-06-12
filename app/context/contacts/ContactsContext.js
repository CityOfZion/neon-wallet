// @flow
import React, { useContext, useEffect } from 'react'
import { BSNeo3 } from '@cityofzion/bs-neo3'

import { getStorage, setStorage } from '../../core/storage'

export type ContactInfo = {
  address: string,
  chain: string,
  // this key is dynamic and based on the current
  // response of the NNS contract at runtime
  parsedAddress?: string,
}

export type Contacts = {
  [name: string]: ContactInfo[],
}

type ContactsContextType = {
  contacts: Contacts,
  updateContacts: (contactName: string, data: ContactInfo[]) => Promise<any>,
  deleteContact: (contactName: string) => Promise<any>,
}

const STORAGE_KEY = 'multi-chain-address-book'

export const ContactsContext = React.createContext<ContactsContextType>({})
export const useContactsContext = () => useContext(ContactsContext)

// TODO: create a migration script that will migrate the old address book to the new one
// and ensure type safety

export const ContactsContextProvider = ({
  children,
}: {
  children: React$Node,
}) => {
  const [contacts, setContacts] = React.useState({})
  const getContacts = async (): Promise<Contacts> => getStorage(STORAGE_KEY)

  const saveContacts = async (contacts: Contacts): Promise<any> =>
    setStorage(STORAGE_KEY, contacts)

  async function fetchPotentialNameServiceAddresses(contacts: Contacts) {
    const NeoBlockChainService = new BSNeo3()
    const newContacts = {}
    // eslint-disable-next-line guard-for-in
    for (const contactName in contacts) {
      const contactInfo = contacts[contactName]
      const newContactInfo = []
      for (const contact of contactInfo) {
        const { address, chain } = contact
        let parsedAddress
        if (address.includes('.neo')) {
          const results = await NeoBlockChainService.getOwnerOfNNS(address)
          parsedAddress = results
        }
        newContactInfo.push({ address, chain, parsedAddress })
      }
      newContacts[contactName] = newContactInfo
    }
    setContacts(newContacts)
  }

  const updateContacts = async (contactName: string, data: ContactInfo[]) => {
    // scrub the data of all parsedAddress fields
    const scrubbedData = data.map(contact => {
      const { parsedAddress, ...rest } = contact
      return rest
    })
    const contacts = await getContacts()
    const newContacts = { ...contacts, [contactName]: scrubbedData }
    await saveContacts(newContacts)
    await fetchPotentialNameServiceAddresses(newContacts)
  }

  const deleteContact = async (contactName: string) => {
    const contacts = await getContacts()
    const newContacts = { ...contacts }
    delete newContacts[contactName]
    await saveContacts(newContacts)
    fetchPotentialNameServiceAddresses(newContacts)
  }

  useEffect(() => {
    const init = async () => {
      const contacts = await getContacts()
      await fetchPotentialNameServiceAddresses(contacts)
    }
    init()
  }, [])

  const contextValue = {
    updateContacts,
    deleteContact,
    contacts,
  }

  return (
    <ContactsContext.Provider value={contextValue}>
      {children}
    </ContactsContext.Provider>
  )
}
