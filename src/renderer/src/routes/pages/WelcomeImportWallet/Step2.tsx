import { useNavigate } from 'react-router-dom'

import { WelcomeSecuritySetupStep2Page } from '../WelcomeSecuritySetup/Step2'

export const WelcomeImportWalletStep2Page = () => {
  const navigate = useNavigate()

  const handleSubmit = async (password: string) => {
    navigate('/welcome-import-wallet/3', { state: { password } })
  }

  return <WelcomeSecuritySetupStep2Page onSubmit={handleSubmit} />
}
