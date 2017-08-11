"use strict";

const size = require('window-size');
const path = require('path');

const createWindow = (mainWindow, electron) => {

  const BrowserWindow = electron.BrowserWindow;

  const loadBottomn   = (mainWindow) => {
    let params = {
      parent: mainWindow,
      frame: false,
      transparent: true,
      width: size.width - 10,
      height: 297,
      x: 5,
      y: size.height - 297 - 40,
      icon: path.join(__dirname, '/machinimastudio.ico'),
      webPreferences: {
        nodeIntegration: true
      },
    };

    mainWindow = new BrowserWindow(params);
    mainWindow.loadURL(`file://${__dirname}/bottombar/index.html`);
  };

  /**
   * Use a quarter of the screen
   * @type Number
   */
  var halfOfHalfWidth = (size.width / 2) / 2;
  // var halfOfHalfHeight = (size.height / 2);

  let params = {
    frame: false,
    transparent: true,
    width: halfOfHalfWidth + 35,
    height: size.height - 330,
    x: size.width - (halfOfHalfWidth + 35),
    y: 0,
    icon: path.join(__dirname, '/machinimastudio.ico'),
    webPreferences: {
      nodeIntegration: true
    },
  };

  var rightWindow = new BrowserWindow(params);

  rightWindow.once('ready-to-show', () => {
    rightWindow.show();
  });

  rightWindow.on('closed', function () {
    mainWindow = null;
  });

  rightWindow.loadURL(`file://${__dirname}/../app/sidebar/index.html`);
  loadBottomn(rightWindow);
};

const openServer = (callback) => {
  var childProcess = require('child_process');
  var cmdPath      = path.join(__dirname,'../', 'gw2/index.js');

  var server = childProcess.spawn('node', [cmdPath]);

  process.on('exit', function () {
    server.kill();
  });

  callback();
};

const loadingWindow = (mainWindow, electron) => {
  const BrowserWindow = electron.BrowserWindow;
  let params = {
		frame: false,
		transparent: true,
    width: 1170,
    height: 600,
    center: true,
    resizable: true,
    minimizable: false,
    maximizable: false,
  //  skipTaskbar: true,
  //  alwaysOnTop: true,
    icon: path.join(__dirname, '/machinimastudio.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  };
  mainWindow = new BrowserWindow(params);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

  mainWindow.loadURL(`file://${__dirname}/loading/index.html`);
};

module.exports = {
  mainWindow: createWindow,
  loadingWindow: loadingWindow,
  openServer: openServer
};
