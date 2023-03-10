// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import fs from 'fs'

import { get } from 'lodash-es'
import { getStorage } from '../../core/storage'
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
import Plus from '../../assets/icons/add.svg'
import EditIcon from '../../assets/icons/edit.svg'
import BlockExplorerIcon from '../../assets/icons/node-select.svg'
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
    // shouldDisableOption: (chain: string) => chain === 'neo2',
    shouldDisableOption: () => false,
  },
  CURRENCY: {
    label: 'Currency',
    renderIcon: () => <CurrencyIcon />,
    shouldDisableOption: () => false,
  },
  LANGUAGE: {
    label: 'Language',
    renderIcon: () => <Flag />,
    shouldDisableOption: () => false,
  },
  THEME: {
    label: 'Theme',
    renderIcon: () => <LightbulbIcon />,
    shouldDisableOption: () => false,
  },
  RELEASE_NOTES: {
    label: 'Release Notes',
    renderIcon: () => <Gift />,
    shouldDisableOption: () => false,
  },
}

const SETTINGS_LINKS = {
  ENCRYPT_KEY: {
    label: 'Encrypt Key',
    url: ROUTES.ENCRYPT,
    renderIcon: () => <LockIcon />,
    route: ROUTES.ENCRYPT,
  },
  RECOVER_WALLET: {
    label: 'Recover Wallet',
    url: ROUTES.ENCRYPT,
    renderIcon: () => <TimeIcon />,
    onClick: loadWalletRecovery,
  },
}

