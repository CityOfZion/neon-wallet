// @flow
import React, { useContext, useEffect } from 'react'
import { getStorage, setStorage } from '../../core/storage'

type ContactInfo = {
  address: string,
  chain: string,
}

type Contacts = {
  [name: string]: ContactInfo[],
}

type ContactsContextType = {
  contacts: Contacts,
  updateContacts: (contactName: string, data: ContactInfo[]) => Promise<any>,
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

  const updateContacts = async (contactName: string, data: ContactInfo[]) => {
    const contacts = await getContacts()
    const newContacts = { ...contacts, [contactName]: data }
    await saveContacts(newContacts)
    await setContacts(newContacts)
  }

  const deleteContact = async (
    contactName: string,
    addressToDelete?: string,
    isFullDelete = false,
  ) => {
    const contacts = await getContacts()
    const contact = contacts[contactName]
    if (contact) {
      if (isFullDelete) {
        delete contacts[contactName]
      } else {
        const newContacts = {
          ...contacts,
          [contactName]: contact.filter(
            ({ address }) => address !== addressToDelete,
          ),
        }
        await saveContacts(newContacts)
        await setContacts(newContacts)
      }
    }
  }

  useEffect(() => {
    const init = async () => {
      const contacts = await getContacts()
      setContacts(contacts)
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
