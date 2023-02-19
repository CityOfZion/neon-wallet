// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import fs from 'fs'

import { recoverWallet } from '../../modules/generateWallet'
import { useSettingsContext } from '../../context/settings/SettingsContext'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import styles from './Settings.scss'
import {
  CURRENCIES,
  ROUTES,
  MODAL_TYPES,
  DISCORD_INVITE_LINK,
  THEMES,
  LANGUAGES,
  COZ_DONATIONS_ADDRESS,
} from '../../core/constants'
import Panel from '../../components/Panel'

import LockIcon from '../../assets/icons/lock.svg'
import CurrencyIcon from '../../assets/icons/money.svg'
import LightbulbIcon from '../../assets/icons/lightbulb-icon.svg'
import CogIcon from '../../assets/icons/cog-icon.svg'
import TimeIcon from '../../assets/icons/time-icon.svg'
import Gift from '../../assets/icons/gift.svg'
import Flag from '../../assets/icons/flag.svg'
import CheckMarkIcon from '../../assets/icons/alternate-check.svg'
import { ReleaseNotes } from '../../components/Modals/ReleaseNotesModal/ReleaseNotesModal'

const { shell, ipcRenderer } = require('electron')

export const loadWalletRecovery = async (
  showSuccessNotification: Object => any,
  showErrorNotification: Object => any,
  setAccounts: (Array<Object>) => any,
  setN3Accounts: (Array<Object>) => any,
  chain: string,
) => {
  const { canceled, filePaths } = await ipcRenderer.invoke(
    'dialog',
    'showOpenDialog',
    { properties: ['openFile'] },
  )
  if (canceled || !filePaths) return

  const filepath = filePaths[0]
  fs.readFile(filepath, 'utf-8', async (err, data) => {
    if (err) {
      showErrorNotification({
        message: `An error occurred reading the file: ${err.message}`,
      })
      return
    }
    const walletData = JSON.parse(data)
    const recoveryData = await recoverWallet(walletData, chain).catch(err => {
      showErrorNotification({
        message: `An error occurred recovering wallet: ${err.message}`,
      })
    })

    if (recoveryData) {
      showSuccessNotification({ message: 'Recovery was successful.' })
      if (chain === 'neo2') return setAccounts(recoveryData.accounts)
      return setN3Accounts(recoveryData.accounts)
    }
  })
}

const CURRENCY_OPTIONS = Object.keys(CURRENCIES).map(key => ({
  value: key,
  label: `${key.toUpperCase()} ${CURRENCIES[key].symbol}`,
}))

const LANGUAGE_OPTIONS = Object.keys(LANGUAGES).map(key => ({
  value: LANGUAGES[key].value,
  label: LANGUAGES[key].label,
  renderFlag: LANGUAGES[key].renderFlag,
}))

const SETTINGS_TABS: {
  [key: string]: {
    label: string,
    renderIcon: () => React$Element<any> | null,
  },
} = {
  NETWORK_CONFIGURATION: {
    label: 'Network Configuration',
    renderIcon: () => <CogIcon />,
  },
  CURRENCY: {
    label: 'Currency',
    renderIcon: () => <CurrencyIcon />,
  },
  LANGUAGE: {
    label: 'Language',
    renderIcon: () => <Flag />,
  },
  THEME: {
    label: 'Theme',
    renderIcon: () => <LightbulbIcon />,
  },
  RELEASE_NOTES: { label: 'Release Notes', renderIcon: () => <Gift /> },
}

const SETTINGS_LINKS = {
  ENCRYPT_KEY: {
    label: 'Encrypt Key',
    url: ROUTES.ENCRYPT,
    renderIcon: () => <LockIcon />,
  },
  RECOVER_WALLET: {
    label: 'Recover Wallet',
    url: ROUTES.ENCRYPT,
    renderIcon: () => <TimeIcon />,
  },
}

