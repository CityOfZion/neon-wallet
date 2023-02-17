// @flow
import React, { useState } from 'react'
import fs from 'fs'
import storage from 'electron-json-storage'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { recoverWallet } from '../../modules/generateWallet'
import Panel from '../../components/Panel'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import SettingsItem from '../../components/Settings/SettingsItem'
import SettingsLink from '../../components/Settings/SettingsLink'
import Switch from '../../components/Inputs/Switch'
import {
  CURRENCIES,
  ROUTES,
  MODAL_TYPES,
  COZ_DONATIONS_ADDRESS,
  DISCORD_INVITE_LINK,
  THEMES,
  LANGUAGES,
  PIPEFY_SUPPORT,
} from '../../core/constants'
import styles from './Settings.scss'
import AddIcon from '../../assets/icons/add.svg'
import LockIcon from '../../assets/icons/lock.svg'
import CurrencyIcon from '../../assets/icons/currency-icon.svg'
import LightbulbIcon from '../../assets/icons/lightbulb-icon.svg'
import CogIcon from '../../assets/icons/cog-icon.svg'
import VolumeIcon from '../../assets/icons/volume-icon.svg'
import TimeIcon from '../../assets/icons/time-icon.svg'
import SaveIcon from '../../assets/icons/save-icon.svg'
import pack from '../../../package.json'
import { LanguageSettingsIcon } from '../../components/Inputs/LanguageSelect/LanguageSelect'

const { ipcRenderer, shell } = require('electron')

type Props = {
  setAccounts: (Array<Object>) => any,
  setN3Accounts: (Array<Object>) => any,
  currency: string,
  theme: string,
  showSuccessNotification: Object => any,
  showErrorNotification: Object => any,
  showModal: Function,
  language: string,
  net: string,
  networkId: string,
  soundEnabled: boolean,
  chain: string,
  setSetting: ({ [key: string]: any }) => any,
}

type Language = {
  label: string,
  value: string,
  renderFlag: () => React$Element<any>,
}

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

