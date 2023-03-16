// @flow
import React from 'react'
import classNames from 'classnames'
import { HashRouter, Link } from 'react-router-dom'
import { IntlShape } from 'react-intl'
import { NeoRest } from '@cityofzion/dora-ts/dist/api'

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
import WarningIcon from '../../assets/icons/warning.svg'

type Props = {
  address: string,
  net: string,
  theme: string,
  publicKey: string,
  selectedNode: string,
  explorer: string,
  intl: IntlShape,
  chain: string,
}

type State = {
  VotedNode: Array<any>,
}

export default class NetworkConfigurationTooltip extends React.Component<
  Props,
  State,
> {
  state = {
    VotedNode: [],
  }

  componentDidMount() {
    this.returnVotedNode()
  }

  returnVotedNode = async () => {
    try {
      const results = []
      const { net, address } = this.props
      const network = net === 'MainNet' ? 'mainnet' : 'testnet'
      const data1 = await NeoRest.voter(address, network)
      const selectednode = data1.candidate
      results.push(selectednode)

      const data2 = await NeoRest.committee(network)
      for (const item of data2) {
        if (item.name === selectednode) {
          results.push(data2.indexOf(item) + 1)
          break
        }
      }
      this.setState(state => ({
        VotedNode: results,
      }))
    } catch (err) {
      console.warn('Error building voted node info:', err)
    }
  }

  render() {
    const { address, publicKey, theme, intl } = this.props
    return (
      <section
        id="network-config-tooltip"
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
              <span>
                {intl.formatMessage({
                  id: 'networkConfigTooltipAddress',
                })}
              </span>
              <div className={styles.addressLink}> {address}</div>
            </div>
            {publicKey && (
              <div className={styles.publicKeyInfo}>
                <span>
                  {intl.formatMessage({
                    id: 'networkConfigTooltipPublicKey',
                  })}
                </span>
                <div className={styles.publicKey}> {publicKey}</div>
              </div>
            )}
            <div className={styles.votedNodeInfo}>
              <span>
                {intl.formatMessage({
                  id: 'networkConfigTooltipVotedNode',
                })}
              </span>
              {this.renderNode()}
            </div>

            <SettingsLink
              to={ROUTES.NODE_SELECT}
              label={this.props.selectedNode || 'AUTOMATIC'}
              renderIcon={() => <NodeSelectIcon />}
              title={intl.formatMessage({
                id: 'networkSettingsNodeSelectLabel',
              })}
              tooltip
              noBorderBottom
              onClick={() => undefined}
            />
            <div className={styles.tooltipItemBorder} />
            <SettingsItem
              renderIcon={() => <BlockExplorerIcon />}
              title={intl.formatMessage({ id: 'networkSettingsExplorerLabel' })}
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
              title={intl.formatMessage({ id: 'networkSettingsCurrentLabel' })}
              tooltip
              noBorderBottom
            >
              <div className={networkConfigStyles.settingsSelectContainer}>
                <div className={styles.configLabel}>
                  {findNetworkByDeprecatedLabel(
                    this.props.net,
                    this.props.chain,
                  ).label.toUpperCase()}
                </div>
              </div>
            </SettingsItem>
            <div className={styles.tooltipItemBorder} />
            <div className={styles.buttonContainer}>
              <Link to={ROUTES.NETWORK_CONFIGURATION}>
                <Button
                  shouldCenterButtonLabelText
                  elevated
                  renderIcon={() => <CogIcon />}
                >
                  {intl.formatMessage({
                    id: 'networkConfigTooltipUpdateSettings',
                  })}
                </Button>
              </Link>
            </div>
          </div>
        </HashRouter>
      </section>
    )
  }

  renderNode() {
    if (this.state.VotedNode.length === 2) {
      const node = this.state.VotedNode
      if (node[1] > 21) {
        return (
          <div className={styles.votedNode}>
            {node[0]} <WarningIcon />
          </div>
        )
      }
      return (
        <div className={styles.votedNode}>
          {node[0]} #{node[1]}
        </div>
      )
    }
    return (
      <div className={styles.votedNode}>
        <WarningIcon />
      </div>
    )
  }
}
