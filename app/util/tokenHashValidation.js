// @flow
export const ensureHex = (token: string): boolean => {
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

export const validateHashLength = (token: string): boolean =>
  token.length === 40
