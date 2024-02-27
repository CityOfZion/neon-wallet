import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSend } from 'react-icons/fi'
import { MdOutlineContentCopy } from 'react-icons/md'
import { TbPencil, TbPlus } from 'react-icons/tb'
import { IContactState } from '@renderer/@types/store'
import { BlockchainIcon } from '@renderer/components/BlockchainIcon'
import { Button } from '@renderer/components/Button'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { SortIcon } from '@renderer/components/SortIcon'
import { Tabs } from '@renderer/components/Tabs'
import { UtilsHelper } from '@renderer/helpers/UtilsHelper'
import { useContactsSelector } from '@renderer/hooks/useContactSelector'
import { useModalNavigate } from '@renderer/hooks/useModalRouter'
import { MainLayout } from '@renderer/layouts/Main'

import { ContactsTabContent } from './ContactsTabContent'

enum ESidebarOption {
  CONTACTS = 'CONTACTS',
  MY_ACCOUNTS = 'MY_ACCOUNTS',
}

export const ContactsPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'contacts' })
  const { t: commonT } = useTranslation('common', { keyPrefix: 'blockchain' })

  const { modalNavigateWrapper } = useModalNavigate()
  const { contacts } = useContactsSelector()
  const [selectedContact, setSelectedContact] = useState<IContactState | null>(contacts[0] || null)

  const [sortBlockchain, setSortBlockchain] = useState<boolean | null>(null)

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

  useEffect(() => {
    setSortBlockchain(null)
  }, [selectedContact])

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
        <div className="w-full max-w-[17.188rem] px-2 border-r border-gray-300/15 flex flex-col items-center">
          <Tabs.Root defaultValue={ESidebarOption.CONTACTS} className="w-full">
            <Tabs.List className="w-full mt-3 mb-7">
              <Tabs.Trigger value={ESidebarOption.CONTACTS} className="px-8">
                {t('contactList.contacts')}
              </Tabs.Trigger>
              <Tabs.Trigger value={ESidebarOption.MY_ACCOUNTS} className="px-8" disabled>
                {t('contactList.myAccounts')}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={ESidebarOption.CONTACTS}>
              <ContactsTabContent onContactSelected={setSelectedContact} />
            </Tabs.Content>
          </Tabs.Root>
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
                        <SortIcon selected={sortBlockchain} />
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
