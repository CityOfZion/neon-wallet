import { useTranslation } from 'react-i18next'
import { MdLockOutline, MdStarOutline } from 'react-icons/md'
import { Button } from '@renderer/components/Button'
import { WelcomeLayout } from '@renderer/layouts/Welcome'

import { WelcomeCard } from './WelcomeCard'

export const WelcomePage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcome' })

  return (
    <WelcomeLayout title={t('title')} bigger>
      <ul className="flex gap-x-12 mt-14 flex-grow ">
        <li>
          <WelcomeCard />
        </li>

        <li>
          <WelcomeCard />
        </li>

        <li>
          <WelcomeCard />
        </li>

        <li>
          <WelcomeCard />
        </li>
      </ul>

      <div className="flex gap-x-5 ">
        <Button label={t('setupSecurityButtonLabel')} leftIcon={<MdLockOutline />} variant="contained" />
        <Button label={t('createWalletButtonLabel')} leftIcon={<MdStarOutline />} variant="outlined" />
      </div>
    </WelcomeLayout>
  )
}
