/* eslint-disable no-use-before-define */

const async = require('async');
const path = require('path');
const { ipcRenderer, remote } = require('electron');

window.ipcRenderer = ipcRenderer;
window.remote = remote;

const status = document.getElementById('status');

const update = (callback) => {
  const updaterPath = path.join(__dirname, '..', '..', 'src', 'gw2', 'updater.js');
  require(updaterPath);
  callback();
};

const launchWSS = (callback) => {
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
};

async.waterfall([
  callback => setTimeout(() => update(callback), 500),
  callback => launchWSS(callback),
], (err) => {
  removeLoadingSticks();
  if (err) {
    if (!err.message) {
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
    Create a new issue if the problem persist -> https://github.com/noggaholic/machinima-studio`;
    return;
  }

  status.innerHTML = '<div class="enjoy-css" onclick="javascript:ipcRenderer.send(\'open-machinima-studio\', 1);window.close();">Get started now!</div>';
});


function removeLoadingSticks() {
  const animationSticks = document.getElementsByClassName('stick');
  while (animationSticks[0]) {
    animationSticks[0].parentNode.removeChild(animationSticks[0]);
  }

  status.classList.remove('fade');
}
