import { useAppSelector } from './useRedux'

export const useEncryptedPasswordSelector = () => {
  const { ref, value } = useAppSelector(state => state.settings.encryptedPassword)
  return {
    encryptedPassword: value,
    encryptedPasswordRef: ref,
  }
}
