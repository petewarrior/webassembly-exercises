const fs = require('fs');

fs.readFile("adder.wasm", (err, data) => {
  const wasmSource = new Uint8Array(data);
  const wasmModule = new WebAssembly.Module(wasmSource);
  const wasmInstance = new WebAssembly.Instance(wasmModule, {
      env: {
          memory: new WebAssembly.Memory({
              initial: 256
          })
      }
  });
  
  const result = wasmInstance.exports.add(2, 40);
  console.log(result);
})
