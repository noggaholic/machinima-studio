/* eslint-disable no-console */
'use strict';

const gw2          = require(__dirname + '/src/initialize.js');
const offsets      = require(__dirname + '/src/offsets.js');

/**
 * Start by trying to find the correct GW2 process
 * Terminates with an error if no process is found
 */
gw2(function(err, process, module, memory) {
  if (err) {
    throw new Error(err);
  }

  /* eslint-disable no-extend-native */
  String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length) {
      str = padString + str;
    }
    return str;
  };
	var interpretAsPTRBuffer = new Buffer(0x4);
  const pointerFound = (descriptor, ptr, substract, add, interpretAsPTR) => {
    if (ptr) {
      var base = ptr[0] - module;
      if (substract) {
        base = base - substract;
      }
      if (add) {
        base = base + add;
      }
			if (interpretAsPTR) {
				memory.readData(module + base, interpretAsPTRBuffer, 0x4);
				base = interpretAsPTRBuffer.readInt32LE() - module;
			}
      console.log(descriptor, '0x' + (base).toString(16).toUpperCase().lpad('0', 8));
    } else {
      console.log(descriptor, 'ptr base not found');
    }
  };

  let pattern;

  /**
  * Camera related pointers
  * @type {String}
  */

	pattern = offsets.advancedView.animation.original.toString('hex');
  pointerFound('offsets.advancedView.animation.original', memory.find(pattern), 5);

  pattern = offsets.camera.original.toString('hex');
  pointerFound('offsets.camera.original', memory.find(pattern), null, 0x45, true);

  pattern = offsets.camera.instructions.patch_1.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_1.original', memory.find(pattern));
  pattern = offsets.camera.instructions.patch_2.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_2.original', memory.find(pattern));
  pattern = offsets.camera.instructions.patch_3.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_3.original', memory.find(pattern));
  pattern = offsets.camera.instructions.patch_4.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_4.original', memory.find(pattern));
  pattern = offsets.camera.instructions.patch_5.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_5.original', memory.find(pattern));
  pattern = offsets.camera.instructions.patch_6.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_6.original', memory.find(pattern));
  pattern = offsets.camera.instructions.patch_7.original.toString('hex');
  pointerFound('offsets.camera.instructions.patch_7.original', memory.find(pattern));

  /**
  * Player related offsets
  * @type {String}
  */
  pattern = offsets.player.original.toString('hex');
  pointerFound('offsets.player.original', memory.find(pattern));

  /**
  * Environment related offsets
  * @type {String}
  */
  pattern = offsets.environment.fog.original.toString('hex');
  pointerFound('offsets.environment.fog.original', memory.find(pattern), 6);

  /**
  * Movement related offsets
  * @type {String}
  */
  pattern = offsets.player.movement.original.toString('hex');
  pointerFound('offsets.player.movement.original', memory.find(pattern), 10);

  /**
  * Time of day related offsets
  * @type {String}
  */
  pattern = offsets.environment.timeOfDayOriginal.toString('hex');
  pointerFound('offsets.environment.timeOfDayOriginal', memory.find(pattern), 5);

  /**
  * Map rendering functions offsets
  * @type {String}
  */
  pattern = offsets.environment.rendering.audio.original.toString('hex');
  pointerFound('offsets.environment.rendering.audio', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.blocks.original.toString('hex');
  pointerFound('offsets.environment.rendering.blocks', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.decal.original.toString('hex');
  pointerFound('offsets.environment.rendering.decal', memory.find(pattern), 0x2A);
  pattern = offsets.environment.rendering.environment.original.toString('hex');
  pointerFound('offsets.environment.rendering.environment', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.river.original.toString('hex');
  pointerFound('offsets.environment.rendering.river', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.under_water.original.toString('hex');
  pointerFound('offsets.environment.rendering.under_water', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.zone.original.toString('hex');
  pointerFound('offsets.environment.rendering.zone', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.lights.original.toString('hex');
  pointerFound('offsets.environment.rendering.lights', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.shadows.original.toString('hex');
  pointerFound('offsets.environment.rendering.shadows', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.terrain.original.toString('hex');
  pointerFound('offsets.environment.rendering.terrain', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.cube_map.original.toString('hex');
  pointerFound('offsets.environment.rendering.cube_map', memory.find(pattern), 5);
  pattern = offsets.environment.rendering.props.original.toString('hex');
  pointerFound('offsets.environment.rendering.props', memory.find(pattern), 5);
});
