// @flow
import uuidv4 from 'uuid/v4'

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

  tokens.some(({ symbol, scriptHash, id }: TokenItemType) => {
    if (!scriptHash) {
      errorMessage = 'Script hash cannot be left blank'
      errorType = 'scriptHash'
    }

    if (errorMessage) {
      errorItemId = id
      return true
    }
  })

  return {
    errorMessage,
    errorType,
    errorItemId
  }
}
