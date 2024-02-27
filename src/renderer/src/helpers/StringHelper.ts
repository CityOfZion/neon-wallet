export class StringHelper {
  static truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...'
    }
    return str
  }

  static truncateStringMiddle(str: string, maxLength: number) {
    if (str.length > maxLength) {
      const half = maxLength / 2
      return str.substring(0, half) + '...' + str.substring(str.length - half)
    }
    return str
  }
}
