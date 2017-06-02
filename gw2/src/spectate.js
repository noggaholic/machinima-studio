var offsets = require('./offsets');
var ptrs    = require('./ptrs.json');

module.exports = (process, module, memory) => {
  let that = {};

  /* eslint-disable */
  let patch_1 = offsets.camera.instructions.patch_1;
  let patch_2 = offsets.camera.instructions.patch_2;
  let patch_3 = offsets.camera.instructions.patch_3;
  let patch_4 = offsets.camera.instructions.patch_4;
  let patch_5 = offsets.camera.instructions.patch_5;
  let patch_6 = offsets.camera.instructions.patch_6;
  let patch_7 = offsets.camera.instructions.patch_7;
  /* eslint-enable */
  that.enableSpectateMode = () => {
    memory.writeData(module + Number(ptrs.camera.instructions.patch_1.original), patch_1.bytecode, patch_1.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_2.original), patch_2.bytecode, patch_2.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_3.original), patch_3.bytecode, patch_3.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_4.original), patch_4.bytecode, patch_4.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_5.original), patch_5.bytecode, patch_5.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_6.original), patch_6.bytecode, patch_6.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_7.original), patch_7.bytecode, patch_7.original.byteLength);
   };

  that.disableSpectateMode = () => {
    memory.writeData(module + Number(ptrs.camera.instructions.patch_1.original), patch_1.original, patch_1.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_2.original), patch_2.original, patch_2.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_3.original), patch_3.original, patch_3.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_4.original), patch_4.original, patch_4.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_5.original), patch_5.original, patch_5.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_6.original), patch_6.original, patch_6.original.byteLength);
    memory.writeData(module + Number(ptrs.camera.instructions.patch_7.original), patch_7.original, patch_7.original.byteLength);
  };

  const requestAnimationFrame = function () {
    var fps = 60;
    var delay = 1000 / fps;
    var animationStartTime = Date.now();
    var previousCallTime = animationStartTime;

    return function (callback) {
      var requestTime = Date.now();
      var timeout = Math.max(0, delay - (requestTime - previousCallTime));
      var timeToCall = requestTime + timeout;

      previousCallTime = timeToCall;

      return setTimeout(function onAnimationFrame() {
          callback(timeToCall - animationStartTime);
      }, timeout);
    };
  }();

  const base = 0x00D2D50C;
  const frameNop  = new Buffer([0x90, 0x90]);
  const frameDone = new Buffer([0x85, 0xF6]);

  let bulletTimeRunning = false;
  let lastFrameTimeMs   = 0;
  let currFps           = 60;

  /**
   * Throttle the frame rate.
   */
  const mainLoop = (timestamp) => {
      if (!bulletTimeRunning) {
        return;
      }
      if (timestamp < lastFrameTimeMs + (1000 / currFps)) {
        memory.writeData(base, frameNop, frameNop.byteLength);
        requestAnimationFrame(mainLoop);
      } else {
        lastFrameTimeMs = timestamp;
        memory.writeData(base, frameDone, frameDone.byteLength);
        requestAnimationFrame(mainLoop);
      }
  };

  that.toogleFrameRate = (status) => {
    bulletTimeRunning = status;
  };

  that.setFrameRate = (frameRate) => {
    currFps = frameRate;
    if (!bulletTimeRunning) {
      requestAnimationFrame(mainLoop);
      bulletTimeRunning = true;
    }
  };

  return that;
};
