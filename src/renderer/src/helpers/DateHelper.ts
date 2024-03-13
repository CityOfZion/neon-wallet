export class DateHelper {
  static timeToDate = (unixTime: number): string => {
    const date = new Date(unixTime * 1000)
    return date.toLocaleDateString()
  }

  static timeToHour = (unixTime: number): string => {
    const date = new Date(unixTime * 1000)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  static unixToDateHour = (unixTime: number): string => {
    return `${this.timeToDate(unixTime)} ${this.timeToHour(unixTime)}`
  }
}
