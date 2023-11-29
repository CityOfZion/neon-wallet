import { useTranslation } from 'react-i18next'
import { MdOutlineLock, MdOutlineSave } from 'react-icons/md'
import { TbReload } from 'react-icons/tb'
import { useMatch } from 'react-router-dom'
import { SettingsLayout } from '@renderer/layouts/Settings'

import { SettingsSidebarLink } from './SettingsSidebarLink'

export const SettingsSecurityPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })
  const matchRootEncryptKey = useMatch('/settings/security')

  return (
    <SettingsLayout>
      <SettingsSidebarLink
        title={t('securityOption.encryptKey')}
        icon={<MdOutlineLock />}
        to="/settings/security/encrypt-key"
        match={!!matchRootEncryptKey}
      />
      <SettingsSidebarLink
        title={t('securityOption.recoverWallet')}
        icon={<TbReload />}
        to="/settings/security/recover-wallet"
      />
      <SettingsSidebarLink
        title={t('securityOption.backupWallet')}
        icon={<MdOutlineSave />}
        to="/settings/security/backup-wallet"
      />
    </SettingsLayout>
  )
}
