const { app, shell, Menu, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const port = process.env.PORT || 3000

let mainWindow = null

// adapted from https://github.com/chentsulin/electron-react-boilerplate
const installExtensions = () => {
  const installer = require('electron-devtools-installer')
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ]

  return Promise
    .all(extensions.map(name => installer.default(installer[name])))
    .catch(console.log)
}

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
  const onAppReady = () => {
    mainWindow = new BrowserWindow({
      height: 750,
      width: 1000,
      minHeight: 750,
      minWidth: 1000,
      icon: path.join(__dirname, 'icons/png/64x64.png'),
      webPreferences: {
        webSecurity: false
      }
    })

    if (process.platform !== 'darwin') {
    // Windows/Linxu Menu
	  mainWindow.setMenu(null)
    } else {
    // Menu is required for MacOS
	  const template = [
        {
  	    label: app.getName(),
  	    submenu: [
  				{role: 'about'},
  				{type: 'separator'},
  	      {role: 'quit'}
  	    ]
        },
        {
		    label: 'Edit',
		    submenu: [
		      {role: 'undo'},
		      {role: 'redo'},
		      {type: 'separator'},
		      {role: 'cut'},
		      {role: 'copy'},
		      {role: 'paste'}
		    ]
		  },
		  {
		    label: 'View',
		    submenu: [
		      {role: 'toggledevtools'}
		    ]
  	  },
        {
          role: 'help',
          submenu: [
            {label: 'City of Zion', click () { shell.openExternal('https://cityofzion.io/') }},
            {label: 'GitHub', click () { shell.openExternal('https://github.com/CityOfZion') }},
            {label: 'NEO Reddit', click () { shell.openExternal('https://www.reddit.com/r/NEO/') }},
            {label: 'Slack', click () { shell.openExternal('https://neosmarteconomy.slack.com') }}
          ]
        }
      ]
	  const menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
    }

    if (process.env.START_HOT) {
      mainWindow.loadURL(`http://localhost:${port}/dist`)
    } else {
      mainWindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: path.join(__dirname, '/app/dist/index.html')
      }))
    }
    mainWindow.on('closed', function () {
      mainWindow = null
    })
  }
  if (process.env.NODE_ENV === 'development') {
    installExtensions().then(() => onAppReady())
  } else {
    onAppReady()
  }
})
