import { TOKENS } from '../core/constants'

const hashToSymbol = hash =>
  Object.keys(TOKENS).find(currentSymbol => {
    const currentHash = TOKENS[currentSymbol].networks['1'].hash
    return currentHash === hash
  })

export default hashToSymbol
