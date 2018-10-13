// @flow
export const ensureHex = (token: string): boolean => {
  const hexRegex = /^([0-9A-Fa-f]{2})*$/
  try {
    return hexRegex.test(token)
  } catch (err) {
    return false
  }
}

export const validateHashLength = (token: string): boolean =>
  token.length === 40
