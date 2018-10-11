// @flow
import uuidv4 from 'uuid/v4'
import {
  ensureHex,
  validateHashLength
} from '../../../util/tokenHashValidation'

export const getNewTokenItem = (networkId: string) => ({
  id: uuidv4(),
  scriptHash: '',
  networkId,
  isUserGenerated: true
})

export const validateTokens = (tokens: Array<TokenItemType>) => {
  let errorMessage = null
  let errorType = null
  let errorItemId = null

  tokens.some(({ scriptHash, id }: TokenItemType) => {
    if (!scriptHash) {
      errorMessage = 'Invalid script hash length'
      errorType = 'scriptHash'
    }

    if (errorMessage) {
      errorItemId = id
      return true
    }
    return false
  })

  const invalidTokens = tokens
    .map(({ scriptHash }) => scriptHash)
    .filter(ensureHex)
    .filter(validateHashLength)

  if (invalidTokens) {
    errorMessage = 'Invalid script hash detected.'
    errorType = 'scriptHash'
  }

  return {
    errorMessage,
    errorType,
    errorItemId
  }
}
