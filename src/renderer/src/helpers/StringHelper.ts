export class StringHelper {
  static formatPrice(price) {
    if (!price) {
      return '$0.00'
    }
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }

  static truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...'
    }
    return str
  }
}
