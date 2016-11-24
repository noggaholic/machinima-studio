/* eslint-disable no-console */
var offsets   = require('./offsets');
var robot     = require('robot-js');
var Tweenable = require('shifty');

Tweenable.prototype.formula.linear = function (pos) {
  return pos;
};

module.exports = (process, module, memory, window, player, sendMessage) => {
  var that = {};

  const Mouse    = robot.Mouse;
  const Keyboard = robot.Keyboard;

  const cameraReadPosition      = new Buffer(0xC);
  const cameraFwdReadPosition   = new Buffer(0xC);
  const cameraWritePosition     = new Buffer(0xC);
  const cameraFwdWritePosition  = new Buffer(0xC);

  const cameraRoll  			= new Buffer(0x4);
	const cameraRollReader  = new Buffer(0x4);
  const cameraYaw   = new Buffer(0x4);
  const cameraPitch = new Buffer(0x4);
  const verticalAlignment = new Buffer(0x4);

  let cameraOffsetBase  = memory.readMultiLevelPtr(offsets.camera.ptr);

  let cameraCurrPosition = {
    x: null,
    y: null,
    z: null
  };

  let cameraFwdCurrPosition = {
    x: null,
    y: null,
    z: null
  };

  let environment;

  /**
   * Refactor this to a non-blocking way
   * @param  {Number} sleepDuration how much time
   * @return {undefined}
   */
  var sleepFor = function(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) { /* do nothing */ }
  };

  that.setEnvReference = (env) => {
    environment = env;
  };

  that.moveTo = (x, y, z, fx, fy, fz, wait) => {
    var truthy = true;
    while (truthy) {
      var cameraPos = that.getPosition();
      var dx = x - cameraPos.x;
      var dy = y - cameraPos.y;
      var dz = z - cameraPos.z;

      var cameraFwdPos = that.getFwdPosition();
      var fwddx = fx - cameraFwdPos.x;
      var fwddy = fy - cameraFwdPos.y;
      var fwddz = fz - cameraFwdPos.z;
      var v = 0.009;

      var dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist <= v) {
        console.log('Reached the point!');
        if (wait) {
          sleepFor(2000);
        }
        break;
      } else {
        var camBase = cameraOffsetBase + offsets.camera.pos.x;
        var lookT = cameraOffsetBase + offsets.camera.playerPos.x;
        cameraWritePosition.writeFloatLE(cameraPos.x + (v * dx / dist), 0x0);
        cameraWritePosition.writeFloatLE(cameraPos.y + (v * dy / dist), 0x4);
        cameraWritePosition.writeFloatLE(cameraPos.z + (v * dz / dist), 0x8);
        cameraFwdWritePosition.writeFloatLE(cameraFwdPos.x + (v * fwddx / dist), 0x0);
        cameraFwdWritePosition.writeFloatLE(cameraFwdPos.y + (v * fwddy / dist), 0x4);
        cameraFwdWritePosition.writeFloatLE(cameraFwdPos.z + (v * fwddz / dist), 0x8);
        memory.writeData(camBase, cameraWritePosition, 0xC);
        memory.writeData(lookT, cameraFwdWritePosition, 0xC);
      }
    }
  };

  that.setPos = (x, y, z) => {
    cameraWritePosition.writeFloatLE(x, 0x0);
    cameraWritePosition.writeFloatLE(y, 0x4);
    cameraWritePosition.writeFloatLE(z, 0x8);
    memory.writeData(cameraOffsetBase + offsets.camera.pos.x, cameraWritePosition, 0xC);
  };

  that.lookAt = (x, y, z) => {
    cameraFwdWritePosition.writeFloatLE(x, 0x0);
    cameraFwdWritePosition.writeFloatLE(y, 0x4);
    cameraFwdWritePosition.writeFloatLE(z, 0x8);
    memory.writeData(cameraOffsetBase + offsets.camera.playerPos.x, cameraFwdWritePosition, 0xC);
  };

  that.moveToWithTween = (from, to, type, cb) => {
    var tweenable = new Tweenable();
    tweenable.tween({
      from: from,
      to: to,
      duration: 2000,
      easing: type,
      finish: function() { cb(); },
      step: function (state) {
        that.setPos(state.x, state.y, state.z);
        that.lookAt(state.lookx, state.looky, state.lookz);
      }
    });
  };

  that.moveUp = () => {
    var cameraPos = that.getPosition();
    cameraWritePosition.writeFloatLE(cameraPos.x, 0x0);
    cameraWritePosition.writeFloatLE(cameraPos.y, 0x4);
    cameraWritePosition.writeFloatLE(cameraPos.z + -0.03, 0x8);
    memory.writeData(cameraOffsetBase + offsets.camera.pos.x, cameraWritePosition, 0xC);
  };

  that.updateOffsetBase = () => {
    cameraOffsetBase = memory.readMultiLevelPtr(offsets.camera.ptr);
  };

  that.getPosition = () => {
    memory.readData(cameraOffsetBase + offsets.camera.pos.x, cameraReadPosition, 0xC);
    cameraCurrPosition.x = cameraReadPosition.readFloatLE(0);
    cameraCurrPosition.y = cameraReadPosition.readFloatLE(4);
    cameraCurrPosition.z = cameraReadPosition.readFloatLE(8);
    return cameraCurrPosition;
  };

  that.getFwdPosition = () => {
    memory.readData(cameraOffsetBase + offsets.camera.playerPos.x, cameraFwdReadPosition, 0xC);
    cameraFwdCurrPosition.x = cameraFwdReadPosition.readFloatLE(0);
    cameraFwdCurrPosition.y = cameraFwdReadPosition.readFloatLE(4);
    cameraFwdCurrPosition.z = cameraFwdReadPosition.readFloatLE(8);
    return cameraFwdCurrPosition;
  };
  /* eslint-disable */
  that.updateRotationVector = () => {
    const update = () => {
      let curFwd = that.getFwdPosition();
      cameraFwdWritePosition.writeFloatLE(curFwd.x - (- pitchDown + pitchUp ), 0x0);
      cameraFwdWritePosition.writeFloatLE(curFwd.y - (- yawRight  + yawLeft ), 0x4);
      cameraFwdWritePosition.writeFloatLE(curFwd.z - (- rollRight + rollLeft), 0x8);
      memory.writeData(cameraOffsetBase + offsets.camera.playerPos.x, cameraFwdWritePosition, 0xC);
    };

    const getContainerDimensions = () => {
      const boundingClientRect = window.getBounds();
      return {
        size: [boundingClientRect.w, boundingClientRect.h],
        offset: [boundingClientRect.x,  boundingClientRect.y]
      };
    };
    /* eslint-enable */
    // mouseMove
    const start = () => {
      setInterval(() => {
        const container    = getContainerDimensions();
        const mouse        = Mouse.getPos();
        const halfWidth    = container.size[0] / 2;
        const halfHeight   = container.size[1] / 2;
        /* eslint-disable no-unused-vars */
        let yawLeft   = - ((mouse.x - container.offset[0]) - halfWidth);
        /* eslint-disable no-unused-vars */
        let pitchDown =   ((mouse.y - container.offset[1]) - halfHeight);

        update();
      }, 0);
    };
    start();
  };

  let cameraControls;

  that.disableCameraControls = () => {
    clearInterval(cameraControls);
  };

  that.enableCameraControls = () => {
    /* eslint-disable no-unused-vars */
    const getContainerDimensions = () => {
      const boundingClientRect = window.getBounds();
      return {
        size: [boundingClientRect.w, boundingClientRect.h],
        offset: [boundingClientRect.x,  boundingClientRect.y]
      };
    };

    /**
     * Refactor this to support multiple keys
     * @type {Number}
     */
    var notyet = 0;
    function clearTimer() {
      notyet = 0;
    }

    const checkForKeyStroke = (key) => {
      if (Keyboard.getState(key)) {
        if (notyet === 1) {
          return;
        }
        notyet = 1;
        setTimeout(clearTimer, 300);
        return true;
      }
    };

    let rotSpeed = 0.02;
    let speed = 8;

    cameraRoll.writeFloatLE(0, 0x0);
    let newAngle;
    cameraControls = setInterval(() => {
			if (robot.Window.getActive().getTitle() !== offsets.WINDOW_NAME) {
				return; // only move the camera if we are inside GW2
			}
      let curFwd    = that.getFwdPosition();
      let cameraPos = that.getPosition();
			let roll 			= that.getRoll();
      if (checkForKeyStroke(robot.KEY_F3)) {
        let params = { pos: cameraPos, lookAt: curFwd, timeOfDay: environment.getTimeOfDay(), roll: roll };
        sendMessage('CAMERA_ADD_POSITION', params);
      }

      if (checkForKeyStroke(robot.KEY_F4)) {
        sendMessage('CAMERA_CLEAR_PATH');
      }

      if (checkForKeyStroke(robot.KEY_F5)) {
        sendMessage('CAMERA_PLAY');
      }

      if (checkForKeyStroke(robot.KEY_F6)) {
        sendMessage('CAMERA_STOP');
      }

      if (Keyboard.getState(robot.KEY_F)) {
        speed += 0.2;
        rotSpeed += 0.00008;
      }

      if (Keyboard.getState(robot.KEY_V)) {
        speed -= 0.2;
        rotSpeed -= 0.00008;
        if (speed < 0) speed = 1;
      }

      // get radius based on the previous point and r squared = a squared + b squared
      let r = Math.sqrt(Math.pow(curFwd.x - cameraPos.x, 2) + Math.pow(curFwd.y - cameraPos.y, 2));
      let angle = Math.atan2((curFwd.y - cameraPos.y), (curFwd.x - cameraPos.x));

      if (Keyboard.getState(robot.KEY_Q)) {
        cameraRoll.writeFloatLE(roll + 0.006, 0x0);
      }

      if (Keyboard.getState(robot.KEY_E)) {
        cameraRoll.writeFloatLE(roll - 0.006, 0x0);
      }

      if (Keyboard.getState(robot.KEY_R)) {
        cameraRoll.writeFloatLE(0, 0x0);
      }

      if (Keyboard.getState(robot.KEY_LEFT) || Keyboard.getState(robot.KEY_A)) {
        newAngle = angle + rotSpeed;
        curFwd.x = cameraPos.x + r * Math.cos(newAngle);
        curFwd.y = cameraPos.y + r * Math.sin(newAngle);
      }

      if (Keyboard.getState(robot.KEY_RIGHT) || Keyboard.getState(robot.KEY_D)) {
        newAngle = angle - rotSpeed;
        curFwd.x = cameraPos.x + r * Math.cos(newAngle);
        curFwd.y = cameraPos.y + r * Math.sin(newAngle);
      }

      if (Keyboard.getState(robot.KEY_CONTROL)) {
        curFwd.z += speed;
        cameraPos.z += speed;
      }

      if (Keyboard.getState(robot.KEY_SPACE)) {
        curFwd.z -= speed;
        cameraPos.z -= speed;
      }

      if (Keyboard.getState(robot.KEY_UP)) {
        curFwd.z = curFwd.z - 13000 * 0.0004;
      }

      if (Keyboard.getState(robot.KEY_DOWN)) {
        curFwd.z = curFwd.z + 13000 * 0.0004;
      }

      let dir = {};
      dir.x = cameraPos.x - curFwd.x;
      dir.y = cameraPos.y - curFwd.y;
      dir.z = cameraPos.z - curFwd.z;

      let hyp = Math.sqrt(dir.x * dir.x + dir.y * dir.y + dir.z * dir.z);
      dir.x /= hyp;
      dir.y /= hyp;
      dir.z /= hyp;

      if (Keyboard.getState(robot.KEY_W)) {
        curFwd.x -= dir.x * speed;
        curFwd.y -= dir.y * speed;
        curFwd.z -= dir.z * speed;
        cameraPos.x -= dir.x * speed;
        cameraPos.y -= dir.y * speed;
        cameraPos.z -= dir.z * speed;
      }

      if (Keyboard.getState(robot.KEY_S)) {
        curFwd.x += dir.x * speed;
        curFwd.y += dir.y * speed;
        curFwd.z += dir.z * speed;
        cameraPos.x += dir.x * speed;
        cameraPos.y += dir.y * speed;
        cameraPos.z += dir.z * speed;
      }


      // const container    = getContainerDimensions();
      // const mouse        = Mouse.getPos();
      //
      // halfWidth  = container.size[ 0 ] / 2;
      // halfHeight = container.size[ 1 ] / 2;
      // mousex = mouse.x;
      // mousey = mouse.y;
      //
      // lastx = mousex;
      // lasty = mousey;

      cameraWritePosition.writeFloatLE(cameraPos.x, 0x0);
      cameraWritePosition.writeFloatLE(cameraPos.y, 0x4);
      cameraWritePosition.writeFloatLE(cameraPos.z, 0x8);
      cameraFwdWritePosition.writeFloatLE(curFwd.x, 0x0);
      cameraFwdWritePosition.writeFloatLE(curFwd.y, 0x4);
      cameraFwdWritePosition.writeFloatLE(curFwd.z, 0x8);
      memory.writeData(cameraOffsetBase + offsets.camera.pos.x, cameraWritePosition, 0xC);
      memory.writeData(cameraOffsetBase + offsets.camera.playerPos.x, cameraFwdWritePosition, 0xC);
      memory.writeData(cameraOffsetBase + offsets.camera.ortientation.roll, cameraRoll, 0x4);
    }, 16);
  };

	that.setRoll = (value) => {
		cameraRoll.writeFloatLE(value, 0x0);
		memory.writeData(cameraOffsetBase + offsets.camera.ortientation.roll, cameraRoll, 0x4);
	};

	that.getRoll = () => {
		memory.readData(cameraOffsetBase + offsets.camera.ortientation.roll, cameraRollReader, 0x4);
    return cameraRollReader.readFloatLE(0);
  };

  that.getVerticalAlignment = () => {
    memory.readData(cameraOffsetBase + offsets.camera.upOrDown, verticalAlignment, 0x4);
    return verticalAlignment.readFloatLE(0);
  };

  that.getRotation = () => {
    memory.readData(cameraOffsetBase + offsets.camera.ortientation.yaw, cameraYaw, 0x4);
    memory.readData(cameraOffsetBase + offsets.camera.ortientation.pitch, cameraPitch, 0x4);
    var yaw = cameraYaw.readFloatLE(0);
    var pitch = cameraPitch.readFloatLE(0);
    return { yaw: yaw, pitch: pitch };
  };

  that.printDebugInfo = () => {
    setInterval(() => {
      var pos = that.getPosition();
      var posfwd = that.getFwdPosition();
      console.log('camera.moveTo( ' + pos.x + ', ' + pos.y + ', ' + pos.z + ', ' + posfwd.x + ', ' + posfwd.y + ', ' + posfwd.z + ');');
    }, 4000);
  };

  return that;
};
