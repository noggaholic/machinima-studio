"use strict";

const electron = require('electron');
const launchWindows = require('./windows.js');

const launchMain = launchWindows.mainWindow;
const launchLoading = launchWindows.loadingWindow;

const app = electron.app;
/**
 * Keep a reference to the main window
 */
let mainWindow;

const ipcMain       = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;

/**
 * Set up the IPC manager
 */
require('./ipc.js')(ipcMain, BrowserWindow);

ipcMain.on('open-machinima-studio', (event, arg) => {
  launchMain(mainWindow, electron);
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
