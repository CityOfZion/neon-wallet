// @flow
import React from 'react'
import classNames from 'classnames'
import { HashRouter, Link } from 'react-router-dom'

import { ROUTES } from '../../core/constants'
import SettingsItem from '../Settings/SettingsItem'
import SettingsLink from '../Settings/SettingsLink'
import Button from '../Button'
import { findNetworkByDeprecatedLabel } from '../../core/networks'
import themes from '../../themes'
import NeoLogo from '../../assets/icons/neo.svg'
import NodeSelectIcon from '../../assets/icons/node-select.svg'
import BlockExplorerIcon from '../../assets/icons/block-explorer.svg'
import CogIcon from '../../assets/icons/cog-icon.svg'
import networkConfigStyles from '../../containers/NetworkConfiguration/NetworkConfiguration.scss'
import settingsStyles from '../../containers/Settings/Settings.scss'
import styles from './NetworkConfigurationTooltip.scss'

type Props = {
  address: string,
  net: string,
  theme: string,
  publicKey: string,
  selectedNode: string,
  explorer: string,
}

export default class NetworkConfigurationTooltip extends React.Component<
  Props,
> {
  render() {
    const { address, publicKey, theme } = this.props
    return (
      <section
        style={themes[theme]}
        className={classNames(
          settingsStyles.settingsItemsContainer,
          networkConfigStyles.networkItemsContainer,
          styles.tooltipContainer,
        )}
      >
        <HashRouter>
          <div className={settingsStyles.innerContainer}>
            <div className={styles.addressInfo}>
              <span>ADDRESS:</span>
              <div className={styles.addressLink}> {address}</div>
            </div>
            {publicKey && (
              <div className={styles.publicKeyInfo}>
                <span>PUBLIC KEY:</span>
                <div className={styles.publicKey}> {publicKey}</div>
              </div>
            )}

            <SettingsLink
              to={ROUTES.NODE_SELECT}
              label={this.props.selectedNode || 'AUTOMATIC'}
              renderIcon={() => <NodeSelectIcon />}
              title="NODE SELECTON"
              tooltip
              noBorderBottom
              onClick={() => undefined}
            />
            <div className={styles.tooltipItemBorder} />
            <SettingsItem
              renderIcon={() => <BlockExplorerIcon />}
              title="BLOCK EXPLORER"
              tooltip
              noBorderBottom
            >
              <div className={settingsStyles.settingsSelectContainer}>
                <div className={styles.configLabel}>
                  {this.props.explorer.toUpperCase()}
                </div>
              </div>
            </SettingsItem>

            <div className={styles.tooltipItemBorder} />

            <SettingsItem
              renderIcon={() => <NeoLogo />}
              title="CURRENT NETWORK"
              tooltip
              noBorderBottom
            >
              <div className={networkConfigStyles.settingsSelectContainer}>
                <div className={styles.configLabel}>
                  {findNetworkByDeprecatedLabel(
                    this.props.net,
                  ).label.toUpperCase()}
                </div>
              </div>
            </SettingsItem>
            <div className={styles.tooltipItemBorder} />
            <div className={styles.buttonContainer}>
              <Link to={ROUTES.NETWORK_CONFIGURATION}>
                <Button
                  shouldCenterButtonLabelText
                  renderIcon={() => <CogIcon />}
                >
                  Update Settings
                </Button>
              </Link>
            </div>
          </div>
        </HashRouter>
      </section>
    )
  }
}
