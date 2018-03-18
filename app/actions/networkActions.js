// @flow
import { createActions } from 'spunky'

import { MAIN_NETWORK_ID } from '../core/constants'

type Props = {
  networkId: string
}

export const ID = 'NETWORK'

export default createActions(ID, ({ networkId }: Props = {}) => (state: Object) => {
  return networkId || MAIN_NETWORK_ID
})
