import { BrowserWindow, dialog, ipcMain, OpenDialogOptions } from 'electron'
import { readFile, writeFile } from 'fs/promises'

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

  ipcMain.handle('openDialog', async (_event, options: OpenDialogOptions) => {
    const result = await dialog.showOpenDialog(options)
    if (result.canceled) throw new Error('Dialog cancelled')
    return result.filePaths
  })

  ipcMain.handle('readFile', async (_event, path: string) => {
    const file = await readFile(path)
    return file.toString('utf-8')
  })

  ipcMain.handle('saveFile', async (_event, path: string, content: string) => {
    const buff = Buffer.from(content, 'utf-8')
    await writeFile(path, buff)
  })
}
