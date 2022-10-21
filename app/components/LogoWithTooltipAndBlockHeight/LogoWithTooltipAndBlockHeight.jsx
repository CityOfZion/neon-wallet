// @flow
import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import Tooltip from '../Tooltip'
import NetworkConfigurationTooltip from '../NetworkConfigurationTooltip'
import LightLogoWithoutText from '../../assets/images/logo-without-text-black.png'
import DarkLogoWithoutText from '../../assets/images/logo-without-text.png'
import styles from '../../containers/App/Sidebar/Sidebar.scss'
import IntlWrapper from '../Root/IntlWrapper'
import { LIGHT_NETWORK_CONFIG_TOOLTIP } from '../../themes/Light'
import { DARK_NETWORK_CONFIG_TOOLTIP } from '../../themes/Dark'

type Props = {
  count: number,
  theme: string,
  store: any,
}

class LogoWithTooltipAndBlockHeight extends React.Component<Props> {
  render() {
    const { count, theme, store } = this.props

    const themeBasedLogo =
      theme === 'Light' ? LightLogoWithoutText : DarkLogoWithoutText

    return (
      <Tooltip
        position="left"
        interactive
        theme="network-settings"
        onShow={() => this.handleOnShow()}
        html={
          <IntlWrapper store={store}>
            <NetworkConfigurationTooltip store={store} />{' '}
          </IntlWrapper>
        }
      >
        <div className={styles.logo} id="neon-logo-container">
          <img src={themeBasedLogo} id="neon-logo" alt="neon-logo" />
        </div>

        <div id="block-height-container" className={styles.blockHeight}>
          {count && (
            <Fragment>
              <div id="block-height-label" className={styles.heightText}>
                <FormattedMessage id="sidebarCurrentBlock" />
              </div>
              <div id="block-height">{count.toLocaleString()}</div>
            </Fragment>
          )}
        </div>
      </Tooltip>
    )
  }

  // Because our tooltip component gets injected into the DOM on show
  // the only way to update its "theme" is via manual DOM manipulation
  // only after it has been rendered
  handleOnShow = () => {
    const { theme } = this.props
    setTimeout(() => {
      const currentlySelectedThemeElement = document.querySelector(
        '.tippy-popper',
      )
      const tooltipTheme =
        theme === 'Light'
          ? LIGHT_NETWORK_CONFIG_TOOLTIP
          : DARK_NETWORK_CONFIG_TOOLTIP
      if (currentlySelectedThemeElement) {
        // $FlowFixMe
        const styleString = Object.entries(tooltipTheme).reduce(
          // eslint-disable-next-line
          (styleString, [propName, propValue]) => {
            // $FlowFixMe
            return `${styleString}${propName}:${propValue};`
          },
          '',
        )
        // $FlowFixMe
        currentlySelectedThemeElement.style.cssText = `${
          currentlySelectedThemeElement.style.cssText
        } ${styleString}`
      }
    }, 1)
  }
}

export default LogoWithTooltipAndBlockHeight
