export const delay = t =>
  new Promise(resolve => {
    setTimeout(resolve, t)
  })

export const raceAll = (promises, timeoutTime) =>
  Promise.all(promises.map(p => Promise.race([p, delay(timeoutTime)])))
