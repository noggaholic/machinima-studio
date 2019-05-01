"use strict";

var async = require('async');
var path  = require('path');
var {ipcRenderer, remote} = require('electron');

window.ipcRenderer = ipcRenderer;
window.remote = remote;

var status      = document.getElementById('status');

const update = (callback) => {
  const updaterPath = path.join(__dirname, '..', '..', 'src', 'gw2' ,'updater.js');
  require(updaterPath);
  callback();
};

async.waterfall([
    callback => setTimeout(() => update(callback) , 500) ,
    function(callback) {
      console.log('Launching server...');
      status.innerHTML = 'Launching server...';
      ipcRenderer.on('open-machinima-studio-server-error', (event, error) => {
        callback(new Error(error));
      });

      ipcRenderer.on('open-machinima-studio-server', () => {
        callback();
      });

      setTimeout(() => {
        ipcRenderer.send('open-machinima-studio-server', 1);
      }, 300);
    }
], function (err, result) {
    var paras = document.getElementsByClassName('stick');
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }

    status.classList.remove("fade");
    if (err) {
      if (!err.message) {
        console.log('#### Error', err);
        status.innerHTML = `Unknown error ${err}`;
        return;
      }
      if (err.message.indexOf('Cannot find "Guild Wars 2" window') !== -1) {
        status.innerHTML = 'Make sure Guild Wars 2 is running before opening Machinima Studio.';
        status.innerHTML += '<br/>Closing this window in 5 seconds...';
        setTimeout(window.close, 5000);
        return;
      }

      status.innerHTML = `Cannot launch Machinima Studio
      <span class='error'>${err.message}</span>
      Create a new issue if the problem persist -> https://github.com/karliky/machinima-studio/issues`;
      return;
    }

    status.innerHTML = '<div class="enjoy-css" onclick="javascript:ipcRenderer.send(\'open-machinima-studio\', 1);window.close();">Get started now!</div>';
});
