const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const electronUtilPath = path.join(__dirname,'src', 'electron')
const updateSubUrl = require(path.join(__dirname,'src', 'electron', 'updateSubUrl.js'))
const readSubList = require(path.join(electronUtilPath, 'readSubList.js'))

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 651,
    // minWidth: 810,
    // minHeight: 465,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // nodeIntegration: true,
      contextIsolation: true
    }
  })
  mainWindow.loadURL("http://192.168.31.95:3000/")
  // mainWindow.removeMenu()
}


app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})



ipcMain.handle('updateSub', async (event, arg) => {
  const data = JSON.parse(arg)
  if(data.name === 'subUrl') {
    // console.log(updateSubUrl, __dirname,'src', 'electron', 'updateSubUrl.js')
    try{
      await updateSubUrl(data.value)
      return 200
    } catch(err) {
      console.log('Error')
      return Error('Error')
    }
  }
})
ipcMain.handle('profile', async (event,arg) => {
  const data = JSON.parse(arg)
  if(data.name === 'profile') {
    return JSON.stringify(await readSubList())
  }
})