const size = require('window-size');
const path = require('path');

const createWindow = (mainWindow, electron) => {

  const { BrowserWindow } = electron;

  const loadBottomn = (window) => {
    const params = {
      parent: window,
      frame: false,
      transparent: true,
      width: size.width - 10,
      height: 297,
      x: 5,
      y: size.height - 297 - 40,
      icon: path.join(__dirname, '/resources/machinimastudio.ico'),
      webPreferences: {
        nodeIntegration: true
      },
    };

    window = new BrowserWindow(params);
    const bottomBarPath = path.join(__dirname, '../bottombar/index.html');
    window.loadURL(bottomBarPath);
  };

  const halfOfHalfWidth = (size.width / 2) / 2;

  const params = {
    frame: false,
    transparent: true,
    width: halfOfHalfWidth + 35,
    height: size.height - 330,
    x: size.width - (halfOfHalfWidth + 35),
    y: 0,
    icon: path.join(__dirname, '/resources/machinimastudio.ico'),
    webPreferences: {
      nodeIntegration: true
    },
  };

  const rightWindow = new BrowserWindow(params);

  rightWindow.once('ready-to-show', () => {
    rightWindow.show();
  });

  rightWindow.on('closed', () => {
    mainWindow = null;
  });
  const sideBarPath = path.join(__dirname, '../sidebar/index.html')
  rightWindow.loadURL(sideBarPath);
  loadBottomn(rightWindow);
};

const openServer = (callback) => {
  require('../gw2/index.js');
  callback();
};

const loadingWindow = (mainWindow, electron) => {
  const { BrowserWindow } = electron;
  
  const params = {
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
    icon: path.join(__dirname, '/resources/machinimastudio.ico'),
    webPreferences: {
      nodeIntegration: true
    }
  };

  mainWindow = new BrowserWindow(params);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadFile('./src/loading/index.html');

  return mainWindow;
};

module.exports = {
  mainWindow: createWindow,
  loadingWindow,
  openServer
};
