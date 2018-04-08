// @flow
type Options = {
  punctuation: string,
  conjunction: string
}

const toSentence = (array: Array<any>, { punctuation = ',', conjunction = 'and' }: Options = {}) => {
  if (array.length <= 2) {
    return array.join(` ${conjunction} `)
  }

  return [
    array.slice(0, array.length - 1).join(`${punctuation} `),
    array.slice(-1)
  ].join(`${punctuation} ${conjunction} `)
}

export default toSentence
