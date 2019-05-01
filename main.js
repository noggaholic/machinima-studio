"use strict";

const electron = require('electron');
const app = electron.app;

if (require('electron-squirrel-startup')) return app.quit();


const BrowserWindow = electron.BrowserWindow;

const launchWindows = require('./src/loading/windows.js');

const launchMain    = launchWindows.mainWindow;
const launchLoading = launchWindows.loadingWindow;
const openServer    = launchWindows.openServer;

/**
 * Keep a reference to the main window
 */
let mainWindow;

const ipcMain       = electron.ipcMain;

/**
 * Set up the IPC manager
 */
require('./ipc.js')(ipcMain, BrowserWindow);

ipcMain.on('open-machinima-studio', (event, arg) => {
  console.log('Launching windows...');
  launchMain(mainWindow, electron);
});

ipcMain.on('open-machinima-studio-server', (event, arg) => {
  openServer((err) => {
    if (err) {
      return event.sender.send('open-machinima-studio-server-error', err.message);
    }
    event.sender.send('open-machinima-studio-server');
  });
});

/**
 * Launch the app when electron
 * is ready to render and launch windows
 */
app.on('ready', function() {
  launchLoading(mainWindow, electron);
});

/**
 * Relaunch the app in case is needed
 */
app.on('activate', function () {
  if (mainWindow === null) {
    launchLoading(mainWindow, electron);
  }
});

app.on('window-all-closed', app.quit);
