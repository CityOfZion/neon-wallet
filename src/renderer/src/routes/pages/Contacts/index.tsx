import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbPencil, TbPlus } from 'react-icons/tb'
import { IContactState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { ContactAddressTable } from '@renderer/components/Contact/ContactAddressTable'
import { IconButton } from '@renderer/components/IconButton'
import { Separator } from '@renderer/components/Separator'
import { Tabs } from '@renderer/components/Tabs'
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
  const { t: commonGeneral } = useTranslation('common', { keyPrefix: 'general' })

  const { modalNavigateWrapper } = useModalNavigate()
  const { contacts } = useContactsSelector()
  const [selectedContact, setSelectedContact] = useState<IContactState | null>(contacts[0] || null)

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
          <Tabs.Root defaultValue={ESidebarOption.CONTACTS} className="w-full h-full flex-col flex">
            <Tabs.List className="w-full mt-3 mb-7">
              <Tabs.Trigger value={ESidebarOption.CONTACTS} className="px-8">
                {t('contactList.contacts')}
              </Tabs.Trigger>
              <Tabs.Trigger value={ESidebarOption.MY_ACCOUNTS} className="px-8" disabled>
                {t('contactList.myAccounts')}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={ESidebarOption.CONTACTS} className="h-full">
              <ContactsTabContent onContactSelected={setSelectedContact} />
            </Tabs.Content>
          </Tabs.Root>
        </div>

        {selectedContact && (
          <div className="w-full px-2">
            <div className="flex flex-col gap-y-1 mt-2 mb-5">
              <div className="w-full h-10 flex items-center justify-between px-2">
                {selectedContact.name}
                <Button
                  leftIcon={<TbPencil className="text-neon" />}
                  label={commonGeneral('edit')}
                  variant="text"
                  colorSchema="gray"
                  onClick={modalNavigateWrapper('persist-contact', { state: { contact: selectedContact } })}
                  flat
                />
              </div>
              <Separator />
            </div>

            <ContactAddressTable contactAddresses={selectedContact.addresses} />
          </div>
        )}
      </section>
    </MainLayout>
  )
}
