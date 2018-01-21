// @flow
import axios from 'axios'
import { api } from 'neon-js'

import { showWarningNotification } from './notifications'
import asyncWrap from '../core/asyncHelper'
import { getNetwork } from '../core/deprecated'
import { NEON_WALLET_RELEASE_LINK, NOTIFICATION_POSITIONS } from '../core/constants'
import { version } from '../../package.json'

// Actions
export const checkVersion = () => async (dispatch: DispatchType, getState: GetStateType) => {
  const state = getState()
  const net = getNetwork(state)
  const apiEndpoint = api.neonDB.getAPIEndpoint(net)

  const [err, res] = await asyncWrap(axios.get(`${apiEndpoint}/v2/version`))
  const shouldUpdate = res && res.data && res.data.version !== version
  if (err || shouldUpdate) {
    const link = `<a href='${NEON_WALLET_RELEASE_LINK}' target='_blank' class="notification-link">${NEON_WALLET_RELEASE_LINK}</a>`
    const message = err
      ? `Error checking wallet version! Please make sure you have downloaded the latest version: ${link}`
      : `Your wallet is out of date! Please download the latest version from ${link}`
    return dispatch(
      showWarningNotification({
        message,
        autoDismiss: 0,
        stack: true,
        position: NOTIFICATION_POSITIONS.BOTTOM_CENTER
      })
    )
  }
}
