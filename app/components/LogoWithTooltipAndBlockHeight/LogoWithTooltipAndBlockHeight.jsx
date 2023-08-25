// @flow
import React, { Fragment, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  PopoverContentProps,
  PopoverArrowProps,
  Portal,
} from '@chakra-ui/react'
import NetworkConfigurationTooltip from '../NetworkConfigurationTooltip'
import LightLogoWithoutText from '../../assets/images/logo-without-text-black.png'
import DarkLogoWithoutText from '../../assets/images/logo-without-text.png'
import styles from '../../containers/App/Sidebar/Sidebar.scss'
import IntlWrapper from '../Root/IntlWrapper'
import { useSettingsContext } from '../../context/settings/SettingsContext'
import {
  useBlockHeightStore,
  getBlockHeight,
} from '../../actions-migrated/blockheight'

export default function LogoWithTooltipAndBlockHeight({
  net,
}: {
  net: string,
}) {
  const {
    settings: { theme },
  } = useSettingsContext()

  const { count } = useBlockHeightStore()

  useEffect(
    () => {
      getBlockHeight(net)
    },
    [net],
  )

  const themeBasedLogo =
    theme === 'Light' ? LightLogoWithoutText : DarkLogoWithoutText

  const contentStyles: PopoverContentProps =
    theme === 'Light'
      ? { bgColor: '#fff', color: '#394152' }
      : {
          bgColor: '#21242C',
          color: '#fff',
        }

  const arrowStyles: PopoverArrowProps =
    theme === 'Light' ? { bgColor: 'white' } : { bgColor: '#21242C' }

  return (
    <Popover placement="right-end" trigger="hover">
      <PopoverTrigger>
        <Box>
          <div className={styles.logo} id="neon-logo-container">
            <img src={themeBasedLogo} id="neon-logo" alt="neon-logo" />
          </div>

          <div id="block-height-container" className={styles.blockHeight}>
            {!!count && (
              <Fragment>
                <div id="block-height-label" className={styles.heightText}>
                  <FormattedMessage id="sidebarCurrentBlock" />
                </div>
                <div id="block-height">{count.toLocaleString()}</div>
              </Fragment>
            )}
          </div>
        </Box>
      </PopoverTrigger>

      <Portal>
        <PopoverContent
          boxShadow="-3px -3px 17px 0 transparent, 3px 4px 20px 0 rgba(18,21,23,0.24)"
          border="none"
          borderRadius="4px"
          {...contentStyles}
        >
          <PopoverArrow {...arrowStyles} />
          <PopoverBody>
            <IntlWrapper>
              <NetworkConfigurationTooltip />
            </IntlWrapper>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
