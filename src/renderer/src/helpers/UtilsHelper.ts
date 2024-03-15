import { getI18n } from 'react-i18next'
import * as uuid from 'uuid'

import { ToastHelper } from './ToastHelper'

export class UtilsHelper {
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
    const { t } = getI18n()
    ToastHelper.success({ message: t('common:general.successfullyCopied') })
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

  static getRandomTokenColor(symbol: string) {
    const mandatoryColors: Record<string, string> = {
      NEO: '#56f33f',
      GAS: '#02c797',
    }

    return mandatoryColors[symbol] ?? `#${(0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)}`
  }

  static normalizeHash(hash: string) {
    return hash.replace('0x', '').toLowerCase()
  }

  static generateTokenColor(hash: string) {
    if (hash.length === 0) throw new Error('Invalid hash')

    const normalizedHash = this.normalizeHash(hash)

    const mandatoryColors: Record<string, string> = {
      ef4073a0f2b305a38ec4050e4d3d28bc40ea63f5: '#56f33f',
      d2a4cff31913016155e38e474a2c06d08be276cf: '#02c797',
    }

    if (mandatoryColors[normalizedHash]) return mandatoryColors[normalizedHash]

    let hashCode = 0

    for (let index = 0; index < normalizedHash.length; index++) {
      hashCode = normalizedHash.charCodeAt(index) + ((hashCode << 5) - hashCode)
      hashCode = hashCode & hashCode
    }

    let color = '#'
    for (let index = 0; index < 3; index++) {
      const value = (hashCode >> (index * 8)) & 255
      color += ('00' + value.toString(16)).substr(-2)
    }

    return color
  }

  static sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}
