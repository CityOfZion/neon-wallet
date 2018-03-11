import delay from './delay'

const DEFAULT_ATTEMPTS = Infinity
const DEFAULT_FREQUENCY = 1000

export default function poll (request, { attempts = DEFAULT_ATTEMPTS, frequency = DEFAULT_FREQUENCY } = {}) {
  return request().catch(function retry (err) {
    if (attempts-- > 0) {
      return delay(frequency).then(request).catch(retry)
    } else {
      throw err
    }
  })
}