export default function NewSettings({
  net,
  networkId,
  loadWalletData,
  handleNetworkChange,
  showModal,
  saveSelectedNode,
  showErrorNotification,
  showSuccessNotification,
  setAccounts,
  setN3Accounts,
}: {
  net: string,
  networkId: string,
  loadWalletData: Function,
  handleNetworkChange: Function,
  showModal: Function,
  saveSelectedNode: Function,
  showErrorNotification: Function,
  showSuccessNotification: Function,
  setAccounts: (Array<Object>) => any,
  setN3Accounts: (Array<Object>) => any,
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
            {Object.values(SETTINGS_TABS).map(
              /* $FlowFixMe */
              ({ label, renderIcon, shouldDisableOption }) =>
                shouldDisableOption(settings.chain) ? null : (
                  <Box
                    cursor="pointer"
                    padding={12}
                    key={label}
                    _hover={{ color: 'var(--input-active-border)' }}
                    color={
                      label === activeTab.label
                        ? 'var(--input-active-border)'
                        : ''
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
                ),
            )}

            <Box margin="12px 0" borderTop="solid thin #5c677f">
              <Box marginTop="12px" />

              {Object.values(SETTINGS_LINKS).map(
                /* $FlowFixMe */
                ({ label, renderIcon, route, onClick }) =>
                  route ? (
                    <Link to={route}>
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
                    </Link>
                  ) : (
                    <Box
                      cursor="pointer"
                      className={styles.settingsTabWrapper}
                      padding={12}
                      key={label}
                      display="flex"
                      alignItems="center"
                      onClick={() =>
                        onClick({
                          chain: settings.chain,
                          showSuccessNotification,
                          showErrorNotification,
                          setAccounts,
                          setN3Accounts,
                        })
                      }
                    >
                      <Box mr="12px" className={styles.settingsIconContainer}>
                        {renderIcon()}
                      </Box>
                      {label}
                    </Box>
                  ),
              )}
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
  renderHeader,
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
  renderHeader?: Function,
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
        marginTop="11px"
        color="var(--input-active-border)"
      >
        {renderHeader ? renderHeader() : activeTab.label}
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
  const [selectedNodeLabel, setSelectedNodeLabel] = React.useState('')

  React.useEffect(() => {
    const getSelectedNodeLabel = async () => {
      const storage = await getStorage(`selectedNode-${net}`).catch(
        console.error,
      )
      const labelInStorage = get(storage, 'label')
      if (labelInStorage) {
        setSelectedNodeLabel(labelInStorage)
      }
    }
    getSelectedNodeLabel()
  }, [])

  const selectedNetworkSetting = () => {
    if (net === 'MainNet') {
      return 'MainNet (default)'
    }
    if (net === 'TestNet') {
      return 'TestNet'
    }

    /* $FlowFixMe */
    const customNetwork = settings?.customNetworks?.find(
      n => n.label === selectedNodeLabel,
    )

    if (customNetwork) {
      return customNetwork.label
    }

    return ''
  }

  const networkOptions = ['MainNet (default)', 'TestNet']

  if (settings?.chain === 'neo3') {
    networkOptions.push(
      /* $FlowFixMe */
      ...Object.values(settings?.customNetworks ?? []).map(
        network =>
          /* $FlowFixMe */
          network?.label,
      ),
    )
  }

  const isCustomNetworkOption = option => {
    if (option !== 'MainNet (default)' && option !== 'TestNet') {
      return true
    }
    return false
  }

  const renderAddOrEditCustomNetworkModal = (option = '') => {
    showModal(MODAL_TYPES.CUSTOM_NETWORK, {
      network: settings.customNetworks.find(n => n.label === option),
      handleRemoveCustomNetwork: label => {
        const currentCustomNetworks = settings?.customNetworks ?? []

        // NOTE: if the user is editing a custom network, we need to remove the old one
        const newCustomNetworks = currentCustomNetworks.filter(
          n => n.label !== option,
        )
        /* $FlowFixMe */
        setSetting({
          customNetworks: [...newCustomNetworks],
        })

        // NOTE: switch the user back to mainnet if they delete a network
        handleNetworkChange('1')
      },
      handleAddCustomNetwork: ({ api, rpc, label }) => {
        const currentCustomNetworks = settings?.customNetworks ?? []

        // NOTE: if the user is editing a custom network, we need to remove the old one
        const newCustomNetworks = currentCustomNetworks.filter(
          n => n.label !== option,
        )

        /* $FlowFixMe */
        setSetting({
          customNetworks: [...newCustomNetworks, { rpc, api, label }],
        })
        saveSelectedNode({ url: rpc, net: 'Custom', label })
        handleNetworkChange('Custom')
      },
    })
  }

  const renderEditIcon = option => {
    if (isCustomNetworkOption(option)) {
      return (
        <Box
          display="flex"
          alignItems="center"
          ml={12}
          onClick={() => renderAddOrEditCustomNetworkModal(option)}
        >
          <EditIcon />
        </Box>
      )
    }

    if (selectedNetworkSetting() === option) {
      return (
        <Link to={ROUTES.NODE_SELECT}>
          <Box display="flex" alignItems="center" ml={12}>
            <BlockExplorerIcon />
          </Box>
        </Link>
      )
    }

    return null
  }

  switch (activeTab.label) {
    case SETTINGS_TABS.NETWORK_CONFIGURATION.label:
      return (
        <SettingsOptions
          settingName="network"
          activeTab={activeTab}
          /* $FlowFixMe */
          options={networkOptions}
          renderHeader={() => (
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              color="var(--input-active-border)"
            >
              Network Configuration{' '}
              {settings.chain === 'neo3' && (
                <Box
                  className={styles.addNetworkIconContainer}
                  onClick={() => renderAddOrEditCustomNetworkModal()}
                >
                  <Plus /> <Box marginLeft="4px">Custom network</Box>
                </Box>
              )}
            </Box>
          )}
          renderOption={option => {
            return (
              <Box
                display="flex"
                alignItems="center"
                className={styles.activeSettingCheckWrapper}
              >
                {option} {renderEditIcon(option)}
              </Box>
            )
          }}
          selectedSetting={selectedNetworkSetting()}
          /* $FlowFixMe */
          updateSettings={({ network }) => {
            if (network === 'MainNet (default)' || network === 'TestNet') {
              return handleNetworkChange(
                network === 'MainNet (default)' ? '1' : '2',
              )
            }

            const customNetwork = settings.customNetworks.find(
              n => n.label === network,
            )

            if (customNetwork) {
              saveSelectedNode({
                url: customNetwork.rpc,
                net: 'Custom',
                label: customNetwork.label,
              })
              setSelectedNodeLabel(customNetwork.label)
              handleNetworkChange('Custom')
            }
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
