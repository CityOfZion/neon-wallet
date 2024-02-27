import { IContactState } from '@renderer/@types/store'
import { ContactList } from '@renderer/components/Contact/ContactList'

type TProps = {
  onContactSelected?: (contact: IContactState | null) => void
}

export const ContactsTabContent = ({ onContactSelected }: TProps) => {
  return (
    <div className="">
      <ContactList onContactSelected={onContactSelected} selectFirst={true} showSelectedIcon={false} />
    </div>
  )
}
