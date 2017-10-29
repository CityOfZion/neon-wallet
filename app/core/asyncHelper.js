export default function asyncWrap (promise) {
  return promise.then(data => {
    return [null, data]
  }).catch(err => [err])
}
