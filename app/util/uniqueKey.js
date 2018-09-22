const generateUniqueKey = () => {
  let key = 0
  return function uniqueKey() {
    key += 1
    return key
  }
}
const uniqueKey = generateUniqueKey()

export default uniqueKey
