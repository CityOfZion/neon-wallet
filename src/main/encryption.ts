import { ipcMain, safeStorage } from 'electron'
import crypto from 'node:crypto'

const ALGORITHM = 'aes-192-cbc'

export function registerEncryptionHandlers() {
  ipcMain.handle('encryptBasedOS', async (_event, value: string) => {
    const buffer = safeStorage.encryptString(value)
    return buffer.toString('base64')
  })

  ipcMain.handle('decryptBasedOS', async (_event, value: string) => {
    const buffer = Buffer.from(value, 'base64')
    return safeStorage.decryptString(buffer)
  })

  ipcMain.handle('encryptBasedSecret', async (_event, value: string, secret: string) => {
    const iv = crypto.randomBytes(16)
    const key = crypto.scryptSync(secret, 'salt', 24)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    const encrypted = cipher.update(value, 'utf8', 'hex') + cipher.final('hex')
    return iv.toString('hex') + encrypted
  })

  ipcMain.handle('decryptBasedSecret', async (_event, value: string, secret: string) => {
    const iv = Buffer.from(value.slice(0, 32), 'hex')
    const key = crypto.scryptSync(secret, 'salt', 24)
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    return decipher.update(value.slice(32), 'hex', 'utf8') + decipher.final('utf8')
  })
}
