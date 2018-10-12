import { get } from 'lodash-es'
import { TOKENS, MAIN_NETWORK_ID } from '../core/constants'

const hashToSymbol = hash =>
  Object.keys(TOKENS).find(currentSymbol => {
    const currentHash = get(
      TOKENS,
      `${currentSymbol}.networks.${MAIN_NETWORK_ID}.hash`
    )
    return currentHash === hash
  })

export default hashToSymbol
