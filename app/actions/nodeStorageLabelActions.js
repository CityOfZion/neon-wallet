// @flow
import { createActions } from 'spunky'
import { random, get, compact } from 'lodash-es'
import { rpc, api, settings } from '@cityofzion/neon-js'

import { getStorage, setStorage } from '../core/storage'
import {
  MAIN_NETWORK_ID,
  TEST_NETWORK_ID,
  NODES_MAIN_NET,
  NODES_N3_MAIN_NET,
  NODES_N3_TEST_NET,
  NODES_TEST_NET,
  NODE_EXLUSION_CRITERIA,
} from '../core/constants'
import { findNetworkByDeprecatedLabel } from '../core/networks'
import { getSettings } from './settingsActions'

const PING_TIMEOUT_OVERRIDE = 1000
const DEFAULT_PING_TIMEOUT = settings.timeout.ping

const ID = 'nodeStorage'
export const STORAGE_KEY = 'selectedNode'
const CACHE_EXPIRATION =
  15 /* minutes */ * 60 /* seconds */ * 1000 /* milliseconds */
const cachedRPCUrl = {}

type Net = NetworkLabelTypes

type Props = {
  url: string,
  net: Net,
  label?: string,
}

export default createActions(ID, ({ net }: Props = {}) => async (): Promise<
  string,
> => {
  console.log('node storage label actions')
  const storage = await getStorage(`${STORAGE_KEY}-${net}`).catch(console.error)
  const labelInStorage = get(storage, 'label')
  return labelInStorage
})
