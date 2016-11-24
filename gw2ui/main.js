/* eslint-disable no-unused-vars */
const electron = require('electron');
const size     = require('window-size');
const path     = require('path');

// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const ipcMain = electron.ipcMain
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
	var params = {
		frame: false,
		transparent: true,
		width: size.width - 10,
		x: 5,
		y: size.height - 297 - 40,
		height: 297,
		webPreferences: {
			nodeIntegration: true
		}
	};
	params.icon = path.join(__dirname, '/machinimastudio.ico')
	mainWindow = new BrowserWindow(params);
	mainWindow.loadURL(`file://${__dirname}/bottombar/index.html`)

	mainWindow.on('closed', function () {
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
		webPreferences: {
			nodeIntegration: true
		}
  };
	params.icon = path.join(__dirname, '/machinimastudio.ico')
  var rightWindow = new BrowserWindow(params);
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
    if (arg === '') { arg = null; }
    promptResponse = arg;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
})
