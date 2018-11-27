// @flow
import axios from 'axios'
import retry from 'axios-retry'
import compareVersions from 'compare-versions'

import { showWarningNotification } from './notifications'
import {
  NEON_WALLET_RELEASE_LINK,
  NOTIFICATION_POSITIONS
} from '../core/constants'
import { version } from '../../package.json'

const DOWNLOAD_LINK = `<a href='${NEON_WALLET_RELEASE_LINK}' target='_blank' class="notification-link">${NEON_WALLET_RELEASE_LINK}</a>`
const CURRENT_RELEASE_URL =
  'https://api.github.com/repos/CityOfZion/neon-wallet/releases/latest'
export const RETRY_CONFIG = {
  retries: 3,
  retryDelay: () => 1000,
  timeout: 1000
}

// Actions
export const checkVersion = () => async (dispatch: DispatchType) => {
  const showError = message =>
    dispatch(
      showWarningNotification({
        message,
        autoDismiss: 0,
        stack: true,
        position: NOTIFICATION_POSITIONS.BOTTOM_CENTER
      })
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

    if (shouldUpdate) {
      showError(
        `Your wallet is out of date! Please download the latest version from ${DOWNLOAD_LINK}`
      )
    }
  } catch (_) {} // eslint-disable-line no-empty
}
