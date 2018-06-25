export default function asyncWrap(promise) {
  return promise.then(data => [null, data]).catch(err => [err])
}
