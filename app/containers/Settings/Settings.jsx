// @flow
import React, { Component } from 'react'
import { map, reject } from 'lodash-es'
import fs from 'fs'
import storage from 'electron-json-storage'
import { Link } from 'react-router-dom'

import { recoverWallet } from '../../modules/generateWallet'
import Panel from '../../components/Panel'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'
import HeaderBar from '../../components/HeaderBar'
import SettingsItem from '../../components/Settings/SettingsItem'
import SettingsLink from '../../components/Settings/SettingsLink'

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
import LockIcon from '../../assets/icons/lock.svg'
import CurrencyIcon from '../../assets/icons/currency-icon.svg'
import BlockExplorerIcon from '../../assets/icons/block-explorer.svg'
import LightbulbIcon from '../../assets/icons/lightbulb-icon.svg'
import CogIcon from '../../assets/icons/cog-icon.svg'
import NodeSelectIcon from '../../assets/icons/node-select.svg'
import TimeIcon from '../../assets/icons/time-icon.svg'
import SaveIcon from '../../assets/icons/save-icon.svg'
import pack from '../../../package.json'

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
  showModal: Function,
  networks: Array<NetworkItemType>,
  networkId: string,
  handleNetworkChange: Function,
  selectedNode: string
}

type SelectOption = {
  value: string,
  label: string
}

type State = {
  selectedNetwork: NetworkItemType,
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
      label: EXPLORERS[this.props.explorer] || EXPLORERS.NEO_SCAN
    },
    selectedNetwork:
      this.props.networks.find(
        network => network.id === this.props.networkId
      ) || this.props.networks[0]
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
    setBlockExplorer(option.label)
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
          contentClassName={styles.panelContent}
        >
          <section className={styles.settingsItemsContainer}>
            <SettingsItem renderIcon={() => <CogIcon />} title="NETWORK">
              <div className={styles.settingsSelectContainer}>
                <StyledReactSelect
                  settingsSelect
                  options={this.props.networks}
                  transparent
                  value={this.state.selectedNetwork}
                  onChange={selectedNetwork =>
                    this.setState({ selectedNetwork }, () =>
                      this.props.handleNetworkChange(selectedNetwork.id)
                    )
                  }
                  isSearchable={false}
                />
              </div>
            </SettingsItem>
            <SettingsItem
              renderIcon={() => <BlockExplorerIcon />}
              title="BLOCK EXPLORER"
            >
              <div className={styles.settingsSelectContainer}>
                <StyledReactSelect
                  settingsSelect
                  transparent
                  options={parsedExplorerOptions}
                  value={this.state.selectedExplorer}
                  onChange={this.updateExplorerSettings}
                  isSearchable={false}
                />
              </div>
            </SettingsItem>
            <SettingsItem renderIcon={() => <CurrencyIcon />} title="CURRENCY">
              <div className={styles.settingsSelectContainer}>
                <StyledReactSelect
                  settingsSelect
                  transparent
                  options={parsedCurrencyOptions}
                  value={this.state.selectedCurrency}
                  onChange={this.updateCurrencySettings}
                  isSearchable={false}
                />
              </div>
            </SettingsItem>
            <SettingsItem
              renderIcon={() => <LightbulbIcon />}
              noBorderBottom
              title="THEME"
            >
              <Tooltip
                className={styles.settingsSelectContainer}
                title="Coming Soon"
                position="bottom"
              >
                <StyledReactSelect
                  settingsSelect
                  isDisabled
                  transparent
                  value={this.state.selectedTheme}
                />
              </Tooltip>
            </SettingsItem>
            <div className={styles.settingsSpacer} />
            <SettingsLink
              renderIcon={() => <LockIcon />}
              to={ROUTES.ENCRYPT}
              title="ENCRYPT A KEY"
            />
            <SettingsLink
              noBorderBottom
              to={ROUTES.NODE_SELECT}
              label={this.props.selectedNode || 'AUTOMATIC'}
              renderIcon={() => <NodeSelectIcon />}
              title="NODE SELECTON"
            />
            <div className={styles.settingsSpacer} />
            <SettingsLink
              onClick={this.loadWalletRecovery}
              to={ROUTES.ENCRYPT}
              label="IMPORT"
              renderIcon={() => <TimeIcon />}
              title="RECOVER WALLET"
            />
            <SettingsLink
              renderIcon={() => <SaveIcon />}
              noBorderBottom
              label="EXPORT"
              onClick={this.saveWalletRecovery}
              to={ROUTES.NODE_SELECT}
              title="BACKUP WALLET"
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
    <div
      onClick={() => this.openTokenModal()}
      className={styles.headerButtonContainer}
    >
      <AddIcon className={styles.add} />
      <span>Add Token</span>
    </div>
  )

  openDiscordLink = () => shell.openExternal(DISCORD_INVITE_LINK)

  renderHeader = () => (
    <div className={styles.settingsPanelHeader}>
      <div className={styles.settingsPanelHeaderItem}>
        Manage your neon wallet - v{pack.version}
      </div>
      <div className={styles.settingsPanelHeaderItem}>
        Community Support:{' '}
        <a onClick={this.openDiscordLink}>{DISCORD_INVITE_LINK}</a>
      </div>
    </div>
  )
}
