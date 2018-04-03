// @flow
import { api } from 'neon-js'
import { createActions } from 'spunky'

type Props = {
  net: string,
  scriptHash: string
}

export const ID = 'TOKEN'

export default createActions(ID, ({ net, scriptHash }: Props = {}) => async () => {
  const endpoint = await api.loadBalance(api.getRPCEndpointFrom, { net })
  const response = await api.nep5.getTokenInfo(endpoint, scriptHash)

  return { ...response, scriptHash }
})
