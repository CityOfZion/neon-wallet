// @flow
import { api } from 'neon-js'

import createRequestActions from '../util/api/createRequestActions'

type Props = {
  net: string,
  address: string
}

export const ID = 'CLAIMS'

export default createRequestActions(ID, ({ net, address }: Props = {}) => async (state: Object): Promise<Object> => {
  const total = await api.neonDB.getMaxClaimAmount(net, address)
  return { total: total.toString() }
})
