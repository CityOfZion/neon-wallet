import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BiSolidDownArrow, BiSolidSortAlt, BiSolidUpArrow } from 'react-icons/bi'
import { FiSend } from 'react-icons/fi'
import { MdOutlineContentCopy } from 'react-icons/md'
import { TbPencil, TbPlus } from 'react-icons/tb'
import { IContactState } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { SearchInput } from '@renderer/components/SearchInput'
import { Separator } from '@renderer/components/Separator'
import { StyleHelper } from '@renderer/helpers/StyleHelper'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useContactsSelector } from '@renderer/hooks/useContactSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { MainLayout } from '@renderer/layouts/Main'
import { cloneDeep } from 'lodash'

enum ESidebarOption {
  CONTACTS = 1,
  MY_ACCOUNTS = 2,
}

export const ContactsPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'contacts' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'blockchain' })

  const { modalNavigateWrapper } = useModalNavigate()
  const { contacts } = useContactsSelector()
  const [selectedSidebarOption, setSelectedSidebarOption] = useState(ESidebarOption.CONTACTS)
  const [selectedContact, setSelectedContact] = useState<IContactState | null>(contacts[0] || null)

  const [sortBlockchain, setSortBlockchain] = useState<boolean | null>(null)

  const [search, setSearch] = useState<string | null>(null)

  const isContactSelected = (id: string) => {
    if (!selectedContact) return
    return selectedContact.id === id
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

    if (firstContact) {
      setSelectedContact(firstContact[0])
    } else {
      setSelectedContact(null)
    }

    return groupContactsByFirstLetter
  }, [search, contacts])

  const sortedSelectedContactAddresses = useMemo(() => {
    if (!selectedContact) return

    const addressesCopy = [...selectedContact.addresses]

    if (sortBlockchain === null) {
      return addressesCopy
    }

    if (sortBlockchain) {
      return addressesCopy.sort((a, b) => a.address.localeCompare(b.address))
    }

    return addressesCopy.sort((a, b) => b.address.localeCompare(a.address))
  }, [selectedContact, sortBlockchain])

  const changeBlockchainSort = () => {
    if (sortBlockchain === null) {
      setSortBlockchain(true)
    } else if (sortBlockchain) {
      setSortBlockchain(false)
    } else {
      setSortBlockchain(null)
    }
  }

  const getFirstLastNameInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .filter((_letter, index, array) => index === 0 || index === array.length - 1)
      .join('')
  }
  return (
    <MainLayout
      heading={t('title')}
      rightComponent={
        <IconButton
          icon={<TbPlus className="text-neon" />}
          size="md"
          className="text-neon"
          text={t('buttonAddContactLabel')}
          onClick={modalNavigateWrapper('persist-contact')}
        />
      }
    >
      <section className="bg-gray-800 w-full h-full flex rounded">
        <div className="w-full max-w-[17.188rem] px-2 border-r flex flex-col items-center">
          <div className="flex flex-row justify-between h-15 w-full mb-5 text-1xs">
            <button
              className={StyleHelper.mergeStyles('w-[50%] border-b', {
                'border-b-2': selectedSidebarOption === ESidebarOption.CONTACTS,
              })}
              onClick={() => setSelectedSidebarOption(ESidebarOption.CONTACTS)}
            >
              {t('contactList.contacts')}
            </button>
            <button
              className={StyleHelper.mergeStyles('w-[50%] border-b', {
                'border-b-2': selectedSidebarOption === ESidebarOption.MY_ACCOUNTS,
              })}
              onClick={() => setSelectedSidebarOption(ESidebarOption.MY_ACCOUNTS)}
              disabled
            >
              {t('contactList.myAccounts')}
            </button>
          </div>

          {contacts.length > 0 && (
            <div className="w-full mb-8">
              <SearchInput placeholder={t('contactList.search')} onChange={event => setSearch(event.target.value)} />
            </div>
          )}

          {contacts.length <= 0 && <div>{t('contactList.noContacts')}</div>}

          <section className="w-full h-full overflow-y-auto">
            {groupedContacts &&
              Array.from(groupedContacts.entries()).map(([key, arrValues]) => (
                <div key={key}>
                  <div className="flex bg-asphalt/50 pl-4 text-blue font-bold h-6">{key}</div>
                  {arrValues.map((value, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedContact(value)}
                      className={StyleHelper.mergeStyles(
                        'w-full flex items-center justify-start gap-x-3 h-10 py-4 pl-4 border-l-4 border-transparent',
                        {
                          'bg-gray-900 border-neon': isContactSelected(value.id),
                        }
                      )}
                    >
                      <div
                        className={StyleHelper.mergeStyles(
                          'w-6 h-6 bg-gray-300/30 rounded-full text-sm flex shrink-0 items-center justify-center',
                          {
                            'bg-gray-200 text-gray-800 font-bold': isContactSelected(value.id),
                          }
                        )}
                      >
                        {getFirstLastNameInitials(value.name)}
                      </div>
                      <span className="truncate">{value.name}</span>
                    </button>
                  ))}
                </div>
              ))}
          </section>
        </div>

        {selectedContact && (
          <div className="w-[75%] px-2">
            <div className="flex flex-col h-15 mb-5">
              <div className="w-full flex items-center justify-between px-2">
                {t('addresses')}
                <Button
                  leftIcon={<TbPencil />}
                  label={'Edit'}
                  variant="outlined"
                  colorSchema="neon"
                  clickableProps={{ className: 'border-none' }}
                  onClick={modalNavigateWrapper('persist-contact', { state: { contact: selectedContact } })}
                />
              </div>
              <Separator />
            </div>

            <div className="px-2">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-left text-gray-100 font-bold text-sm">
                    <th>
                      <button
                        className="flex items-center gap-2 px-2 py-2"
                        type="button"
                        onClick={() => changeBlockchainSort()}
                      >
                        {t('addressTable.blockchain')}
                        {sortBlockchain === null && <BiSolidSortAlt className="text-gray-200" />}
                        {sortBlockchain === false && <BiSolidDownArrow className="text-gray-200" />}
                        {sortBlockchain && <BiSolidUpArrow className="text-gray-200" />}
                      </button>
                    </th>
                    <th>{t('addressTable.address')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedContact &&
                    sortedSelectedContactAddresses &&
                    sortedSelectedContactAddresses.map((address, index) => {
                      return (
                        <tr key={index} className="even:bg-gray-600 h-12 align-middle">
                          <td>
                            <div className="flex flex-row items-center px-2">
                              <div className="mr-2 bg-gray-700 p-2 rounded-full">
                                <BlockchainIcon blockchain={address.blockchain} type="white" />
                              </div>
                              {commonT(address.blockchain)}
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center">
                              {address.address}
                              <IconButton
                                icon={<MdOutlineContentCopy className="text-neon" />}
                                size="md"
                                onClick={() => UtilsHelper.copyToClipboard(address.address)}
                              />
                            </div>
                          </td>
                          <td>
                            <button className="flex flex-row items-center px-2 w-full justify-end" disabled>
                              <IconButton icon={<FiSend className="text-neon" />} size="md" disabled />
                              {t('addressTable.sendAssets')}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  )
}
