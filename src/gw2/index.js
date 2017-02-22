'use strict';

const gw2          = require(__dirname + '/src/initialize.js');
const Camera       = require(__dirname + '/src/camera.js');
const Spectate     = require(__dirname + '/src/spectate.js');
const Player       = require(__dirname + '/src/player.js');
const Environment  = require(__dirname + '/src/environment.js');
const async        = require('async');
const io           = require('socket.io')(8080);

/**
 * Start by trying to find the correct GW2 process
 * Terminates with an error if no process is found
 */

 console.log('Welcome to machinima studio! now open the ui :)');

gw2(function(err, process, module, memory, window) {
  if (err) {
    throw new Error(err);
  }

  const sendMessage = (message, data) => {
    io.sockets.emit(message, data);
  };

  let socket;
  const player      = Player(process, module, memory);
  const spectate    = Spectate(process, module, memory);
  const camera      = Camera(process, module, memory, window, player, sendMessage);
  const environment = Environment(process, module, memory);

  player.setCameraReference(camera);
  camera.setEnvReference(environment);
  environment.enableEnvPointer();

	let curFwd;
	let cameraPos;
	let roll;
	let velocity;
    let fog;
	let uiInterval;
  io.on('connection', function (so) {
    socket = so;

		if (!uiInterval) {
			uiInterval = setInterval(() => {
				curFwd    = camera.getFwdPosition();
				cameraPos = camera.getPosition();
				roll 			= camera.getRoll();
				velocity 	= camera.getSpeed();
                fog = environment.getFogData();
				let data  	= {
					x: cameraPos.x,
					y: cameraPos.y,
					z: cameraPos.z,
					lookAtx: curFwd.x,
					lookAty: curFwd.y,
					lookAtz: curFwd.z,
					roll: roll,
					speed: velocity.speed,
					rotSpeed: velocity.rotSpeed,
					up_down_speed: velocity.up_down_speed,
                    fog_red: fog.r,
                    fog_green: fog.g,
                    fog_blue: fog.b,
                    fog_density: fog.density,
                    time_of_day: environment.getTimeOfDay()
				};
				io.sockets.emit('UPDATE_UI', data);
			}, 900);
			setInterval(() => {
				io.sockets.emit('UPDATE_DEBUG_INFO', player.getDebugInfo());
			}, 10000);
		}

		io.sockets.emit('UPDATE_DEBUG_INFO', player.getDebugInfo());

		socket.on('error', function (err) {
		   console.log("Socket.IO Error");
		   console.log(err);
		});
    console.log('Window connected :)');

    socket.on('RENDERING', function (data) {
      environment.changeRendering(data.section);
    });

		socket.on('CAMERA_SET_SPEED', function (data) {
			camera.setSpeed(data, null);
		});

		socket.on('CAMERA_SET_ROT_SPEED', function (data) {
			camera.setSpeed(null, data);
		});

		socket.on('CAMERA_SET_UP_DOWN_SPEED', function (data) {
			camera.setSpeed(null, null, data);
		});

    socket.on('CAMERA_ENABLE_CONTROLS', function () {
      spectate.enableSpectateMode();
      player.disablePlayerMovement();
      camera.enableCameraControls();
    });

    socket.on('CAMERA_SET_POS', function (data) {
      camera.setPos(data.x, data.y, data.z);
      camera.lookAt(data.lookAtx, data.lookAty, data.lookAtz);
      camera.setRoll(data.roll);
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
        let from  = {
          x: cameraPos.x,
          y: cameraPos.y,
          z: cameraPos.z,
          lookx: curFwd.x,
          looky: curFwd.y,
          lookz: curFwd.z
        };
        let to = {
          x: item[0],
          y: item[1],
          z: item[2],
          lookx: item[3],
          looky: item[4],
          lookz: item[5]
        };
        camera.moveToWithTween(from, to, 'linear', next);
      };
      async.eachSeries(data, tweenTo, () => {
        io.sockets.emit('CAMERA_TWEEN_DONE');
      });
    });

    socket.on('ENV_SET_FOG_COLOR', function(color) {
      environment.setFogColor(color.r, color.g, color.b);
    });

    socket.on('ENV_SET_FOG_DENSITY', function(density) {
      environment.setFogDensity(density);
    });

    socket.on('ENV_ENABLE_TIME_OF_DAY', function() {
      environment.enableEnvPointer();
    });

    socket.on('ENV_DISABLE_TIME_OF_DAY', function() {
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
