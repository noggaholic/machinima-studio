const electron = require('electron');
const size     = require('window-size');

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.

  var params = {
    frame: false,
    transparent: true,
    width: size.width - 10,
    x: 5,
    y: size.height - 297 - 40,
    height: 297,
    transparent: true,
		webPreferences: {
	    nodeIntegration: false
		}
  };

  mainWindow = new BrowserWindow(params);
  // and load the index.html of the app.
  // mainWindow.loadURL(`file://${__dirname}/editor/test.html`)
  mainWindow.loadURL(`file://${__dirname}/bottombar/index.html`)
  //mainWindow.loadURL(`file://${__dirname}/tests/bezier.html`)
  //mainWindow.webContents.openDevTools()
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

	var halfOfHalfWidth = (size.width / 2) / 2;
	var halfOfHalfHeight = (size.height / 2);

	var params = {
    frame: false,
    transparent: true,
    width: halfOfHalfWidth + 20,
    x: size.width - (halfOfHalfWidth + 20),
    y: 0,
    height: size.height - 330,
    transparent: true
  };
	rightWindow = new BrowserWindow(params);
	rightWindow.loadURL(`file://${__dirname}/sidebar/index.html`)
  /**
   * Taken from https://github.com/konsumer/electron-prompt/blob/master/main.js
   */
  var promptResponse
  ipcMain.on('prompt', function(eventRet, arg) {
    promptResponse = null
    var promptWindow = new BrowserWindow({
      width: 200,
      height: 100,
      show: false,
      resizable: false,
      movable: false,
      alwaysOnTop: true,
      frame: false
    })
    arg.val = arg.val || ''
    const promptHtml = '<label for="val">' + arg.title + '</label>\
    <input id="val" value="' + arg.val + '" autofocus />\
    <button onclick="require(\'electron\').ipcRenderer.send(\'prompt-response\', document.getElementById(\'val\').value);window.close()">Ok</button>\
    <button onclick="window.close()">Cancel</button>\
    <style>body {font-family: sans-serif;} button {float:right; margin-left: 10px;} label,input {margin-bottom: 10px; width: 100%; display:block;}</style>'
    promptWindow.loadURL('data:text/html,' + promptHtml)
    promptWindow.show()
    promptWindow.on('closed', function() {
      eventRet.returnValue = promptResponse
      promptWindow = null
    })
  })
  ipcMain.on('prompt-response', function(event, arg) {
    if (arg === ''){ arg = null }
    promptResponse = arg
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
