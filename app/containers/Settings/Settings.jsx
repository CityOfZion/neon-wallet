// @flow
import React, { Component } from 'react'
import { map, reject } from 'lodash-es'
import fs from 'fs'
import storage from 'electron-json-storage'
import { Link } from 'react-router-dom'

import { recoverWallet } from '../../modules/generateWallet'
import Panel from '../../components/Panel'
import SelectInput from '../../components/Inputs/SelectInput'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'
import HeaderBar from '../../components/HeaderBar'
import SettingsItem from '../../components/Settings/SettingsItem'
import SettingsLink from '../../components/Settings/SettingsLink'
import WalletRecoveryPanel from '../../components/Settings/WalletRecoveryPanel'
import {
  EXPLORERS,
  CURRENCIES,
  ROUTES,
  MODAL_TYPES,
  COZ_DONATIONS_ADDRESS,
  DISCORD_INVITE_LINK
} from '../../core/constants'
import themes from '../../themes'
import styles from './Settings.scss'
import Tooltip from '../../components/Tooltip'
import AddIcon from '../../assets/icons/add.svg'

const { dialog, shell } = require('electron').remote

type Props = {
  setAccounts: (Array<Object>) => any,
  setBlockExplorer: string => any,
  explorer: string,
  setCurrency: string => any,
  currency: string,
  setTheme: string => any,
  theme: string,
  showSuccessNotification: Object => any,
  showErrorNotification: Object => any,
  showModal: Function
}

type SelectOption = {
  value: string,
  label: string
}

type State = {
  selectedCurrency: SelectOption,
  selectedTheme: SelectOption,
  selectedExplorer: SelectOption
}

export default class Settings extends Component<Props, State> {
  state = {
    selectedCurrency: {
      value: this.props.currency,
      label: this.props.currency.toUpperCase()
    },
    selectedTheme: {
      value: this.props.theme,
      label: this.props.theme
    },
    selectedExplorer: {
      value: this.props.explorer,
      label: EXPLORERS[this.props.explorer]
    }
  }

  saveWalletRecovery = () => {
    const { showSuccessNotification, showErrorNotification } = this.props

    storage.get('userWallet', (errorReading, data) => {
      if (errorReading) {
        showErrorNotification({
          message: `An error occurred reading wallet file: ${
            errorReading.message
          }`
        })
        return
      }
      const content = JSON.stringify(data)
      dialog.showSaveDialog(
        {
          filters: [
            {
              name: 'JSON',
              extensions: ['json']
            }
          ]
        },
        fileName => {
          if (fileName === undefined) {
            return
          }
          // fileName is a string that contains the path and filename created in the save file dialog.
          fs.writeFile(fileName, content, errorWriting => {
            if (errorWriting) {
              showErrorNotification({
                message: `An error occurred creating the file: ${
                  errorWriting.message
                }`
              })
            } else {
              showSuccessNotification({
                message: 'The file has been succesfully saved'
              })
            }
          })
        }
      )
    })
  }

  loadWalletRecovery = () => {
    const {
      showSuccessNotification,
      showErrorNotification,
      setAccounts
    } = this.props

    dialog.showOpenDialog(fileNames => {
      // fileNames is an array that contains all the selected
      if (!fileNames) {
        return
      }
      const filepath = fileNames[0]
      fs.readFile(filepath, 'utf-8', (err, data) => {
        if (err) {
          showErrorNotification({
            message: `An error occurred reading the file: ${err.message}`
          })
          return
        }
        const walletData = JSON.parse(data)

        recoverWallet(walletData)
          .then(data => {
            showSuccessNotification({ message: 'Recovery was successful.' })
            setAccounts(data.accounts)
          })
          .catch(err => {
            showErrorNotification({
              message: `An error occurred recovering wallet: ${err.message}`
            })
          })
      })
    })
  }

  updateExplorerSettings = (option: SelectOption) => {
    this.setState({ selectedExplorer: option })
    const { setBlockExplorer } = this.props
    setBlockExplorer(option.value)
  }

  updateCurrencySettings = (option: SelectOption) => {
    this.setState({ selectedCurrency: option })
    const { setCurrency } = this.props
    setCurrency(option.value)
  }

  updateThemeSettings = (option: SelectOption) => {
    const { setTheme } = this.props
    setTheme(option.value)
  }

  openTokenModal = () => {
    this.props.showModal(MODAL_TYPES.TOKEN)
  }

  render() {
    const { selectedCurrency, selectedExplorer } = this.state
    const parsedCurrencyOptions = Object.keys(CURRENCIES).map(key => ({
      value: key,
      label: key.toUpperCase()
    }))
    const parsedExplorerOptions = Object.keys(EXPLORERS).map(key => ({
      value: key,
      label: EXPLORERS[key]
    }))

    return (
      <section className={styles.settingsContainer}>
        <HeaderBar
          label="Settings"
          renderRightContent={this.renderHeaderBarRightContent}
        />
        <Panel
          className={styles.settingsPanel}
          renderHeader={this.renderHeader}
        >
          <section className={styles.settingsItemsContainer}>
            <SettingsItem title="THEME">
              <div className={styles.settingsSelectContainer}>
                <StyledReactSelect
                  isDisabled
                  value={this.state.selectedTheme}
                />
              </div>
            </SettingsItem>
            <SettingsItem title="CURRENCY">
              <div className={styles.settingsSelectContainer}>
                <StyledReactSelect
                  options={parsedCurrencyOptions}
                  value={this.state.selectedCurrency}
                  onChange={this.updateCurrencySettings}
                />
              </div>
            </SettingsItem>
            <SettingsItem title="BLOCK EXPLORER">
              <div className={styles.settingsSelectContainer}>
                <StyledReactSelect
                  options={parsedExplorerOptions}
                  value={this.state.selectedExplorer}
                  onChange={this.updateExplorerSettings}
                />
              </div>
            </SettingsItem>
            <SettingsLink to={ROUTES.ENCRYPT} title="ENCRYPT A KEY" />
            <SettingsLink to={ROUTES.NODE_SELECT} title="NODE SELECTON" />
            <WalletRecoveryPanel
              title="WALLET RECOVERY"
              loadWalletRecovery={this.loadWalletRecovery}
              saveWalletRecovery={this.saveWalletRecovery}
            />
            {this.renderDontions()}
          </section>
        </Panel>
      </section>
    )
  }

  renderDontions = () => (
    <Link
      to={{
        pathname: ROUTES.SEND,
        state: { address: COZ_DONATIONS_ADDRESS }
      }}
      className={styles.settingsDonations}
    >
      Created by CoZ. Donations: {COZ_DONATIONS_ADDRESS}
    </Link>
  )

  renderHeaderBarRightContent = () => (
    <Tooltip title="Add Token" className={styles.headerButtonContainer}>
      <AddIcon className={styles.add} />
      <span>Add Token</span>
    </Tooltip>
  )

  openDiscordLink = () => shell.openExternal(DISCORD_INVITE_LINK)

  renderHeader = () => (
    <div className={styles.settingsPanelHeader}>
      <div className={styles.settingsPanelHeaderItem}>
        Manage your neon wallet
      </div>
      <div className={styles.settingsPanelHeaderItem}>
        Community Support:{' '}
        <a onClick={this.openDiscordLink}>{DISCORD_INVITE_LINK}</a>
      </div>
    </div>
  )
}
