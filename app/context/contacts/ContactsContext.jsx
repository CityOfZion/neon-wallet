// @flow
import React, { useContext, useEffect } from 'react'
import { BSNeo3 } from '@cityofzion/bs-neo3'

import { shell } from 'electron'
import { getStorage, setStorage } from '../../core/storage'

import style from './ContactsContext.scss'
import { COZ_DISCORD_LINK } from '../../core/constants'

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

export type DeprecatedContact = {
  [name: string]: string,
}

type ContactsContextType = {
  contacts: Contacts,
  updateContacts: (contactName: string, data: ContactInfo[]) => Promise<any>,
  deleteContact: (contactName: string) => Promise<any>,
}

const STORAGE_KEY = 'multi-chain-address-book'

const DEPRECATED_STORAGE_KEY = 'addressBook'
const DEPRECATED_N3_STORAGE_KEY = 'n3AddressBook'

export const ContactsContext = React.createContext<ContactsContextType>({})
export const useContactsContext = () => useContext(ContactsContext)

export const ContactsContextProvider = ({
  children,
  showErrorNotification,
}: {
  children: React$Node,
  showErrorNotification: Function,
}) => {
  const [contacts, setContacts] = React.useState({})

  const getContacts = async (): Promise<Contacts> => {
    try {
      const contacts = await getStorage(STORAGE_KEY)
      const deprecatedLegacyContacts = await getStorage(DEPRECATED_STORAGE_KEY)
      const deprecatedN3Contacts = await getStorage(DEPRECATED_N3_STORAGE_KEY)
      // transform the deprecated contacts into the new format
      const newContacts = {}
      // eslint-disable-next-line guard-for-in
      for (const contactName in deprecatedLegacyContacts) {
        const contactAddress = deprecatedLegacyContacts[contactName]
        if (typeof contactAddress === 'string') {
          newContacts[contactName] = [
            { address: contactAddress, chain: 'neo2' },
          ]
        }
      }
      // eslint-disable-next-line guard-for-in
      for (const contactName in deprecatedN3Contacts) {
        const contactAddress = deprecatedN3Contacts[contactName]
        if (typeof contactAddress === 'string') {
          newContacts[contactName] = [
            { address: contactAddress, chain: 'neo3' },
          ]
        }
      }
      return { ...contacts, ...newContacts }
    } catch (error) {
      setTimeout(() => {
        showErrorNotification({
          message: (
            <div className={style.notification}>
              <p>Error decrypting your contacts. Please contact us on</p>
              <a
                onClick={event => {
                  event.stopPropagation()
                  shell.openExternal(COZ_DISCORD_LINK)
                }}
              >
                discord
              </a>
            </div>
          ),
          autoDismiss: 60 * 5,
        })
      }, 1000)
      throw error
    }
  }

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
    await fetchPotentialNameServiceAddresses(newContacts)
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
