const fs = require('fs');

const gw2 = require(`${__dirname}/src/initialize.js`);
const offsets = require(`${__dirname}/src/offsets.js`);

const result = {};

/**
 * Start by trying to find the correct GW2 process
 * Terminates with an error if no process is found
 */
gw2((err, process, module, memory) => {
  if (err) throw new Error(err);

  const lpad = (str, padString, length) => {
    while (str.length < length) {
      str = padString + str;
    }
    return str;
  };

  const interpretAsPTRBuffer = Buffer.alloc(0x4);
  const pointerFound = (descriptor, ptr, substract, add, interpretAsPTR, offsetAdjustement) => {
    if (ptr) {
      let base = ptr[0] - module;
      if (substract) base -= substract;
      if (add) base += add;
      if (interpretAsPTR) {
        memory.readData(module + base, interpretAsPTRBuffer, 0x4);
        base = interpretAsPTRBuffer.readInt32LE() - module;
      }
      if (offsetAdjustement) {
        base += offsetAdjustement;
      }
      const baseAsHex = (base).toString(16).toUpperCase();
      const address = `0x${lpad(baseAsHex, '0', 8)}`;
      console.log(descriptor, address);
      /**
       * Create a reference for the memory path
       * and save the value of the address
       * @type {Object}
       */
      const s = descriptor.split('.');
      let obj = result;
      let p;
      while (s.length) {
        p = s.shift();

        if (s.length === 0) {
          obj[p] = address;
        } else {
          obj = obj[p] || (obj[p] = {});
        }
      }
    } else {
      console.log(descriptor, 'ptr base not found');
    }
  };

  const findPattern = (pattern) => {
    return memory.find(pattern, 0, -1, 1, '-x');
  };

  const findStringRef = (str) => {
    const searchPattern = Buffer.from(str).toString('hex');
    let results = memory.find(searchPattern, 0, -1, 1, '--');

    if (results.length > 0) {
      results = memory.find(results[0].toString(16).lpad('0', 8).match(/[a-fA-F0-9]{2}/g)
        .reverse()
        .join(''), 0, -1, 1, '-x');
    }

    return results;
  };

  let pattern;

	/**
  * Debug related pointers
  * @type {String}
  */
  pattern = offsets.debug.original.toString('hex');
  pointerFound('offsets.debug.original', findPattern(pattern), 0, 22, true, module - 1104);

  /**
  * Camera related pointers
  * @type {String}
  */

  pattern = offsets.camera.original.toString('hex');
  pointerFound('offsets.camera.offset', findPattern(pattern), 0, 0x20, true);

  pattern = offsets.camera.instructions.patch_1.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_1.original', findPattern(pattern));
  pattern = offsets.camera.instructions.patch_2.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_2.original', findPattern(pattern));
  pattern = offsets.camera.instructions.patch_3.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_3.original', findPattern(pattern));
  pattern = offsets.camera.instructions.patch_4.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_4.original', findPattern(pattern));
  pattern = offsets.camera.instructions.patch_5.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_5.original', findPattern(pattern));
  pattern = offsets.camera.instructions.patch_6.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_6.original', findPattern(pattern));
  pattern = offsets.camera.instructions.patch_7.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_7.original', findPattern(pattern));

  /**
  * Player related offsets
  * @type {String}
  */
  pattern = offsets.player.original.toString('hex');
  pointerFound('offsets.player.original', findPattern(pattern));

  /**
  * Environment related offsets
  * @type {String}
  */
  pointerFound('offsets.environment.fog.original', findStringRef('s_dxContext'), 0, 10, true);

  /**
  * Movement related offsets
  * @type {String}
  */
  pattern = offsets.player.movement.original.toString('hex');
  pointerFound('offsets.player.movement.original', findPattern(pattern), 10);

  /**
  * Time of day related offsets
  * @type {String}
  */
  pattern = offsets.environment.timeOfDayOriginal.toString('hex');
  pointerFound('offsets.environment.enableTimeOfDay', findPattern(pattern), 5);

  /**
  * Map rendering functions offsets
  * @type {String}
  */
  pattern = offsets.environment.rendering.audio.original.toString('hex');
  pointerFound('offsets.environment.rendering.audio', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.blocks.original.toString('hex');
  pointerFound('offsets.environment.rendering.blocks', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.decal.original.toString('hex');
  pointerFound('offsets.environment.rendering.decal', findPattern(pattern), 0x2A);
  pattern = offsets.environment.rendering.environment.original.toString('hex');
  pointerFound('offsets.environment.rendering.environment', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.river.original.toString('hex');
  pointerFound('offsets.environment.rendering.river', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.under_water.original.toString('hex');
  pointerFound('offsets.environment.rendering.under_water', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.zone.original.toString('hex');
  pointerFound('offsets.environment.rendering.zone', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.lights.original.toString('hex');
  pointerFound('offsets.environment.rendering.lights', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.shadows.original.toString('hex');
  pointerFound('offsets.environment.rendering.shadows', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.terrain.original.toString('hex');
  pointerFound('offsets.environment.rendering.terrain', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.cube_map.original.toString('hex');
  pointerFound('offsets.environment.rendering.cube_map', findPattern(pattern), 5);
  pattern = offsets.environment.rendering.props.original.toString('hex');
  pointerFound('offsets.environment.rendering.props', findPattern(pattern), 5);

  /**
  * Animation related pointers
  * @type {String}
  */
  pattern = offsets.environment.rendering.animation.original.toString('hex');
  pointerFound('offsets.environment.rendering.animation', findPattern(pattern), 5, 5);

  /**
  * Agent related pointers
  * @type {String}
  */
  pattern = offsets.environment.rendering.highlight_effect.toString('hex');
  pointerFound('offsets.environment.rendering.highlight_effect', findPattern(pattern));

  /**
  * ViewAdvanceModel to throttle the frame rate.
  * @type {String}
  */
  pattern = offsets.ViewAdvanceModel.original.toString('hex');
  pointerFound('offsets.ViewAdvanceModel', findPattern(pattern), 0, 0x1B);

  fs.writeFileSync(`${__dirname}/src/ptrs.json`, JSON.stringify(result.offsets, null, 4));
  console.log(`Pointers have been updated: ${__dirname}/src/ptrs.js`);
});
