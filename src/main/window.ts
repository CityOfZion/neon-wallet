import { BrowserWindow, dialog, ipcMain } from 'electron'
import { writeFile } from 'fs/promises'

export function registerWindowHandlers() {
  ipcMain.handle('restore', () => {
    const [mainWindow] = BrowserWindow.getAllWindows()
    if (!mainWindow) return

    if (mainWindow.isMinimized()) {
      mainWindow.restore()
    } else {
      mainWindow.show()
    }
    mainWindow.focus()
  })

  ipcMain.handle('openDialog', async () => {
    const result = await dialog.showOpenDialog({ properties: ['openDirectory'] })
    if (result.canceled) throw new Error('Dialog cancelled')
    return result.filePaths
  })

  ipcMain.handle('saveFile', async (_event, path: string, content: string) => {
    const buff = Buffer.from(content, 'utf-8')
    await writeFile(path, buff)
  })
}
