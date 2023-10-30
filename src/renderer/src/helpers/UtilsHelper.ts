export abstract class UtilsHelper {
  static getRandomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  static isMnemonic(word: string | string[]) {
    const wordArray = Array.isArray(word) ? word : word.trim().split(' ')
    return wordArray.length === 12
  }
}
