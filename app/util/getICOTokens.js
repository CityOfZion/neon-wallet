import store from '../store/configureStore'

import ICOTokenList from '../../ICOTokens.json'

export const getICOTokens = () => {
  const state = store.getState()
  /* eslint-disable-next-line */
  const tokens = state.spunky.settings.data.tokens
  const userGeneratedTokens = tokens.filter(
    token => token.isUserGenerated === true
  )

  const combinedTokenList = [
    ...userGeneratedTokens,
    ...ICOTokenList.ICOTokens
  ].map(token => ({
    token: token.symbol,
    supply: token.supply || null,
    id: token.id,
    scriptHash: token.scriptHash
  }))

  return combinedTokenList
}
