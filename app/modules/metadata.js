// @flow
import axios from 'axios'
import { api } from 'neon-js'
import compareVersions from 'compare-versions'

import { showWarningNotification } from './notifications'
import { getNetwork } from '../core/deprecated'
import { NEON_WALLET_RELEASE_LINK, NOTIFICATION_POSITIONS } from '../core/constants'
import { version } from '../../package.json'

const DOWNLOAD_LINK = `<a href='${NEON_WALLET_RELEASE_LINK}' target='_blank' class="notification-link">${NEON_WALLET_RELEASE_LINK}</a>`

// Actions
export const checkVersion = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)
  const apiEndpoint = api.neonDB.getAPIEndpoint(net)

  const showError = (message) => {
    return dispatch(showWarningNotification({
      message,
      autoDismiss: 0,
      stack: true,
      position: NOTIFICATION_POSITIONS.BOTTOM_CENTER
    }))
  }

  try {
    const response = await axios.get(`${apiEndpoint}/v2/version`)
    const shouldUpdate = response && response.data && compareVersions(version, response.data.version) === -1

    if (shouldUpdate) {
      showError(`Your wallet is out of date! Please download the latest version from ${DOWNLOAD_LINK}`)
    }
  } catch (err) {
    showError(`Error checking wallet version! Please make sure you have downloaded the latest version: ${DOWNLOAD_LINK}`)
  }
}
