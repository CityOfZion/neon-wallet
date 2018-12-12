export function bindArgsFromN(fn, n, ...boundArgs) {
  return (...args) => fn(...args.slice(0, n - 1), ...boundArgs)
}
