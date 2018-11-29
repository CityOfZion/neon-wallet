import delay from './delay'

const DEFAULT_ATTEMPTS = Infinity
const DEFAULT_FREQUENCY = 1000

export class CancellationError extends Error {
  constructor() {
    super('Polling was actively cancelled')
    this.name = 'CancellationError'
  }
}

export class TimeoutError extends Error {
  constructor() {
    super('Polling reached max attempts')
    this.name = 'TimeoutError'
  }
}

export function cancellablePoll(
  request,
  { attempts = DEFAULT_ATTEMPTS, frequency = DEFAULT_FREQUENCY } = {}
) {
  let hasCancelled = false
  const promise = request().catch(function retry() {
    if (hasCancelled) {
      throw new CancellationError()
    }

    // eslint-disable-next-line
    if (attempts-- > 0) {
      return delay(frequency)
        .then(request)
        .catch(retry)
    }
    throw new TimeoutError()
  })

  return {
    promise,
    cancel() {
      hasCancelled = true
    }
  }
}

export default function poll(request, config) {
  return cancellablePoll(request, config).promise
}
