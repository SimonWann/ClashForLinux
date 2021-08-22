const { app, BrowserWindow, ipcMain } = require('electron')
const { exec, spawn } = require("child_process")
const path = require('path')
const serve = require(path.join(__dirname, '/electron-server/main.js'))
const electronUtilPath = path.join(__dirname,'src', 'electron')
const updateSubUrl = require(path.join(__dirname,'src', 'electron', 'updateSubUrl.js'))
const readSubList = require(path.join(electronUtilPath, 'readSubList.js'))

const clashPath = path.join(__dirname, '/clash/clash')
const clashRunArg = '-d'
const clashRunConfigPath = path.join(__dirname, '/clash')
const clashInstance = spawn(`${clashPath}`, [clashRunArg, clashRunConfigPath])

const electronServe = serve.run()

const p = new Promise((res, rej) => {
  clashInstance.stdout.on('data', (data) => {
    console.log(data.toString())
    res(data)
  })
})
p.then((res) => {
  console.log('go runing success')
  function createWindow () {
    const mainWindow = new BrowserWindow({
      width: 700,
      height: 651,
      // minWidth: 8false10,
      // minHeight: 465,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        // nodeIntegration: true,
        contextIsolation: true
      }
    })
    mainWindow.loadURL(`http://192.168.31.95:${electronServe.port}/index.html`)
    mainWindow.removeMenu()
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
    // update subscripe info
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
  ipcMain.handle('restart', async (event, arg) => {
    app.relaunch()
  })
  ipcMain.handle('updateProfile', async (event, arg) => {
    console.log('UpdateProfile')
    let [api] = await readSubList()
    console.log(api)
    await updateSubUrl(api)
    app.exit()
    app.relaunch()
  })
})
.catch((err) => {
  console.log(err)
})

