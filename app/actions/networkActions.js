// @flow
import createRequestActions from '../util/api/createRequestActions'
import { MAIN_NETWORK_ID } from '../core/constants'

type Props = {
  networkId: string
}

export const ID = 'NETWORK'

export default createRequestActions(ID, ({ networkId }: Props = {}) => (state: Object) => {
  return networkId || MAIN_NETWORK_ID
})
