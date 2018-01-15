// @flow
import { uniqueId } from 'lodash'

const TOKEN_ID_PREFIX = '_ug'

export const getNewTokenItem = (networkId: string) => ({
  id: uniqueId(TOKEN_ID_PREFIX),
  symbol: '',
  scriptHash: '',
  networkId,
  isUserGenerated: true
})

export const validateTokens = (tokens: Array<TokenItemType>) => {
  let errorMessage = null
  let errorType = null
  let errorItemId = null

  tokens.some(({ symbol, scriptHash, id }: TokenItemType) => {
    if (!symbol) {
      errorMessage = 'Symbol cannot be left blank'
      errorType = 'symbol'
    } else if (!scriptHash) {
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
