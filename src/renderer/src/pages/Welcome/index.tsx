import { useTranslation } from 'react-i18next'
import { MdLockOutline, MdStarOutline } from 'react-icons/md'
import { Button } from '@renderer/components/Button'
import { Link } from '@renderer/components/Link'
import { WelcomeLayout } from '@renderer/layouts/Welcome'

import { WelcomeCard } from './WelcomeCard'

export const WelcomePage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcome' })

  return (
    <WelcomeLayout heading={t('title')} bigger>
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
        <Link
          to="/security-setup"
          label={t('setupSecurityButtonLabel')}
          leftIcon={<MdLockOutline />}
          variant="contained"
        />
        <Button label={t('skipSecurityButtonLabel')} leftIcon={<MdStarOutline />} variant="outlined" />
      </div>
    </WelcomeLayout>
  )
}
