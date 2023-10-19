import { useTranslation } from 'react-i18next'
import { Outlet, useMatch } from 'react-router-dom'
import { Stepper } from '@renderer/components/Stepper'
import { WelcomeLayout } from '@renderer/layouts/Welcome'

export const SecuritySetupPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'securitySetup' })

  const match = useMatch('/:path/:currentStep')
  const currentStep = match ? Number(match.params.currentStep) : 1

  return (
    <WelcomeLayout title={t('title')} withBackButton={currentStep !== undefined && currentStep < 3}>
      <Stepper steps={t('steps', { returnObjects: true })} className="my-14" currentStep={currentStep} />

      <Outlet />
    </WelcomeLayout>
  )
}
