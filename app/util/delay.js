export default function delay (duration) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve() }, duration)
  })
}
