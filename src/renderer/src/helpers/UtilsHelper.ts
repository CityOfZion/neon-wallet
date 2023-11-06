export abstract class UtilsHelper {
  static getRandomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  static isMnemonic(word: string | string[]) {
    const wordArray = Array.isArray(word) ? word : word.trim().split(' ')
    return wordArray.length === 12
  }

  static async promiseAll<T, R>(array: T[], callback: (item: T) => Promise<R> | R): Promise<R[]> {
    const results: R[] = []
    const promises = array.map(async item => {
      try {
        const result = await callback(item)
        results.push(result)
      } catch {
        /* empty */
      }
    })
    await Promise.all(promises)
    return results
  }
}
