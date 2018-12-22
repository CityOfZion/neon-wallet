export const createFormattedDate = () => {
  const date = new Date()
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const prefix = 0
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return `${days[date.getDay()]} ${date.getDate()} ${
    months[date.getMonth()]
  }  ${hours < 10 ? `${prefix}${hours}` : hours}:${
    minutes < 10 ? `${prefix}${minutes}` : minutes
  }`
}
