var offsets = require('./offsets');

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
  let patch_8 = offsets.camera.instructions.patch_8;
  let patch_9 = offsets.camera.instructions.patch_9;
  /* eslint-enable */
  that.enableSpectateMode = () => {
    memory.writeData(module + patch_1.offset, patch_1.bytecode, patch_1.original.byteLength);
    memory.writeData(module + patch_2.offset, patch_2.bytecode, patch_2.original.byteLength);
    memory.writeData(module + patch_3.offset, patch_3.bytecode, patch_3.original.byteLength);
    memory.writeData(module + patch_4.offset, patch_4.bytecode, patch_4.original.byteLength);
    memory.writeData(module + patch_5.offset, patch_5.bytecode, patch_5.original.byteLength);
    memory.writeData(module + patch_6.offset, patch_6.bytecode, patch_6.original.byteLength);
    memory.writeData(module + patch_7.offset, patch_7.bytecode, patch_7.original.byteLength);
    memory.writeData(module + patch_8.offset, patch_8.bytecode, patch_8.original.byteLength);
    memory.writeData(module + patch_9.offset, patch_9.bytecode, patch_9.original.byteLength);
  };

  that.disableSpectateMode = () => {
    memory.writeData(module + patch_1.offset, patch_1.original, patch_1.original.byteLength);
    memory.writeData(module + patch_2.offset, patch_2.original, patch_2.original.byteLength);
    memory.writeData(module + patch_3.offset, patch_3.original, patch_3.original.byteLength);
    memory.writeData(module + patch_4.offset, patch_4.original, patch_4.original.byteLength);
    memory.writeData(module + patch_5.offset, patch_5.original, patch_5.original.byteLength);
    memory.writeData(module + patch_6.offset, patch_6.original, patch_6.original.byteLength);
    memory.writeData(module + patch_7.offset, patch_7.original, patch_7.original.byteLength);
    memory.writeData(module + patch_8.offset, patch_8.original, patch_8.original.byteLength);
    memory.writeData(module + patch_9.offset, patch_9.original, patch_9.original.byteLength);
  };

  return that;
};
