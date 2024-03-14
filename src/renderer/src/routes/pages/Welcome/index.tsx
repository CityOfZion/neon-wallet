import { useTranslation } from 'react-i18next'
import { MdOutlineShield } from 'react-icons/md'
import { Link } from '@renderer/components/Link'
import { WelcomeLayout } from '@renderer/layouts/Welcome'

import { WelcomeCard } from './WelcomeCard'

export const WelcomePage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'welcome' })

  return (
    <WelcomeLayout heading={t('title')} bigger className="relative">
      <Link to="/welcome-import-wallet/1" className="absolute right-16" label="Import wallet" variant="text" />

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
          to="/welcome-security-setup"
          label={t('setupSecurityButtonLabel')}
          leftIcon={<MdOutlineShield />}
          variant="contained"
        />
      </div>
    </WelcomeLayout>
  )
}
