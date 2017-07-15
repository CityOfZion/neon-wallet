const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 526,
    width: 726,
    title: "NEO Wallet"
  });

  // load the local HTML file
  let url = require('url').format({
    protocol: 'file',
    slashes: true,
    pathname: require('path').join(__dirname, '/dist/index.html')
  });
  console.log(url);
  mainWindow.loadURL(url)
})
