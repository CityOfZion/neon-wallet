import { useTranslation } from 'react-i18next'
import { Outlet, useMatch } from 'react-router-dom'
import { Stepper } from '@renderer/components/Stepper'
import { WelcomeLayout } from '@renderer/layouts/Welcome'

export const WelcomeImportWalletPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet' })

  const match = useMatch('/:path/:currentStep')
  const currentStep = match ? Number(match.params.currentStep) : 1

  return (
    <WelcomeLayout heading={t('title')} withBackButton={currentStep === 1} className="overflow-hidden">
      <Stepper steps={t('steps', { returnObjects: true })} className="my-14" currentStep={currentStep} />

      <Outlet />
    </WelcomeLayout>
  )
}
