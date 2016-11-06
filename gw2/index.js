'use strict';

const gw2          = require(__dirname + '/src/initialize.js');
const Camera       = require(__dirname + '/src/camera.js');
const Spectate     = require(__dirname + '/src/spectate.js');
const Player       = require(__dirname + '/src/player.js');
const Environment  = require(__dirname + '/src/environment.js');
const BinOffsets   = require(__dirname + '/src/binOffsets.json');
const md5File      = require('md5-file');
const async        = require('async');
const io           = require('socket.io')(8080);

var robot   = require ("robot-js");
var Memory  = robot.Memory;

/**
 * Start by trying to find the correct GW2 process
 * Terminates with an error if no process is found
 */
gw2(function(err, process, module, memory, window) {
  if (err) {
    throw new Error(err);
  }

  const sendMessage = (message, data) => {
    console.log(message);
    socket.emit(message, data);
  };

  let socket;
  const player      = Player(process, module, memory);
  const spectate    = Spectate(process, module, memory);
  const camera      = Camera(process, module, memory, window, player, sendMessage);
  const environment = Environment(process, module, memory);

	player.setCameraReference(camera);
	camera.setEnvReference(environment);
	environment.enableEnvPointer();

  io.on('connection', function (so) {
    socket = so;
    console.log('Window connected :)');

    socket.on('RENDERING', function (data) {
      environment.changeRendering(data.section);
    });

    socket.on('CAMERA_ENABLE_CONTROLS', function () {
      spectate.enableSpectateMode();
      player.disablePlayerMovement();
      camera.enableCameraControls();
    });

    socket.on('CAMERA_SET_POS', function (data) {
      camera.setPos(data.x, data.y, data.z);
      camera.lookAt(data.lookAtx, data.lookAty, data.lookAtz);
			if (data.timeOfDay > 0 && data.timeOfDay < 1) {
				environment.setTimeOfDay(data.timeOfDay);
			}
    });

    socket.on('CAMERA_DISABLE_CONTROLS', function () {
      spectate.disableSpectateMode();
      player.enablePlayerMovement();
      camera.disableCameraControls();
    });

    socket.on('CAMERA_TWEEN_TO', function (data) {
      spectate.enableSpectateMode();
      player.disablePlayerMovement();
      let tweenTo = (item, next) => {
        let curFwd    = camera.getFwdPosition();
        let cameraPos = camera.getPosition();
        let from  = { x: cameraPos.x, y: cameraPos.y, z: cameraPos.z, lookx: curFwd.x, looky: curFwd.y, lookz: curFwd.z };
        let to    = { x: item[0], y: item[1], z: item[2], lookx: item[3], looky: item[4], lookz: item[5] };
        camera.moveToWithTween(from, to, 'linear', next);
      };
      async.eachSeries(data, tweenTo, () => {
        socket.emit('CAMERA_TWEEN_DONE');
      });
    });

		socket.on('ENV_SET_FOG_COLOR', function(color) {
			environment.setFogColor(color.r, color.g, color.b);
		});

		socket.on('ENV_SET_FOG_DENSITY', function(density) {
			environment.setFogDensity(density);
		});

		socket.on('ENV_ENABLE_TIME_OF_DAY', function(color) {
			environment.enableEnvPointer();
		});

		socket.on('ENV_DISABLE_TIME_OF_DAY', function(color) {
			environment.disableEnvPointer();
		});

		socket.on('ENV_SET_TIME_OF_DAY', function(value) {
			environment.setTimeOfDay(value);
		});

    socket.on('disconnect', function () {
      console.log('user disconnected');
    });

  });

});
