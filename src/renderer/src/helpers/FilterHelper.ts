export type InputType = string | number | null

export class FilterHelper {
  static currency(input?: InputType, minimumFractionDigits = 2, maximumFractionDigits = 2) {
    const num = Number(input)

    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(isNaN(num) ? 0 : num)
    } catch {
      return '0'
    }
  }
}
