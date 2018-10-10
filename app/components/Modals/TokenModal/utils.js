// @flow
import uuidv4 from 'uuid/v4'

export const getNewTokenItem = (networkId: string) => ({
  id: uuidv4(),
  scriptHash: '',
  networkId,
  isUserGenerated: true
})

const ensureHex = (token: string): boolean => {
  const hexRegex = /^([0-9A-Fa-f]{2})*$/
  try {
    return hexRegex.test(token)
  } catch (err) {
    console.warn('An invalid script hash was manually entered in Settings!', {
      scriptHash: token
    })
    return false
  }
}

const validateHashLength = (token: string): boolean => token.length === 40

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
