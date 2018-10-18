// @flow
/* eslint-disable */
import QRCode from 'qrcode/lib/browser'
import nep9 from './nep9'
import tokenList from '../../core/tokenList.json'
import { imageMap } from '../../assets/nep5/svg'

const TOKENS = Object.keys(tokenList)
  .map(key => tokenList[key])
  .reduce((accum, token) => {
    accum[token.networks[1].hash] = token
    return accum
  }, {})

export default class Nep9QrGenerator {
  static parseUri(uri: string) {
    return nep9.parseUri(uri)
  }

  // $FlowFixMe
  constructor({ nep9Data, width = 250, canvasEl, imgEl }) {
    let canvas
    // $FlowFixMe
    this.uri = nep9.generateUri(nep9Data)
    const options = {
      errorCorrectionLevel: 'Q',
      width
    }

    // $FlowFixMe
    this.creationPromise = Promise.all([
      Promise.resolve(TOKENS),
      new Promise((resolve, reject) => {
        QRCode.toCanvas(
          // $FlowFixMe
          this.uri,
          options,
          (err, canvas) => (err ? reject(err) : resolve(canvas))
        )
      })
    ])
      .then(([nep5Data, c]) => {
        canvas = c
        const token = {}
        if (nep9Data.asset === 'NEO') token.symbol = 'NEO'
        if (nep9Data.asset === 'GAS') token.symbol = 'GAS'
        else {
          const foundToken =
            Object.keys(tokenList)
              .map(key => tokenList[key])
              .find(token => token.networks[1].hash === nep9Data.asset) || {}
          token.symbol = foundToken.symbol
        }
        const logo = imageMap[token.symbol] || imageMap.NEO
        return {
          logoSrc: logo,
          isGasOrNeo: nep9Data.asset === 'NEO' || nep9Data.asset === 'GAS'
        }
      })
      .then(
        ({ logoSrc, isGasOrNeo }) =>
          new Promise(resolve => {
            const context = canvas.getContext('2d')
            // $FlowFixMe
            context.roundRect = function(x, y, w, h, r) {
              if (w < 2 * r) {
                r = w / 2
              }
              if (h < 2 * r) {
                r = h / 2
              }
              // $FlowFixMe
              this.beginPath()
              // $FlowFixMe
              this.moveTo(x + r, y)
              // $FlowFixMe
              this.arcTo(x + w, y, x + w, y + h, r)
              // $FlowFixMe
              this.arcTo(x + w, y + h, x, y + h, r)
              // $FlowFixMe
              this.arcTo(x, y + h, x, y, r)
              // $FlowFixMe
              this.arcTo(x, y, x + w, y, r)
              // $FlowFixMe
              this.closePath()
              return this
            }
            const img = new Image()
            img.onload = () => {
              const scale = isGasOrNeo ? 1.15 : 1.35
              context.roundRect(
                70 * scale,
                70 * scale,
                60 * scale,
                60 * scale,
                5 * scale
              )
              context.fillStyle = 'white'
              context.fill()
              context.drawImage(
                img,
                80 * scale,
                80 * scale,
                40 * scale,
                40 * scale
              )
              const dt = canvas.toDataURL('image/png')
              if (canvasEl) {
                canvasEl.width = canvas.width
                canvasEl.height = canvas.height
                const destCtx = canvasEl.getContext('2d')
                destCtx.drawImage(canvas, 0, 0)
              } else if (imgEl) {
                imgEl.src = dt
              }
              resolve(dt)
            }
            img.src = logoSrc
          })
      )
  }
  toDataURL(): Promise<any> {
    // $FlowFixMe
    return this.creationPromise
  }
}
