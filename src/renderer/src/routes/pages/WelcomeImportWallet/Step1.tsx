import { useNavigate } from 'react-router-dom'

import { WelcomeSecuritySetupStep1Page } from '../WelcomeSecuritySetup/Step1'

export const WelcomeImportWalletStep1Page = () => {
  const navigate = useNavigate()

  const handleSubmit = async (password: string) => {
    navigate('/welcome-import-wallet/2', { state: { password } })
  }

  return <WelcomeSecuritySetupStep1Page onSubmit={handleSubmit} />
}
