// @flow
import { api, u } from 'neon-js'
import { createActions } from 'spunky'

type Props = {
  net: string,
  address: string
}

export const ID = 'CLAIMS'

export default createActions(ID, ({ net, address }: Props = {}) => async (state: Object): Promise<Object> => {
  const total = await api.getMaxClaimAmountFrom({ net, address }, api.neoscan)
  return { total: total instanceof u.Fixed8 ? total.toString() : null }
})