async function storageGet(key) {
  return new Promise((resolve, reject) => {
    storage.get(key, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const Settings = (props: Props) => {
  const [selectedCurrency, setSelectedCurrency] = useState<SelectOption>({
    value: props.currency,
    label: props.currency.toUpperCase(),
  })

  const [selectedTheme, setSelectedTheme] = useState<SelectOption>({
    value: props.theme,
    label: props.theme,
  })

  const [soundEnabled, setSoundEnabled] = useState<boolean>(props.soundEnabled)

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    Object.keys(LANGUAGES)
      .map(key => LANGUAGES[key])
      .find(lang => lang.value === props.language) || LANGUAGES.ENGLISH,
  )

  const saveWalletRecovery = async () => {
    const { showSuccessNotification, showErrorNotification, chain } = props

    let content
    try {
      if (chain === 'neo2') {
        content = JSON.stringify(await storageGet('userWallet'))
      } else {
        content = JSON.stringify(await storageGet('n3UserWallet'))
      }
    } catch (e) {
      showErrorNotification({
        message: `An error occurred reading wallet file: ${e.message}`,
      })
      return
    }
    const { filePath, canceled } = await await ipcRenderer.invoke(
      'dialog',
      'showSaveDialog',
      {
        filters: [
          {
            name: 'JSON',
            extensions: ['json'],
          },
        ],
      },
    )

    if (filePath && !canceled) {
      fs.writeFile(filePath, content, errorWriting => {
        if (errorWriting) {
          showErrorNotification({
            message: `An error occurred creating the file: ${
              errorWriting.message
            }`,
          })
        } else {
          showSuccessNotification({
            message: 'The file has been succesfully saved',
          })
        }
      })
    }
  }

  const updateCurrencySettings = (option: SelectOption) => {
    setSelectedCurrency(option)
    props.setSetting({ currency: option.value })
  }

  const updateThemeSettings = (option: SelectOption) => {
    setSelectedTheme(option)
    props.setSetting({ theme: option.value })
  }

  const updateSoundSetting = (soundEnabled: boolean) => {
    setSoundEnabled(soundEnabled)
    props.setSetting({ soundEnabled })
  }

  const updateLanguageSetting = (selectedLanguage: Language) => {
    setSelectedLanguage(selectedLanguage)
    props.setSetting({ language: selectedLanguage.value })
  }

  const openTokenModal = () => {
    props.showModal(MODAL_TYPES.TOKEN)
  }

  const renderDontions = () => (
    <Link
      to={{
        pathname: ROUTES.SEND,
        state: { address: COZ_DONATIONS_ADDRESS },
      }}
      className={styles.settingsDonations}
    >
      <FormattedMessage id="settingsDonationLink" /> {COZ_DONATIONS_ADDRESS}
    </Link>
  )

  const renderHeaderBarRightContent = () =>
    props.chain === 'neo2' && (
      <div
        onClick={() => openTokenModal()}
        className={styles.headerButtonContainer}
      >
        <AddIcon className={styles.add} />
        <span>
          <FormattedMessage id="addToken" />
        </span>
      </div>
    )

  const openDiscordLink = () => shell.openExternal(DISCORD_INVITE_LINK)

  const openPipefyLink = () => shell.openExternal(PIPEFY_SUPPORT)

  const renderHeader = () => (
    <div className={styles.settingsPanelHeader}>
      <div className={styles.settingsPanelHeaderItem}>
        <FormattedMessage id="settingsManageLabel" /> - v{pack.version}
      </div>
      <div className={styles.settingsPanelHeaderItem}>
        <div>
          NEO Discord: <a onClick={openDiscordLink}>{DISCORD_INVITE_LINK}</a>
        </div>
      </div>
    </div>
  )

  const {
    showSuccessNotification,
    showErrorNotification,
    setAccounts,
    chain,
    setN3Accounts,
  } = props

  const parsedCurrencyOptions = Object.keys(CURRENCIES).map(key => ({
    value: key,
    label: key.toUpperCase(),
  }))
  const parsedThemeOptions = Object.keys(THEMES).map(key => ({
    value: THEMES[key],
    label: THEMES[key],
  }))

  const parsedLangOptions = Object.keys(LANGUAGES).map(key => ({
    value: LANGUAGES[key].value,
    label: LANGUAGES[key].label,
    renderFlag: LANGUAGES[key].renderFlag,
  }))

  const arrOfLanguages: Array<Language> = Object.keys(LANGUAGES).map(
    key => LANGUAGES[key],
  )

  const selectedLang =
    arrOfLanguages.find(lang => lang.label === selectedLanguage.label) ||
    LANGUAGES.ENGLISH

  return (
    <section className={styles.settingsContainer}>
      <FormattedMessage id="sidebarSettings">
        {t => (
          <HeaderBar
            chain={props.chain}
            networkId={props.networkId}
            net={props.net}
            label={t}
            renderRightContent={renderHeaderBarRightContent}
          />
        )}
      </FormattedMessage>
      <Panel
        className={styles.settingsPanel}
        renderHeader={renderHeader}
        contentClassName={styles.panelContent}
      >
        <section className={styles.settingsItemsContainer}>
          <div className={styles.innerContainer}>
            <FormattedMessage id="settingsNetworkConfigLabel">
              {translation => (
                <SettingsLink
                  to={ROUTES.NETWORK_CONFIGURATION}
                  renderIcon={() => <CogIcon />}
                  title={translation}
                />
              )}
            </FormattedMessage>
            <FormattedMessage id="settingCurrencyLabel">
              {translation => (
                <SettingsItem
                  renderIcon={() => <CurrencyIcon />}
                  title={translation}
                >
                  <div className={styles.settingsSelectContainer}>
                    <StyledReactSelect
                      settingsSelect
                      transparent
                      options={parsedCurrencyOptions}
                      value={selectedCurrency}
                      onChange={updateCurrencySettings}
                      isSearchable={false}
                    />
                  </div>
                </SettingsItem>
              )}
            </FormattedMessage>
            <FormattedMessage id="settingsLanguageLabel">
              {translation => (
                <SettingsItem
                  renderIcon={() => (
                    <div id={styles.languageSettingsFlagIcon}>
                      {selectedLang.renderFlag()}
                    </div>
                  )}
                  title={translation}
                >
                  <div className={styles.settingsSelectContainer}>
                    <StyledReactSelect
                      formatOptionLabel={LanguageSettingsIcon}
                      settingsSelect
                      onChange={updateLanguageSetting}
                      isSearchable={false}
                      transparent
                      options={parsedLangOptions}
                      value={selectedLanguage}
                    />
                  </div>
                </SettingsItem>
              )}
            </FormattedMessage>
            <FormattedMessage id="settingsThemeLabel">
              {translation => (
                <SettingsItem
                  renderIcon={() => <LightbulbIcon />}
                  title={translation}
                >
                  <div className={styles.settingsSelectContainer}>
                    <StyledReactSelect
                      settingsSelect
                      onChange={updateThemeSettings}
                      isSearchable={false}
                      transparent
                      options={parsedThemeOptions}
                      value={selectedTheme}
                    />
                  </div>
                </SettingsItem>
              )}
            </FormattedMessage>
            <FormattedMessage id="settingsSoundLabel">
              {translation => (
                <SettingsItem
                  renderIcon={() => <VolumeIcon />}
                  noBorderBottom
                  title={translation}
                >
                  <div className={styles.settingsSwitchContainer}>
                    <Switch
                      checked={soundEnabled}
                      handleCheck={updateSoundSetting}
                    />
                  </div>
                </SettingsItem>
              )}
            </FormattedMessage>
            <div className={styles.settingsSpacer} />

            <FormattedMessage id="settingsEncryptLink">
              {translation => (
                <SettingsLink
                  renderIcon={() => <LockIcon />}
                  to={ROUTES.ENCRYPT}
                  title={translation}
                />
              )}
            </FormattedMessage>
            <SettingsLink
              onClick={() =>
                loadWalletRecovery(
                  showSuccessNotification,
                  showErrorNotification,
                  setAccounts,
                  setN3Accounts,
                  chain,
                )
              }
              to={ROUTES.ENCRYPT}
              label={<FormattedMessage id="settingsRecoverWalletLink" />}
              renderIcon={() => <TimeIcon />}
              title={<FormattedMessage id="recoverWallet" />}
            />
            <SettingsLink
              renderIcon={() => <SaveIcon />}
              noBorderBottom
              label={<FormattedMessage id="settingsBackUpLink" />}
              onClick={saveWalletRecovery}
              to={ROUTES.NODE_SELECT}
              title={<FormattedMessage id="settingsBackUpLinkLabel" />}
            />
          </div>
          {renderDontions()}
        </section>
      </Panel>
    </section>
  )
}

export default Settings
