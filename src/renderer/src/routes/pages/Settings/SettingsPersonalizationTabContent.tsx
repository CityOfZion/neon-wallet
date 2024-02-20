import { useTranslation } from 'react-i18next'
import { BsCash } from 'react-icons/bs'
import { MdOutlineLanguage, MdOutlineListAlt } from 'react-icons/md'
import { RiShapesLine } from 'react-icons/ri'
import { Tb3DCubeSphere } from 'react-icons/tb'
import { useMatch } from 'react-router-dom'

import { SettingsSidebarLink } from './SettingsSidebarLink'

export const SettingsPersonalizationTabContent = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })

  const matchRootNetworkConfiguration = useMatch('settings/personalisation')
  const matchRootSettings = useMatch('settings')

  return (
    <nav className="flex flex-row justify-between h-15 w-full mb-5 text-[14px]">
      <ul className="max-w-full w-full">
        <SettingsSidebarLink
          title={t('personalisationOption.networkConfiguration')}
          icon={<Tb3DCubeSphere />}
          to="/settings/personalisation/network-configuration"
          match={!!matchRootNetworkConfiguration || !!matchRootSettings}
        />
        <SettingsSidebarLink
          title={t('personalisationOption.currency')}
          icon={<BsCash />}
          to="/settings/personalisation/currency"
        />
        <SettingsSidebarLink
          title={t('personalisationOption.language')}
          icon={<MdOutlineLanguage />}
          to="/settings/personalisation/language"
        />
        <SettingsSidebarLink
          title={t('personalisationOption.theme')}
          icon={<RiShapesLine />}
          to="/settings/personalisation/theme"
        />
        <SettingsSidebarLink
          title={t('personalisationOption.releaseNotes')}
          icon={<MdOutlineListAlt />}
          to="/settings/personalisation/release-notes"
        />
      </ul>
    </nav>
  )
}
