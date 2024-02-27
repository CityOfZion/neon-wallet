import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { Tabs } from '@renderer/components/Tabs'
import { MainLayout } from '@renderer/layouts/Main'

import { SettingsPersonalizationTabContent } from './SettingsPersonalizationTabContent'
import { SettingsSecurityTabContent } from './SettingsSecurityTabContent'

enum ESettingsOptions {
  PERSONALISATION = 'PERSONALISATION',
  SECURITY = 'SECURITY',
}

export const SettingsPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })
  const navigate = useNavigate()

  const handlePersonalisationClick = () => {
    navigate('/settings/personalisation')
  }

  const handleSecurityClick = () => {
    navigate('/settings/security')
  }

  return (
    <MainLayout heading={t('title')}>
      <section className="bg-gray-800 w-full h-full flex rounded">
        <div className="min-w-[17.5rem] max-w-[17.5rem] px-5 border-r flex flex-col items-center">
          <Tabs.Root defaultValue={ESettingsOptions.PERSONALISATION} className="w-full">
            <Tabs.List className="w-full mt-2.5 mb-7">
              <Tabs.Trigger
                value={ESettingsOptions.PERSONALISATION}
                className="px-8"
                onClick={handlePersonalisationClick}
              >
                {t('sidebarOption.personalisation')}
              </Tabs.Trigger>
              <Tabs.Trigger value={ESettingsOptions.SECURITY} className="px-8" onClick={handleSecurityClick}>
                {t('sidebarOption.security')}
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value={ESettingsOptions.PERSONALISATION}>
              <SettingsPersonalizationTabContent />
            </Tabs.Content>
            <Tabs.Content value={ESettingsOptions.SECURITY}>
              <SettingsSecurityTabContent />
            </Tabs.Content>
          </Tabs.Root>
        </div>

        <div className="flex-grow">
          <Outlet />
        </div>
      </section>
    </MainLayout>
  )
}
