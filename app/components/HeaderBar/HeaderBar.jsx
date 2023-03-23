// @flow
import React from 'react'
import classNames from 'classnames'
import { Box } from '@chakra-ui/react'

import RefreshButton from '../../containers/Buttons/RefreshButton'
import { isMainNetwork } from '../../core/networks'
import { imageMap } from '../../assets/nep5/svg'
import N3Logo from '../../assets/images/n3_logo.png'
import OldNeoLogo from '../../assets/images/neo-logo.png'
import WarningIcon from '../../assets/icons/warning.svg'
import styles from './HeaderBar.scss'
import { MAIN_NETWORK_ID } from '../../core/constants'

const NEO_IMAGE = imageMap.NEO

type Props = {
  label: string,
  shouldRenderRefresh?: boolean,
  renderLeftContent?: () => any,
  renderRightContent?: () => any,
  networkId: string,
  net: string,
  chain: string,
}

export default class HeaderBar extends React.PureComponent<Props> {
  static defaultProps = {
    label: '',
  }

  render() {
    const {
      label,
      shouldRenderRefresh = false,
      renderLeftContent = () => null,
      renderRightContent = () => null,
      networkId,
      net,
      chain,
    } = this.props

    return (
      <React.Fragment>
        {!isMainNetwork(networkId || MAIN_NETWORK_ID) &&
          (net === 'Custom' ? (
            <Box
              className={styles.customNetwork}
              display="flex"
              alignItems="center"
            >
              Custom network
              <WarningIcon />
            </Box>
          ) : (
            <div className={styles.currentNetwork}>{net}</div>
          ))}
        <div className={styles.headerBar}>
          <div
            className={classNames({
              [styles.chainLogoContainer]: true,
              [styles.withBorder]: renderLeftContent() !== null,
            })}
          >
            {chain === 'neo3' ? (
              <img
                src={NEO_IMAGE}
                className={styles.neoLogo}
                alt="chain-logo"
              />
            ) : (
              <img
                src={OldNeoLogo}
                className={styles.neoLogo}
                alt="chain-logo"
              />
            )}
            <span>
              {chain === 'neo3' ? (
                'N3'
              ) : (
                <div className={styles.legacyContainer}>Legacy</div>
              )}
            </span>
          </div>
          {label ? <h3> {label}</h3> : renderLeftContent()}
          {shouldRenderRefresh ? <RefreshButton /> : renderRightContent()}
        </div>
      </React.Fragment>
    )
  }
}
