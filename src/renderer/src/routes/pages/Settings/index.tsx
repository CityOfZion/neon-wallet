import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BsCash } from 'react-icons/bs'
import { MdOutlineLanguage, MdOutlineListAlt, MdOutlineLock, MdOutlineSave } from 'react-icons/md'
import { RiShapesLine } from 'react-icons/ri'
import { Tb3DCubeSphere, TbReload } from 'react-icons/tb'
import { MainLayout } from '@renderer/layouts/Main'

import { SettingsSidebarLink } from '../../../components/Sidebar/SettingsSidebarLink'

enum SettingsSidebarOption {
  PERSONALISATION = 1,
  SECURITY = 2,
}

enum SettingsPersonalisationOption {
  NETWORK_CONFIGURATION = 1,
  CURRENCY = 2,
  LANGUAGE = 3,
  THEME = 4,
  RELEASE_NOTES = 5,
}

enum SettingsSecurityOption {
  ENCRYPT_KEY = 1,
  RECOVER_WALLET = 2,
  BACKUP_WALLET = 3,
}

export const SettingsPage = () => {
  const { t } = useTranslation('pages', { keyPrefix: 'settings' })

  const [selectedSidebarOption, setSelectedSidebarOption] = useState(SettingsSidebarOption.PERSONALISATION)
  const [selectedPersonalisationOption, setSelectedPersonalisationOption] = useState(
    SettingsPersonalisationOption.NETWORK_CONFIGURATION
  )
  const [selectedSecurityOption, setSelectedSecurityOption] = useState(SettingsSecurityOption.ENCRYPT_KEY)

  const handlePersonalisationClick = (id: SettingsPersonalisationOption) => {
    setSelectedPersonalisationOption(id)
  }

  const handleSecurityClick = (id: SettingsSecurityOption) => {
    setSelectedSecurityOption(id)
  }

  return (
    <MainLayout heading={t('title')}>
      <section className="bg-gray-800 w-full h-full flex rounded">
        <div className="w-[25%] px-2 border-r flex flex-col items-center">
          <div className="flex flex-row justify-between h-15 w-full mb-5 text-[10px]">
            <button
              className={`w-[50%] border-b ${
                selectedSidebarOption === SettingsSidebarOption.PERSONALISATION ? 'border-b-2' : 'text-gray-300'
              }`}
              onClick={() => setSelectedSidebarOption(SettingsSidebarOption.PERSONALISATION)}
            >
              {t('sidebarOption.personalisation')}
            </button>
            <button
              className={`w-[50%] border-b ${
                selectedSidebarOption === SettingsSidebarOption.SECURITY ? 'border-b-2' : 'text-gray-300'
              }`}
              onClick={() => setSelectedSidebarOption(SettingsSidebarOption.SECURITY)}
            >
              {t('sidebarOption.security')}
            </button>
          </div>
          <nav className="flex flex-row justify-between h-15 w-full mb-5 text-[14px]">
            <ul className="max-w-full w-full">
              {selectedSidebarOption === SettingsSidebarOption.PERSONALISATION && (
                <div>
                  <SettingsSidebarLink
                    id={SettingsPersonalisationOption.NETWORK_CONFIGURATION}
                    title={t('personalisationOption.networkConfiguration')}
                    icon={<Tb3DCubeSphere />}
                    onClick={() => handlePersonalisationClick(SettingsPersonalisationOption.NETWORK_CONFIGURATION)}
                    selectedId={selectedPersonalisationOption}
                  />
                  <SettingsSidebarLink
                    id={SettingsPersonalisationOption.CURRENCY}
                    title={t('personalisationOption.currency')}
                    icon={<BsCash />}
                    onClick={() => handlePersonalisationClick(SettingsPersonalisationOption.CURRENCY)}
                    selectedId={selectedPersonalisationOption}
                  />
                  <SettingsSidebarLink
                    id={SettingsPersonalisationOption.LANGUAGE}
                    title={t('personalisationOption.language')}
                    icon={<MdOutlineLanguage />}
                    onClick={() => handlePersonalisationClick(SettingsPersonalisationOption.LANGUAGE)}
                    selectedId={selectedPersonalisationOption}
                  />
                  <SettingsSidebarLink
                    id={SettingsPersonalisationOption.THEME}
                    title={t('personalisationOption.theme')}
                    icon={<RiShapesLine />}
                    onClick={() => handlePersonalisationClick(SettingsPersonalisationOption.THEME)}
                    selectedId={selectedPersonalisationOption}
                  />
                  <SettingsSidebarLink
                    id={SettingsPersonalisationOption.RELEASE_NOTES}
                    title={t('personalisationOption.releaseNotes')}
                    icon={<MdOutlineListAlt />}
                    onClick={() => handlePersonalisationClick(SettingsPersonalisationOption.RELEASE_NOTES)}
                    selectedId={selectedPersonalisationOption}
                  />
                </div>
              )}
              {selectedSidebarOption === SettingsSidebarOption.SECURITY && (
                <div>
                  <SettingsSidebarLink
                    id={SettingsSecurityOption.ENCRYPT_KEY}
                    title={t('securityOption.encryptKey')}
                    icon={<MdOutlineLock />}
                    onClick={() => handleSecurityClick(SettingsSecurityOption.ENCRYPT_KEY)}
                    selectedId={selectedSecurityOption}
                  />
                  <SettingsSidebarLink
                    id={SettingsSecurityOption.RECOVER_WALLET}
                    title={t('securityOption.recoverWallet')}
                    icon={<TbReload />}
                    onClick={() => handleSecurityClick(SettingsSecurityOption.RECOVER_WALLET)}
                    selectedId={selectedSecurityOption}
                  />
                  <SettingsSidebarLink
                    id={SettingsSecurityOption.BACKUP_WALLET}
                    title={t('securityOption.backupWallet')}
                    icon={<MdOutlineSave />}
                    onClick={() => handleSecurityClick(SettingsSecurityOption.BACKUP_WALLET)}
                    selectedId={selectedSecurityOption}
                  />
                </div>
              )}
            </ul>
          </nav>
        </div>
      </section>
    </MainLayout>
  )
}
