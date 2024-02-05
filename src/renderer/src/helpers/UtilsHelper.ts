import * as uuid from 'uuid'
export abstract class UtilsHelper {
  static getRandomNumber(max: number) {
    return Math.floor(Math.random() * Math.floor(max))
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

  static arrayMove(array: any[], fromIndex: number, toIndex: number) {
    const newArray = [...array]

    const startIndex = fromIndex < 0 ? newArray.length + fromIndex : fromIndex

    if (startIndex >= 0 && startIndex < newArray.length) {
      const endIndex = toIndex < 0 ? newArray.length + toIndex : toIndex

      const [item] = newArray.splice(fromIndex, 1)
      newArray.splice(endIndex, 0, item)
    }

    return newArray
  }

  static mapFiltered<T, R>(array: T[], callback: (item: T) => R): Exclude<R, null | undefined>[] {
    return array.map(callback).filter((item): item is Exclude<R, null | undefined> => item !== undefined)
  }

  static orderBy<T>(array: T[], field: keyof T, direction: 'asc' | 'desc' = 'asc') {
    return array.sort((a, b) => {
      const aValue = a[field]
      const bValue = b[field]

      if (aValue === bValue) {
        return 0
      }

      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1
      }

      return aValue < bValue ? 1 : -1
    })
  }

  static copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
  }

  static uuid() {
    return uuid.v4()
  }

  static isValidMnemonic(word: string | string[]) {
    const wordArray = Array.isArray(word) ? word : word.trim().split(' ')
    return wordArray.length === 12
  }

  static isMnemonic(word: string | string[]) {
    const wordArray = Array.isArray(word) ? word : word.trim().split(' ')
    return wordArray.length > 1
  }

  static donwloadSVGToPng(elementId: string, fileName: string) {
    const svg = document.getElementById(elementId)
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = fileName
      downloadLink.href = `${pngFile}`
      downloadLink.click()
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }
}
