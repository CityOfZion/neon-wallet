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

export const validateTokens = (
  tokens: Array<TokenItemType>,
  configuredTokens: Array<TokenItemType>
) => {
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
    .filter(hash => !ensureHex(hash))
    .filter(hash => !validateHashLength(hash))

  if (invalidTokens.length) {
    errorMessage = 'Invalid script hash detected.'
    errorType = 'scriptHash'
  }
  tokens.forEach(token => {
    const duplicate = configuredTokens.find(
      configuredToken => configuredToken.scriptHash === token.scriptHash
    )
    if (duplicate) {
      console.warn('Attempted to add duplicate hash', { duplicate })
      if (duplicate.symbol) {
        errorMessage = `Script hash for ${
          duplicate.symbol
        } already configured in Neon - cannot add duplicate`
      } else {
        errorMessage =
          'Script hash  already configured in Neon - cannot add duplicate'
      }
      errorType = 'scriptHash'
    }
  })

  return {
    errorMessage,
    errorType,
    errorItemId
  }
}
