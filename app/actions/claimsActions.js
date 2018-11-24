// @flow
import { api } from 'neon-js'
import { createActions } from 'spunky'

type Props = {
  net: string,
  address: string
}

export const ID = 'claims'

export default createActions(
  ID,
  ({ net, address }: Props = {}) => async (): Promise<Object> => {
    const total = await api.getMaxClaimAmountFrom({ net, address }, api.neoscan)
    return { total: total.toString() }
  }
)
