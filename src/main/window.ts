import { BrowserWindow, ipcMain } from 'electron'

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
}
