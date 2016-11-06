var offsets = require ("./offsets");
var robot   = require ("robot-js");
var bswap 	= require("bswap");
/**
 * Para desactivar el renderizado de props, buscar MapPropBroadPhase
 */

module.exports = (process, module, memory, camera) => {
  var that = {};


  var Mouse     		= robot.Mouse;
  var Keyboard  		= robot.Keyboard;
	let fogColorBase 	= memory.readMultiLevelPtr(offsets.environment.fog.ptr);
	var fogColor 			= new Buffer(0xC);
	var fogDensity 		= new Buffer(0x4);
	var timeOfDay 		= new Buffer(0x4);
	var timeOfDayRead	= new Buffer(0x4);

	let cameraOffsetBase  = memory.readMultiLevelPtr(offsets.camera.ptr);

	that.enableEnvPointer = () => {
		var cameraNumber 	= (cameraOffsetBase + offsets.camera.envPointerFix);
		var envfix 				= new Buffer([0x89, 0x35, 0xFC, 0x1E, 0x7B, 0x2F, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90]);
		envfix.writeInt32LE(cameraNumber, 0x2);
		memory.writeData(module + offsets.environment.enableTimeOfDay, envfix, envfix.byteLength);
	}

	that.disableEnvPointer = () => {
		// This is the original array of bytes
		var envfix = new Buffer([0x0F, 0x2F, 0xC1, 0x72, 0x0D, 0xF3, 0x0F, 0x11, 0x8E, 0xCC, 0x19, 0x00, 0x00]);
		memory.writeData(module + offsets.environment.enableTimeOfDay, envfix, envfix.byteLength);
	}

	that.setTimeOfDay = (value) => {
		var cameraEnvPTR 	= (cameraOffsetBase + offsets.camera.envPointerFix);
		cameraEnvPTR = memory.readInt32(cameraEnvPTR);
		timeOfDay.writeFloatLE(value, 0x0);
		memory.writeData(cameraEnvPTR + 0x000019CC, timeOfDay, 0x4);
	}

	that.getTimeOfDay = (value) => {
		var cameraEnvPTR 	= (cameraOffsetBase + offsets.camera.envPointerFix);
		cameraEnvPTR = memory.readInt32(cameraEnvPTR);
		memory.readData(cameraEnvPTR + 0x000019CC, timeOfDayRead, 0x4);
		return timeOfDayRead.readFloatLE(0);
	}

	that.setFogDensity = (density) => {
		fogDensity.writeFloatLE(density, 0x0);
		memory.writeData(fogColorBase + offsets.environment.fog.density, fogDensity, 0x4);
	}

	that.setFogColor = (r, g, b) => {
		fogColor.writeFloatLE((r / 255), 0x0);
		fogColor.writeFloatLE((g / 255), 0x4);
		fogColor.writeFloatLE((b / 255), 0x8);
		memory.writeData(fogColorBase + offsets.environment.fog.colors, fogColor, 0xC);

	}

	var patterns = {
		audio: { active: false, original: null },
		blocks: { active: false, original: null },
		decal: { active: false, original: null },
		environment: { active: false, original: null },
		river: { active: false, original: null },
		under_water: { active: false, original: null },
		zone: { active: false, original: null },
		lights: { active: false, original: null },
		shadows: { active: false, original: null },
		terrain: { active: false, original: null },
		cube_map: { active: false, original: null },
		props: { active: false, original: null }
	};

	var savePattern = function(reference, section) {
		if (!reference.original) {
			var bufferLength = offsets.environment.rendering[section].byteLength;
			var buffer = new Buffer(bufferLength);
			memory.readData(module + offsets.environment.rendering[section].offset, buffer, bufferLength);
			reference.original = buffer;
		}
	};

	var fillWithNopes = function(reference, section) {
		reference.active = true;
		var bufferLength = offsets.environment.rendering[section].byteLength;
		var nops = Buffer.alloc(bufferLength, 0x90);
		memory.writeData(module + offsets.environment.rendering[section].offset, nops, bufferLength);
	};

	var restoreCode = function(reference, section) {
		reference.active = false;
		var bufferLength = offsets.environment.rendering[section].byteLength;
		var byteCode = reference.original;
		memory.writeData(module + offsets.environment.rendering[section].offset, byteCode, bufferLength);
	};

	var toggleMapSection = function(ref, section) {
		if (!ref.active) {
			fillWithNopes(ref, section);
		} else {
			restoreCode(ref, section);
		}
	};

	that.changeRendering = (section) => {
		var ref = null;
		switch (section) {
			case 'AUDIO':
				ref = patterns.audio;
				savePattern(ref, 'audio');
				toggleMapSection(ref, 'audio');
				break;
			case 'BLOCKS':
				ref = patterns.blocks;
				savePattern(ref, 'blocks');
				toggleMapSection(ref, 'blocks');
				break;
			case 'DECAL':
				ref = patterns.decal;
				savePattern(ref, 'decal');
				toggleMapSection(ref, 'decal');
				break;
			case 'ENVIRONMENT':
				ref = patterns.environment;
				savePattern(ref, 'environment');
				toggleMapSection(ref, 'environment');
				break;
			case 'RIVER':
				ref = patterns.river;
				savePattern(ref, 'river');
				toggleMapSection(ref, 'river');
				break;
			case 'UNDER_WATER':
				ref = patterns.under_water;
				savePattern(ref, 'under_water');
				toggleMapSection(ref, 'under_water');
				break;
			case 'ZONE':
				ref = patterns.zone;
				savePattern(ref, 'zone');
				toggleMapSection(ref, 'zone');
				break;
			case 'LIGHTS':
				ref = patterns.lights;
				savePattern(ref, 'lights');
				toggleMapSection(ref, 'lights');
				break;
			case 'SHADOWS':
				ref = patterns.shadows;
				savePattern(ref, 'shadows');
				toggleMapSection(ref, 'shadows');
				break;
			case 'TERRAIN':
				ref = patterns.terrain;
				savePattern(ref, 'terrain');
				toggleMapSection(ref, 'terrain');
				break;
			case 'CUBE_MAP':
				ref = patterns.cube_map;
				savePattern(ref, 'cube_map');
				toggleMapSection(ref, 'cube_map');
				break;
			case 'PROPS':
				ref = patterns.props;
				savePattern(ref, 'props');
				toggleMapSection(ref, 'props');
				break;
		}
	}

  return that;
};
