import { Fragment, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbCheck } from 'react-icons/tb'
import { IContactState } from '@renderer/@types/store'
import { SearchInput } from '@renderer/components/SearchInput'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { useContactsSelector } from '@renderer/hooks/useContactSelector'
import { cloneDeep } from 'lodash'

import { Separator } from '../Separator'

type TProps = {
  onContactSelected: (contact: IContactState | null) => void
  selectFirst: boolean
  showSelectedIcon: boolean
  children?: React.ReactNode
}

export const ContactList = ({ onContactSelected, selectFirst, showSelectedIcon, children }: TProps) => {
  const { t: contactT } = useTranslation('components', { keyPrefix: 'contacts' })
  const { contacts } = useContactsSelector()
  const [search, setSearch] = useState<string | null>(null)
  const [selectedContact, setSelectedContact] = useState<IContactState | null>(selectFirst ? contacts[0] || null : null)

  onContactSelected(selectedContact)

  const isContactSelected = (id: string) => {
    if (!selectedContact) return
    return selectedContact.id === id
  }

  const getFirstLastNameInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .filter((_letter, index, array) => index === 0 || index === array.length - 1)
      .join('')
  }

  const groupedContacts = useMemo(() => {
    let filteredContacts = cloneDeep(contacts)

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
    } else {
      setSelectedContact(null)
    }

    return groupContactsByFirstLetter
  }, [contacts, search, selectFirst])

  return (
    <Fragment>
      <div className="px-2 flex flex-col h-full items-center">
        <div className="mb-8 w-full">
          <SearchInput placeholder={contactT('search')} onChange={event => setSearch(event.target.value)} />
        </div>

        {groupedContacts.size <= 0 && <div>{contactT('noContacts')}</div>}

        <section className="w-full overflow-y-auto flex-grow flex flex-col basis-0">
          {groupedContacts &&
            Array.from(groupedContacts.entries()).map(([key, arrValues]) => (
              <div key={key}>
                <div className="flex bg-asphalt/50 pl-4 text-blue font-bold h-6 items-center">{key}</div>
                {arrValues.map((value, index) => (
                  <Fragment key={index}>
                    <button
                      onClick={() => setSelectedContact(value)}
                      className={StyleHelper.mergeStyles(
                        'w-full flex items-center justify-between h-10 py-4 pl-2 border-l-4 border-transparent',
                        {
                          'bg-gray-900 border-neon': isContactSelected(value.id),
                        }
                      )}
                    >
                      <div className="flex items-center">
                        <div
                          className={StyleHelper.mergeStyles(
                            'w-6 h-6 bg-gray-300/30 rounded-full text-sm flex items-center justify-center',
                            {
                              'bg-gray-200 text-gray-800': isContactSelected(value.id),
                            }
                          )}
                        >
                          {getFirstLastNameInitials(value.name)}
                        </div>
                        <span className="pl-2">{value.name}</span>
                      </div>
                      {isContactSelected(value.id) && showSelectedIcon && (
                        <TbCheck className="text-neon h-4 w-4 mr-3" />
                      )}
                    </button>
                    {index !== arrValues.length - 1 && (
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
