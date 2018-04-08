// @flow
import { api } from 'neon-js'
import { createActions } from 'spunky'

type Props = {
  net: string,
  address: string
}

export const ID = 'CLAIMS'

export default createActions(ID, ({ net, address }: Props = {}) => async (state: Object): Promise<Object> => {
  const total = await api.loadBalance(api.getMaxClaimAmountFrom, { net, address })
  return { total: total.toString() }
})
