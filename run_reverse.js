const fs = require('fs');

/** @type Uint16Array */
var heap;

/** @type WebAssembly.Instance */
var wasmInstance;

async function init() {
  return new Promise((resolve, reject) => {
    fs.readFile("reverse.wasm", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const wasmSource = new Uint8Array(data);
      const wasmModule = new WebAssembly.Module(wasmSource);      
      const instance = new WebAssembly.Instance(wasmModule);
      
      // obtain the offset to the array
      // https://stackoverflow.com/a/46748966/1000891
      const offset = instance.exports.getDataOffset();
      const size = instance.exports.getSize();

      console.log('offset', offset, 'size', size);

      // put in global scope
      wasmInstance = instance;

      // C int data size is 32 bits
      heap = new Int32Array(wasmInstance.exports.memory.buffer, offset, size);
      
      resolve();
    });
  });
}

function reverse(arr) {
  for (let i = 0; i < arr.length; ++i) {
    heap[i] = arr[i];
  }

  wasmInstance.exports.reverse(arr.length);

  const result = [];
  for (let i = 0; i < arr.length; ++i) {
    result.push(heap[i]);
  }
  return result;
};

async function main() {
  try {
    await init()
    
    const numbers = [14, 3, 77, -4254, 66];
    console.log(numbers, 'becomes', reverse(numbers));
  } catch (err) {
    console.error(err);
  }
}

main();