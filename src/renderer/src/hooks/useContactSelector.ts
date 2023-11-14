import { useMemo } from 'react'

import { useAppSelector } from './useRedux'

export const useContactsSelector = () => {
  const { ref, value } = useAppSelector(state => state.contact.data)
  return {
    contacts: value,
    contactsRef: ref,
  }
}

export const useContactByIdSelector = (id: string) => {
  const { value, ref } = useAppSelector(state => state.contact.data)

  const contactById = useMemo(() => value.find(contact => contact.id === id), [value, id])

  const contactByIdRef = useMemo(() => ref.current.find(contact => contact.id === id), [ref, id])

  return {
    contactById,
    contactByIdRef,
  }
}
