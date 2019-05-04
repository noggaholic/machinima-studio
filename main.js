
const electron = require('electron');

const { app } = electron;

if (require('electron-squirrel-startup')) (() => app.quit())();


const { BrowserWindow } = electron;

const launchWindows = require('./src/loading/windows.js');

const launchMain = launchWindows.mainWindow;
const launchLoading = launchWindows.loadingWindow;
const { openServer } = launchWindows;

/**
 * Keep a reference to the main window
 */
let mainWindow;

const { ipcMain } = electron;

/**
 * Set up the IPC manager
 */
require('./ipc.js')(ipcMain, BrowserWindow);

ipcMain.on('open-machinima-studio', () => {
  launchMain(mainWindow, electron);
});

ipcMain.on('open-machinima-studio-server', (event) => {
  openServer((err) => {
    if (err) {
      return event.sender.send('open-machinima-studio-server-error', err.message);
    }
    return event.sender.send('open-machinima-studio-server');
  });
});

/**
 * Launch the app when electron
 * is ready to render and launch windows
 */
app.on('ready', () => {
  launchLoading(mainWindow, electron);
});

/**
 * Relaunch the app in case is needed
 */
app.on('activate', () => {
  if (mainWindow === null) {
    launchLoading(mainWindow, electron);
  }
});

app.on('window-all-closed', app.quit);
