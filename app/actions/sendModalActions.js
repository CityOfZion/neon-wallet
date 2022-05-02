// @flow
import { createActions } from 'spunky'
import { noop } from 'lodash-es'
import parseQRCode, { type RecipientData } from '../util/parseQRCode'

export const ID = 'send'

export const getRecipientData = createActions(
  ID,
  ({ url, chain, net }) => async (): Promise<RecipientData> => {
    try {
      if (chain === 'neo2' || url.includes('neo:'))
        return parseQRCode({ url, net, chain })
      return { address: url, amount: '', asset: '', reference: '' }
    } catch (msg) {
      throw new Error(msg)
    }
  },
)

export const clearRecipientData = createActions(ID, () => () => null)

export default createActions(ID, () => () => noop)
