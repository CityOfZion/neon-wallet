const {app, shell, Menu, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let mainWindow = null

app.on('window-all-closed', () => {
  app.quit()
})

app.on('ready', () => {
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
          {label: 'GithHub', click () { shell.openExternal('https://github.com/CityOfZion') }},
          {label: 'NEO Reddit', click () { shell.openExternal('https://www.reddit.com/r/NEO/') }},
          {label: 'Slack', click () { shell.openExternal('https://neosmarteconomy.slack.com') }}
        ]
      }
    ]
	  const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }

  // load the local HTML file
  mainWindow.loadURL(url.format({
    protocol: 'file',
    slashes: true,
    pathname: path.join(__dirname, '/app/dist/index.html')
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
