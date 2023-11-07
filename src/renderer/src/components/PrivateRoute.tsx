import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from '@renderer/@types/store'
import { useAppSelector } from '@renderer/hooks/useRedux'
import { useEncryptedPasswordSelector } from '@renderer/hooks/useSettingsSelector'

export const PrivateRoute = ({ children }) => {
  const { value: securityType } = useAppSelector((state: RootState) => state.settings.securityType)
  const { encryptedPassword } = useEncryptedPasswordSelector()

  const location = useLocation()

  if (securityType === 'password' && encryptedPassword) {
    return children
  }

  return <Navigate to={'/login'} state={{ from: location.pathname }} />
}