export default function NewSettings({
  net,
  networkId,
  loadWalletData,
  handleNetworkChange,
  showModal,
  saveSelectedNode,
}: {
  net: string,
  networkId: string,
  loadWalletData: Function,
  handleNetworkChange: Function,
  showModal: Function,
  saveSelectedNode: Function,
}) {
  const { settings } = useSettingsContext()

  const [activeTab, setActiveTab] = React.useState(
    SETTINGS_TABS.NETWORK_CONFIGURATION,
  )

  const openDiscordLink = () => shell.openExternal(DISCORD_INVITE_LINK)

  return (
    <section className={styles.settingsContainer}>
      <HeaderBar chain={settings?.chain} networkId={networkId} net={net} />

      <Panel
        className={styles.settingsPanel}
        renderHeader={() => (
          <div className={styles.settingsPanelHeader}>
            <div className={styles.settingsPanelHeaderItem}>
              <FormattedMessage id="sidebarSettings" />
            </div>
            <div className={styles.settingsPanelHeaderItem}>
              <div>
                NEO Discord:{' '}
                <a onClick={openDiscordLink}>{DISCORD_INVITE_LINK}</a>
              </div>
            </div>
          </div>
        )}
        contentClassName={styles.panelContent}
      >
        <Box display="flex">
          <Box
            margin="24px 12px 12px 12px"
            borderRight="solid thin #5c677f"
            width={375}
            maxWidth={400}
          >
            {/* $FlowFixMe */}
            {Object.values(SETTINGS_TABS).map(({ label, renderIcon }) => (
              <Box
                cursor="pointer"
                padding={12}
                key={label}
                _hover={{ color: 'var(--input-active-border)' }}
                color={
                  label === activeTab.label ? 'var(--input-active-border)' : ''
                }
                className={styles.settingsTabWrapper}
                onClick={() =>
                  setActiveTab(
                    /* $FlowFixMe */
                    Object.values(SETTINGS_TABS).find(
                      /* $FlowFixMe */
                      t => t?.label === label,
                    ) || SETTINGS_TABS.NETWORK_CONFIGURATION,
                  )
                }
              >
                <Box display="flex" alignItems="center">
                  <Box
                    className={
                      label === activeTab.label
                        ? styles.activeSettingsIconContainer
                        : styles.settingsIconContainer
                    }
                    mr="12px"
                  >
                    {renderIcon()}
                  </Box>
                  {label}
                </Box>
              </Box>
            ))}

            <Box margin="12px 0" borderTop="solid thin #5c677f">
              <Box marginTop="12px" />

              {/* $FlowFixMe */}
              {Object.values(SETTINGS_LINKS).map(({ label, renderIcon }) => (
                <Box
                  cursor="pointer"
                  className={styles.settingsTabWrapper}
                  padding={12}
                  key={label}
                  display="flex"
                  alignItems="center"
                >
                  <Box mr="12px" className={styles.settingsIconContainer}>
                    {renderIcon()}
                  </Box>
                  {label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box display="flex" margin="24px" width="100%">
            {/* $FlowFixMe */}
            <ActiveSettingsTab
              net={net}
              activeTab={activeTab}
              loadWalletData={loadWalletData}
              handleNetworkChange={handleNetworkChange}
              showModal={showModal}
              saveSelectedNode={saveSelectedNode}
            />
          </Box>
        </Box>
        <Box marginTop="100px">
          <Link
            to={{
              pathname: ROUTES.SEND,
              state: { address: COZ_DONATIONS_ADDRESS },
            }}
            className={styles.settingsDonations}
          >
            <FormattedMessage id="settingsDonationLink" />{' '}
            {COZ_DONATIONS_ADDRESS}
          </Link>
        </Box>
      </Panel>
    </section>
  )
}

function SettingsOptions({
  activeTab,
  options,
  updateSettings,
  selectedSetting,
  settingName,
  renderOption,
  settingsOptionWrapperClassName = styles.settingsOptionWrapper,
}: {
  activeTab: {
    label: string,
    renderIcon: () => React$Element<any> | null,
  },
  options: string[],
  selectedSetting: string,
  updateSettings: ({ [key: string]: string }) => void,
  settingName: string,
  renderOption?: Function,
  settingsOptionWrapperClassName?: string,
}) {
  const { settings } = useSettingsContext()
  return (
    <Box width="100%">
      <Box
        paddingBottom={12}
        width="100%"
        borderBottom="solid thin #5c677f"
        marginBottom="12px"
        color="var(--input-active-border)"
      >
        {activeTab.label}
      </Box>
      <Box maxHeight="300px" height="300px" overflow="auto">
        {options.map((option, i) => (
          <Box
            padding="12px 12px 12px 0"
            key={i}
            borderBottom={
              settings?.theme === THEMES.LIGHT
                ? 'solid thin #5c677f1b'
                : 'solid thin #394152e6'
            }
            cursor="pointer"
            className={settingsOptionWrapperClassName}
            maxWidth={850}
            onClick={() => updateSettings({ [settingName]: option })}
          >
            <Box
              marginLeft={24}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {renderOption ? renderOption(option) : option}

              {option === selectedSetting && (
                <Box className={styles.activeSettingCheckWrapper}>
                  <CheckMarkIcon />
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function ActiveSettingsTab({
  activeTab,
  net,
  handleNetworkChange,
  showModal,
  saveSelectedNode,
}: {
  activeTab: {
    label: string,
    renderIcon: () => React$Element<any> | null,
  },
  net: string,
  handleNetworkChange: Function,
  showModal: Function,
  saveSelectedNode: Function,
}) {
  const { settings, setSetting } = useSettingsContext()

  const selectedNetworkSetting = () => {
    if (net === 'MainNet') {
      return 'MainNet (default)'
    }
    if (net === 'TestNet') {
      return 'TestNet'
    }
    return 'Custom'
  }

  switch (activeTab.label) {
    case SETTINGS_TABS.NETWORK_CONFIGURATION.label:
      return (
        <SettingsOptions
          settingName="network"
          activeTab={activeTab}
          /* $FlowFixMe */
          options={['MainNet (default)', 'TestNet', 'Custom']}
          selectedSetting={selectedNetworkSetting()}
          /* $FlowFixMe */
          updateSettings={({ network }) => {
            if (network === 'Custom') {
              return showModal(MODAL_TYPES.CUSTOM_NETWORK, {
                handleAddCustomNetwork: url => {
                  saveSelectedNode({ url, net: 'Custom' })
                  handleNetworkChange('Custom')
                },
              })
            }

            handleNetworkChange(network === 'MainNet (default)' ? '1' : '2')
          }}
        />
      )

    case SETTINGS_TABS.THEME.label:
      return (
        <SettingsOptions
          settingName="theme"
          activeTab={activeTab}
          /* $FlowFixMe */
          options={Object.values(THEMES)}
          selectedSetting={settings?.theme}
          /* $FlowFixMe */
          updateSettings={({ theme }) => setSetting({ theme })}
        />
      )

    case SETTINGS_TABS.CURRENCY.label:
      return (
        <SettingsOptions
          settingName="currency"
          activeTab={activeTab}
          options={CURRENCY_OPTIONS.map(({ label }) => label)}
          selectedSetting={
            /* $FlowFixMe */
            CURRENCY_OPTIONS.find(({ value }) => value === settings.currency)
              ?.label
          }
          /* $FlowFixMe */
          updateSettings={async ({ currency }) => {
            const nextCurrency = CURRENCY_OPTIONS.find(
              option => option.label === currency,
            )?.value
            /* $FlowFixMe */
            await setSetting({ currency: nextCurrency })
          }}
        />
      )

    case SETTINGS_TABS.LANGUAGE.label:
      return (
        <SettingsOptions
          settingName="language"
          renderOption={option => {
            const language = LANGUAGE_OPTIONS.find(
              ({ label }) => label === option,
            )
            /* $FlowFixMe */
            return (
              <Box display="flex" alignItems="center">
                {language?.label}
                <Box
                  display="flex"
                  alignItems="center"
                  marginLeft="12px"
                  className={styles.flagIconContainer}
                >
                  {/*  $FlowFixMe  */}
                  {language?.renderFlag()}
                </Box>
              </Box>
            )
          }}
          activeTab={activeTab}
          options={LANGUAGE_OPTIONS.map(({ label }) => label)}
          settingsOptionWrapperClassName={styles.languageSettingsOptionWrapper}
          selectedSetting={
            /* $FlowFixMe */
            LANGUAGE_OPTIONS.find(({ value }) => value === settings.language)
              ?.label
          }
          /* $FlowFixMe */
          updateSettings={async ({ language }) => {
            const nextLanguage = LANGUAGE_OPTIONS.find(
              option => option.label === language,
            )?.value
            /* $FlowFixMe */
            await setSetting({ language: nextLanguage })
          }}
        />
      )
    case SETTINGS_TABS.RELEASE_NOTES.label:
      return <ReleaseNotes theme={settings.theme} />
    default:
      return (
        <Box width="100%">
          <Box
            paddingBottom={12}
            width="100%"
            borderBottom="solid thin #5c677f"
            marginBottom="12px"
          >
            {activeTab.label}
          </Box>
        </Box>
      )
  }
}
