"use strict";

var async = require('async');
var fs    = require('fs');
var path  = require('path');
var cp    = require('child_process');
var {ipcRenderer, remote} = require('electron');

window.ipcRenderer = ipcRenderer;
window.remote = remote;

var status      = document.getElementById('status');
var workingPath = path.join(__dirname, '../', '../');

const update = (callback) => {
  status.innerHTML = 'Finding offsets...';
  var ls = cp.spawnSync('node', [path.join(workingPath, 'gw2' ,'updater.js')], { encoding : 'utf8' });
  console.log('Offsets: ', ls.stdout, ls.stderr, ls);
  if (ls.status !== 0) {
    return callback(new Error(ls.stderr));
  }
  callback();
};

async.waterfall([
    function(callback) {
        /**
         * Update offsets for the latest patch
         */
        setTimeout(() => {
          update(callback);
        }, 500);
    },
    function(callback) {
      status.innerHTML = 'Launching server...';
      ipcRenderer.on('open-machinima-studio-server-error', (event, error) => {
        callback(new Error(error));
      });

      ipcRenderer.on('open-machinima-studio-server', () => {
        console.log('open-machinima-studio-server');
        console.log('open-machinima-studio-server');
        console.log('open-machinima-studio-server');
        console.log('open-machinima-studio-server');
        console.log('open-machinima-studio-server');
        callback();
      });

      setTimeout(() => {
        ipcRenderer.send('open-machinima-studio-server', 1);
      }, 300);
    }
], function (err) {
    var paras = document.getElementsByClassName('stick');
    while (paras[0]) {
      paras[0].parentNode.removeChild(paras[0]);
    }

    status.classList.remove("fade");
    if (err) {
      window.errmsg = err.message;
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
