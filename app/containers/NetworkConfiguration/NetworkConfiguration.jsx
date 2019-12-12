// @flow
import React from 'react'
import classNames from 'classnames'

import { ROUTES, EXPLORERS } from '../../core/constants'
import FullHeightPanel from '../../components/Panel/FullHeightPanel'

import NeoLogo from '../../assets/icons/neo.svg'
import NodeSelectIcon from '../../assets/icons/node-select.svg'
import BlockExplorerIcon from '../../assets/icons/block-explorer.svg'
import CogIcon from '../../assets/icons/cog-icon.svg'
import CloseButton from '../../components/CloseButton'
import SettingsItem from '../../components/Settings/SettingsItem'
import StyledReactSelect from '../../components/Inputs/StyledReactSelect/StyledReactSelect'
import SettingsLink from '../../components/Settings/SettingsLink'

import styles from './NetworkConfiguration.scss'
import settingsStyles from '../Settings/Settings.scss'
import NetworkSwitch from '../App/Sidebar/NetworkSwitch'

type Props = {
  explorer: string,
  setBlockExplorer: string => any,
  selectedNode: string,
}

type State = {
  selectedExplorer: SelectOption,
}

export default class NetworkConfiguration extends React.Component<
  Props,
  State,
> {
  state = {
    selectedExplorer: {
      value: this.props.explorer,
      label: this.props.explorer,
    },
  }

  render() {
    const parsedExplorerOptions = Object.keys(EXPLORERS).map(key => ({
      value: key,
      label: EXPLORERS[key],
    }))

    return (
      <FullHeightPanel
        className={styles.networkConfigPanel}
        headerText="Network Settings"
        renderCloseButton={() => <CloseButton routeTo={ROUTES.SETTINGS} />}
        renderHeaderIcon={() => <CogIcon />}
        instructionsClassName={styles.networkConfigInstructions}
        renderInstructions={() => (
          <div>
            Upload and save specific network configurations or alter the default
            settings.
          </div>
        )}
      >
        <section
          className={classNames(
            settingsStyles.settingsItemsContainer,
            styles.networkItemsContainer,
          )}
        >
          <div className={settingsStyles.innerContainer}>
            <SettingsLink
              to={ROUTES.NODE_SELECT}
              label={this.props.selectedNode || 'AUTOMATIC'}
              renderIcon={() => <NodeSelectIcon />}
              title="NODE SELECTON"
            />

            <SettingsItem
              renderIcon={() => <BlockExplorerIcon />}
              title="BLOCK EXPLORER"
            >
              <div className={settingsStyles.settingsSelectContainer}>
                <StyledReactSelect
                  settingsSelect
                  // isDisabled
                  transparent
                  options={parsedExplorerOptions}
                  value={this.state.selectedExplorer}
                  onChange={this.updateExplorerSettings}
                  isSearchable={false}
                />
              </div>
            </SettingsItem>
            <SettingsItem
              renderIcon={() => <NeoLogo />}
              title="CURRENT NETWORK"
              noBorderBottom
            >
              <div className={styles.settingsSelectContainer}>
                <NetworkSwitch transparent settingsSelect />
              </div>
            </SettingsItem>
          </div>
        </section>
      </FullHeightPanel>
    )
  }

  updateExplorerSettings = (option: SelectOption) => {
    this.setState({ selectedExplorer: option })
    const { setBlockExplorer } = this.props
    setBlockExplorer(option.label)
  }
}
