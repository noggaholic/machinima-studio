var offsets = require('./offsets');
var ptrs    = require('./ptrs.json');
/**
 * Para desactivar el renderizado de props, buscar MapPropBroadPhase
 */

module.exports = (process, module, memory) => {
  var that = {};
  ptrs.environment.enableTimeOfDay = Number(ptrs.environment.enableTimeOfDay);
  offsets.environment.fog.offset[0] = Number(ptrs.environment.fog.original);
  let fogColorBase 	= memory.readMultiLevelPtr(offsets.environment.fog.offset);
  var fogColor 			= Buffer.alloc(0xC);
  var fogDensity 		= Buffer.alloc(0x4);
  var fogBlock 		  = Buffer.alloc(0x4);
  var timeOfDay 		= Buffer.alloc(0x4);
  var timeOfDayRead	= Buffer.alloc(0x4);

  offsets.camera.offset[0] = ptrs.camera.offset;
  let cameraOffsetBase  = memory.readMultiLevelPtr(offsets.camera.offset);

  let fogData= {
    r: null,
    g: null,
    b: null,
    density: null
  };

  that.enableEnvPointer = () => {
    var cameraNumber 	= (cameraOffsetBase + offsets.camera.envPointerFix);
    var envfix 				= Buffer.from([0x89, 0x35, 0xFC, 0x1E, 0x7B, 0x2F, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90, 0x90]);
    envfix.writeInt32LE(cameraNumber, 0x2);
    memory.writeData(module + ptrs.environment.enableTimeOfDay, envfix, envfix.byteLength);
  };

  that.disableEnvPointer = () => {
    // This is the original array of bytes
    var envfix = Buffer.from([0x0F, 0x2F, 0xC1, 0x72, 0x0D, 0xF3, 0x0F, 0x11, 0x8E, 0xCC, 0x19, 0x00, 0x00]);
    memory.writeData(module + ptrs.environment.enableTimeOfDay, envfix, envfix.byteLength);
  };

  that.setTimeOfDay = (value) => {
    var cameraEnvPTR 	= (cameraOffsetBase + offsets.camera.envPointerFix);
    cameraEnvPTR = memory.readInt32(cameraEnvPTR);
    timeOfDay.writeFloatLE(value, 0x0);
    memory.writeData(cameraEnvPTR + 0x000019CC, timeOfDay, 0x4);
  };

  that.getTimeOfDay = () => {
    var cameraEnvPTR 	= (cameraOffsetBase + offsets.camera.envPointerFix);
    cameraEnvPTR = memory.readInt32(cameraEnvPTR);
    memory.readData(cameraEnvPTR + 0x000019CC, timeOfDayRead, 0x4);
    return timeOfDayRead.readFloatLE(0);
  };

  that.setFogDensity = (density) => {
    fogDensity.writeFloatLE(density, 0x0);
    if (density < 0) {
      fogBlock.writeInt32LE(0, 0x0);
      memory.writeData(fogColorBase + offsets.environment.fog.minorBlock, fogBlock, 0x4);
    } else {
      fogBlock.writeInt32LE(1, 0x0);
      memory.writeData(fogColorBase + offsets.environment.fog.minorBlock, fogBlock, 0x4);
    }
    memory.writeData(fogColorBase + offsets.environment.fog.density, fogDensity, 0x4);
  };

  that.setFogColor = (r, g, b) => {
    fogColor.writeFloatLE((r / 255), 0x0);
    fogColor.writeFloatLE((g / 255), 0x4);
    fogColor.writeFloatLE((b / 255), 0x8);
    memory.writeData(fogColorBase + offsets.environment.fog.colors, fogColor, 0xC);
  };

  that.getFogData = () => {
    memory.readData(fogColorBase + offsets.environment.fog.colors, fogColor, 0xC);
    memory.readData(fogColorBase + offsets.environment.fog.density, fogDensity, 0x4);
    fogData.r = fogColor.readFloatLE(0)*255;
    fogData.g = fogColor.readFloatLE(4)*255;
    fogData.b = fogColor.readFloatLE(8)*255;
    fogData.density = fogDensity.readFloatLE(0);
    return fogData;
  };

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
    props: { active: false, original: null },
    animation: { active: false, original: null },
    highlight_effect: { active: false, original: null }
  };

  var savePattern = function(reference, section, base) {
    base = base || offsets.environment.rendering;
    if (!reference.original) {
      var bufferLength = 0;
      if (base[section].hasOwnProperty('byteLength')) {
        bufferLength = base[section].byteLength;
      } else if (base[section].hasOwnProperty('patch')) {
        bufferLength = base[section].patch.length;
      }
      var buffer = Buffer.alloc(bufferLength);
      memory.readData(module + Number(ptrs.environment.rendering[section]), buffer, bufferLength);
      reference.original = buffer;
    }
  };

  var patchCode = function(reference, section, base) {
    base = base || offsets.environment.rendering;
    reference.active = true;
    memory.writeData(module + Number(ptrs.environment.rendering[section]), base[section].patch, base[section].patch.length);
  };

  var fillWithNopes = function(reference, section, base) {
    base = base || offsets.environment.rendering;
    reference.active = true;
    var bufferLength = base[section].byteLength;
    var nops = Buffer.alloc(bufferLength, 0x90);
    memory.writeData(module + Number(ptrs.environment.rendering[section]), nops, bufferLength);
  };

  var restoreCode = function(reference, section, base) {
    base = base || offsets.environment.rendering;
    reference.active = false;
    var byteCode = reference.original;
    memory.writeData(module + Number(ptrs.environment.rendering[section]), byteCode, byteCode.length);
  };

  var toggleSection = function(ref, section, base) {
    base = base || offsets.environment.rendering;
    if (!ref.active) {
      if (!(base[section].hasOwnProperty('patch'))) {
        fillWithNopes(ref, section, base);
      } else {
        patchCode(ref, section, base);
      }
    } else {
      restoreCode(ref, section, base);
    }
  };

  that.changeRendering = (section) => {
    var ref = null;
    switch (section) {
      case 'AUDIO':
        ref = patterns.audio;
        savePattern(ref, 'audio');
        toggleSection(ref, 'audio');
        break;
      case 'BLOCKS':
        ref = patterns.blocks;
        savePattern(ref, 'blocks');
        toggleSection(ref, 'blocks');
        break;
      case 'DECAL':
        ref = patterns.decal;
        savePattern(ref, 'decal');
        toggleSection(ref, 'decal');
        break;
      case 'ENVIRONMENT':
        ref = patterns.environment;
        savePattern(ref, 'environment');
        toggleSection(ref, 'environment');
        break;
      case 'RIVER':
        ref = patterns.river;
        savePattern(ref, 'river');
        toggleSection(ref, 'river');
        break;
      case 'UNDER_WATER':
        ref = patterns.under_water;
        savePattern(ref, 'under_water');
        toggleSection(ref, 'under_water');
        break;
      case 'ZONE':
        ref = patterns.zone;
        savePattern(ref, 'zone');
        toggleSection(ref, 'zone');
        break;
      case 'LIGHTS':
        ref = patterns.lights;
        savePattern(ref, 'lights');
        toggleSection(ref, 'lights');
        break;
      case 'SHADOWS':
        ref = patterns.shadows;
        savePattern(ref, 'shadows');
        toggleSection(ref, 'shadows');
        break;
      case 'TERRAIN':
        ref = patterns.terrain;
        savePattern(ref, 'terrain');
        toggleSection(ref, 'terrain');
        break;
      case 'CUBE_MAP':
        ref = patterns.cube_map;
        savePattern(ref, 'cube_map');
        toggleSection(ref, 'cube_map');
        break;
      case 'PROPS':
        ref = patterns.props;
        savePattern(ref, 'props');
        toggleSection(ref, 'props');
        break;
      case 'ANIMATION':
        ref = patterns.animation;
        savePattern(ref, 'animation');
        toggleSection(ref, 'animation');
        break;
      case 'HIGHLIGHT_EFFECT':
        ref = patterns.highlight_effect;
        savePattern(ref, 'highlight_effect');
        toggleSection(ref, 'highlight_effect');
        break;
      default:
    }
  };

  return that;
};
