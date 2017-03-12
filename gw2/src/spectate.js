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

  return that;
};
