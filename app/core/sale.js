// @flow
export const validateMintTokensInputs = (
  neoToMint: number,
  gasToMint: number,
  scriptHash: string,
  NEO: number,
  GAS: number
) => {
  let message

  if (neoToMint < 0 || gasToMint < 0 || (neoToMint === 0 && gasToMint === 0)) {
    message = 'You must send positive amounts of NEO or GAS.'
    return [false, message]
  }

  if (neoToMint && parseFloat(neoToMint) !== parseInt(neoToMint)) {
    message = 'You cannot send fractional NEO to a token sale.'
    return [false, message]
  }

  if ((neoToMint && isNaN(neoToMint)) || (gasToMint && isNaN(gasToMint))) {
    message = 'Please enter valid numbers only'
    return [false, message]
  }

  if (neoToMint > NEO) {
    message = 'You do not have enough NEO to send.'
    return [false, message]
  }

  if (gasToMint > GAS) {
    message = 'You do not have enough GAS to send.'
    return [false, message]
  }

  if (
    scriptHash.slice(0, 1) !== '0x' &&
    scriptHash.length !== 42 &&
    scriptHash.length !== 40
  ) {
    message = 'Not a valid script hash.'
    return [false, message]
  }

  return [true, '']
}

export const validateOldMintTokensInputs = (
  neoToMint: number,
  scriptHash: string,
  NEO: number,
  GAS: number
) => {
  let message

  if (neoToMint <= 0) {
    message = 'You must send a positive integer of NEO above 0.'
    return [false, message]
  }

  if (neoToMint && parseFloat(neoToMint) !== parseInt(neoToMint)) {
    message = 'You cannot send fractional NEO to a token sale.'
    return [false, message]
  }

  if (neoToMint && isNaN(neoToMint)) {
    message = 'Please enter valid numbers only'
    return [false, message]
  }

  if (neoToMint > NEO) {
    message = 'You do not have enough NEO to send.'
    return [false, message]
  }

  if (
    scriptHash.slice(0, 1) !== '0x' &&
    scriptHash.length !== 42 &&
    scriptHash.length !== 40
  ) {
    message = 'Not a valid script hash.'
    return [false, message]
  }

  return [true, '']
}
