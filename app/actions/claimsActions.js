// @flow
import { api } from 'neon-js'

import createRequestActions from '../util/api/createRequestActions'
import { toBigNumber } from '../core/math'
import { COIN_DECIMAL_LENGTH } from '../core/formatters'

type Props = {
  net: string,
  address: string
}

const toDecimal = (intValue) => toBigNumber(intValue).div(10 ** COIN_DECIMAL_LENGTH).toString()

export const ID = 'CLAIMS'

export default createRequestActions(ID, ({ net, address }: Props = {}) => async (state: Object): Promise<Object> => {
  const result = await api.neonDB.getClaims(net, address)

  return {
    total: toDecimal(result.total_claim + result.total_unspent_claim),
    available: toDecimal(result.total_claim),
    unavailable: toDecimal(result.total_unspent_claim)
  }
})
