import delay from './delay'

const DEFAULT_ATTEMPTS = Infinity
const DEFAULT_FREQUENCY = 1000

export class TimeoutError extends Error {
  constructor() {
    super('Poll reached maximum attempts')
    this.name = 'TimeoutError'
  }
}

export default function poll(
  request,
  { attempts = DEFAULT_ATTEMPTS, frequency = DEFAULT_FREQUENCY } = {}
) {
  return request().catch(function retry() {
    // eslint-disable-next-line
    if (attempts-- > 0) {
      return delay(frequency)
        .then(request)
        .catch(retry)
    }
    throw new TimeoutError()
  })
}
