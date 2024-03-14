import { useTranslation } from 'react-i18next'
import { Outlet, useMatch } from 'react-router-dom'
import { Stepper } from '@renderer/components/Stepper'
import { WelcomeLayout } from '@renderer/layouts/Welcome'

export const WelcomeImportWalletPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcomeImportWallet' })

  const match = useMatch('/:path/:currentStep')
  const currentStep = match ? Number(match.params.currentStep) : 1

  return (
    <WelcomeLayout heading={t('title')} withBackButton={currentStep <= 3} className="overflow-hidden px-8">
      <Stepper steps={t('steps', { returnObjects: true })} className="my-14" currentStep={currentStep} />

      <div className="px-8 flex flex-col flex-grow min-h-0 w-full items-center">
        <Outlet />
      </div>
    </WelcomeLayout>
  )
}
