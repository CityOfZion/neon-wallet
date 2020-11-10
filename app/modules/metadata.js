// @flow
import React from 'react'
import axios from 'axios'
import retry from 'axios-retry'
import compareVersions from 'compare-versions'
import { ConditionalLink } from '../util/ConditionalLink'

import { showWarningNotification } from './notifications'
import {
  NEON_WALLET_RELEASE_LINK,
  NOTIFICATION_POSITIONS,
} from '../core/constants'
import { version } from '../../package.json'

const CURRENT_RELEASE_URL =
  'https://api.github.com/repos/CityOfZion/neon-wallet/releases/latest'
export const RETRY_CONFIG = {
  retries: 3,
  retryDelay: () => 1000,
  timeout: 1000,
}

// Actions
export const checkVersion = () => async (dispatch: DispatchType) => {
  const showError = children =>
    dispatch(
      showWarningNotification({
        autoDismiss: 0,
        stack: true,
        position: NOTIFICATION_POSITIONS.BOTTOM_CENTER,
        children,
      }),
    )

  // wait for network connection
  await new Promise(resolve => {
    if (navigator.onLine) {
      resolve()
    } else {
      window.addEventListener('online', resolve)
    }
  })

  // register retry interceptor
  retry(axios, RETRY_CONFIG)

  // get latest release data
  try {
    const response = await axios.get(CURRENT_RELEASE_URL)
    const shouldUpdate =
      response &&
      response.data &&
      compareVersions(version, response.data.tag_name) === -1

    let opsys
    const { platform } = process

    if (platform === 'darwin') {
      opsys = 'MacOS'
    } else if (platform === 'win32' || platform === 'win64') {
      opsys = 'Windows'
    } else if (platform === 'linux') {
      opsys = 'Linux'
    }

    // TODO: this should really only be a check against .deb
    // file extension as auto updates only work on .AppImage
    if (
      shouldUpdate &&
      (opsys === 'Linux' || process.env.NODE_ENV === 'test')
    ) {
      showError(
        <div>
          Your wallet is out of date! Please download the latest version from{' '}
          <ConditionalLink href={NEON_WALLET_RELEASE_LINK}>
            {NEON_WALLET_RELEASE_LINK}
          </ConditionalLink>
        </div>,
      )
    }
  } catch (_) {} // eslint-disable-line no-empty
}
