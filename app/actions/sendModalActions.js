// @flow
import { createActions } from 'spunky'
import { noop } from 'lodash-es'
import parseQRCode, { type RecipientData } from '../util/parseQRCode'

export const ID = 'send'

export const getRecipientData = createActions(
  ID,
  (url: string) => (): RecipientData => {
    try {
      return parseQRCode(url)
    } catch (msg) {
      throw new Error(msg)
    }
  }
)

export const clearRecipientData = createActions(ID, () => () => null)

export default createActions(ID, () => () => noop)
