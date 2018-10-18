// @flow
function generateUri(nep9Data: Object): string {
  const parameters = Object.keys(nep9Data).reduce((accum, key) => {
    if (
      nep9Data[key] !== null &&
      nep9Data[key] !== undefined &&
      nep9Data[key] !== ''
    ) {
      const value = encodeURIComponent(nep9Data[key])
      accum.push(`${key}=${value}`)
    }
    return accum
  }, [])

  let output = `neo:${nep9Data.address}`

  if (parameters.length) {
    output += `?${parameters.join('&')}`
  }

  return output
}

function parseUri(uri: string) {
  if (!uri.startsWith('neo:')) {
    throw new Error('Not a valid NEP9 uri')
  }

  // eslint-disable-next-line
  uri = uri.replace(/^(neo\:)/, '')

  const uriParts = uri.split('?')
  const nep9 = {
    address: uriParts[0]
  }

  if (uriParts.length === 1) {
    return nep9
  }

  const attributes = uriParts[1]
  const attributesList = attributes.split('&')

  attributesList.forEach(attribute => {
    const attributeParts = attribute.split('=')

    if (attributeParts.length < 2) {
      return
    }

    const key = attributeParts[0]
    const value = attributeParts[1]

    nep9[key] = value
  })

  return nep9
}

export default {
  generateUri,
  parseUri
}
