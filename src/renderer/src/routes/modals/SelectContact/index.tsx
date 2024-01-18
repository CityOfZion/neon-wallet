import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbStepOut } from 'react-icons/tb'
import { IContactState } from '@renderer/@types/store'
import { Button } from '@renderer/components/Button'
import { ContactList } from '@renderer/components/Contact/ContactList'
import { useModalNavigate, useModalState } from '@renderer/hooks/useModalRouter'
import { EndModalLayout } from '@renderer/layouts/EndModal'

type TLocationState = {
  handleSelectContact: (contact: IContactState) => void
}

export const SelectContact = () => {
  const { t } = useTranslation('modals', { keyPrefix: 'selectContact' })
  const [selectedContact, setSelectedContact] = useState<IContactState | null>(null)
  const { modalNavigate } = useModalNavigate()
  const { handleSelectContact } = useModalState<TLocationState>()

  const handleContactSelected = contact => {
    setSelectedContact(contact)
  }

  const selectRecipient = () => {
    if (!selectedContact) {
      return
    }
    handleSelectContact(selectedContact)
    modalNavigate(-1)
  }

  return (
    <EndModalLayout heading={t('title')} headingIcon={<TbStepOut />}>
      <ContactList onContactSelected={handleContactSelected} selectFirst={false} showSelectedIcon={true}>
        <Button
          className="mt-10 w-[16rem]"
          type="submit"
          label={t('selectRecipient')}
          disabled={selectedContact ? false : true}
          onClick={selectRecipient}
        />
      </ContactList>
    </EndModalLayout>
  )
}
