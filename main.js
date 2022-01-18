const {
  app,
  shell,
  Menu,
  BrowserWindow,
  globalShortcut,
  session,
  ipcMain,
} = require('electron') // eslint-disable-line import/no-extraneous-dependencies
const path = require('path')
const url = require('url')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

const port = process.env.PORT || 3000

let mainWindow = null
let deeplinkingUrl

// Force Single Instance Application
const gotTheLock = app.requestSingleInstanceLock()
if (gotTheLock) {
  app.on('second-instance', (e, argv) => {
    // Someone tried to run a second instance, we should focus our window.

    // Protocol handler for win32
    // argv: An array of the second instance’s (command line / deep linked) arguments
    if (process.platform === 'win32' || process.platform === 'linux') {
      // Keep only command line / deep linked arguments
      const args = argv.slice(1)
      if (process.platform === 'win32') {
        // eslint-disable-next-line
        deeplinkingUrl = args[1]
      } else {
        // eslint-disable-next-line
        deeplinkingUrl = args[0]
      }
      deeplinkingUrl = deeplinkingUrl.endsWith('/')
        ? deeplinkingUrl.slice(0, -1)
        : deeplinkingUrl
      if (mainWindow?.webContents) {
        mainWindow.webContents.send('link', deeplinkingUrl)
      }
    }

    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
} else {
  app.quit()
  return
}

// adapted from https://github.com/chentsulin/electron-react-boilerplate
const installExtensions = () => {
  const installer = require('electron-devtools-installer') // eslint-disable-line import/no-extraneous-dependencies
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map(name => installer.default(installer[name])),
  ).catch(console.error)
}

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
  // https://github.com/electron/electron/blob/master/docs/tutorial/security.md#csp-http-header
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({ responseHeaders: "default-src 'none'" }) // eslint-disable-line
  })
  const onAppReady = () => {
    mainWindow = new BrowserWindow({
      height: 750,
      width: 1200,
      minHeight: 750,
      minWidth: 1200,
      titleBarStyle: 'hidden',
      frame: false,
      show: false,
      icon: path.join(__dirname, 'icons/png/64x64.png'),
      contextIsolation: true,
      webPreferences: {
        enableRemoteModule: true,
        allowRunningInsecureContent: false,
        webSecurity: true,
        nodeIntegration: false,
        preload: path.join(__dirname, 'preload.js'),
      },
    })

    autoUpdater.checkForUpdatesAndNotify()

    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
      mainWindow.focus()
    })

    // https://discuss.atom.io/t/prevent-window-navigation-when-dropping-a-link/24365
    mainWindow.webContents.on('will-navigate', ev => {
      ev.preventDefault()
    })

    mainWindow.on('close', e => {
      if (mainWindow) {
        e.preventDefault()
        mainWindow.webContents.send('quit')
      }
    })

    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.once('dom-ready', () => {
        mainWindow.webContents.openDevTools()
      })
    }

    if (process.platform === 'win32') {
      // Keep only command line / deep linked arguments
      deeplinkingUrl = process.argv.slice(1)
    }

    if (process.platform !== 'darwin') {
      // Windows/Linux Menu
      mainWindow.setMenu(null)
    } else {
      // Menu is required for MacOS
      const template = [
        {
          label: app.getName(),
          submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }],
        },
        {
          label: 'Edit',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
          ],
        },
        {
          label: 'View',
          submenu: [{ role: 'toggledevtools' }],
        },
        {
          role: 'help',
          submenu: [
            {
              label: 'City of Zion',
              click() {
                shell.openExternal('https://cityofzion.io/')
              },
            },
            {
              label: 'GitHub',
              click() {
                shell.openExternal('https://github.com/CityOfZion')
              },
            },
            {
              label: 'NEO Reddit',
              click() {
                shell.openExternal('https://www.reddit.com/r/NEO/')
              },
            },
          ],
        },
      ]
      const menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
    }

    const inputMenu = Menu.buildFromTemplate([
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        click() {
          mainWindow.webContents.paste()
        },
      },
    ])

    mainWindow.webContents.on('context-menu', () => {
      inputMenu.popup(mainWindow)
    })

    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('link', deeplinkingUrl)
    })

    if (process.env.START_HOT) {
      mainWindow.loadURL(`http://localhost:${port}/dist`)
    } else {
      mainWindow.loadURL(
        url.format({
          protocol: 'file',
          slashes: true,
          pathname: path.join(__dirname, '/app/dist/index.html'),
        }),
      )
    }
    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  // register any shortcuts here
  globalShortcut.register('CommandOrControl+M', () => {
    mainWindow.minimize()
  })

  if (process.env.NODE_ENV === 'development') {
    installExtensions().then(() => onAppReady())
  } else {
    onAppReady()
  }
})

app.on('open-url', (event, url) => {
  deeplinkingUrl = url
  if (mainWindow?.webContents) {
    mainWindow.webContents.send('link', deeplinkingUrl)
  }
})

if (process.env.NODE_ENV === 'development' && process.platform === 'win32') {
  // Set the path of electron.exe and your app.
  // These two additional parameters are only available on windows.
  // Setting this is required to get this working in dev mode.
  app.setAsDefaultProtocolClient('neon', process.execPath, [])
} else {
  app.setAsDefaultProtocolClient('neon')
}

app.on('web-contents-created', (event, wc) => {
  wc.on('before-input-event', (event, input) => {
    // Windows/Linux hotkeys
    if (process.platform !== 'darwin') {
      if (input.key === 'F12') {
        mainWindow.webContents.openDevTools()
        event.preventDefault()
      }
    }
  })
})

app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})

ipcMain.on('closed', () => {
  mainWindow = null
  app.quit()
})

autoUpdater.logger = log
autoUpdater.logger.transports.file.level = 'info'

function sendStatusToWindow(text) {
  log.info(text)
  mainWindow.webContents.send('message', text)
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...')
})
autoUpdater.on('update-available', info => {
  // eslint-disable-next-line prefer-template
  sendStatusToWindow('Update available. ' + info)
})
autoUpdater.on('update-not-available', () => {
  sendStatusToWindow('Update not available.')
})
autoUpdater.on('error', err => {
  // eslint-disable-next-line prefer-template
  sendStatusToWindow('Error in auto-updater. ' + err)
})
autoUpdater.on('download-progress', progressObj => {
  // eslint-disable-next-line prefer-template
  let logMessage = 'Download speed: ' + progressObj.bytesPerSecond
  // eslint-disable-next-line prefer-template
  logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%'
  logMessage =
    // eslint-disable-next-line prefer-template
    logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
  sendStatusToWindow(logMessage)
})
autoUpdater.on('update-downloaded', info => {
  // eslint-disable-next-line prefer-template
  sendStatusToWindow('Update downloaded ' + info)
})
